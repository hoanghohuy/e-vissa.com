import { withAuth } from 'next-auth/middleware';
import { verifyJWT } from '@/middlewares/jwt';
import { blacklist } from '../settings';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { validateCaptcha } from '@/libs/reCaptcha';

const captChaApis = {
    POST: ['/api/orders', '/api/contacts', '/api/newsletters'],
};

export default withAuth(
    async function middleware(req) {
        const pathName = req.nextUrl.pathname;
        const method = req.method;
        // Block API calls from non-same-origin requests
        if (pathName.startsWith('/api/') && headers().get('Sec-Fetch-Site') !== 'same-origin') {
            return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
        }

        // Validate gCaptchaV3
        if (captChaApis[method]?.includes(pathName)) {
            const { gRecaptchaToken } = await req.json();
            const captchaResult = await validateCaptcha(gRecaptchaToken);
            if (captchaResult === false) {
                return NextResponse.json({ error: 'Failed to validate reCaptcha' }, { status: 403 });
            }
        }

        // Block IPs
        const clientIP = headers().get('X-Forwarded-For');
        if (blacklist.length !== 0) {
            if (clientIP && blacklist.includes(clientIP)) {
                return NextResponse.json(
                    { error: 'Something went wrong' },
                    {
                        status: 500,
                    },
                );
            }
        }

        // Auth
        const authorization = headers().get('authorization');
        let jwtToken = null;
        let jwtPayload = null;

        if (authorization) {
            jwtToken = authorization?.split(' ')[1];
            jwtPayload = await verifyJWT(jwtToken);
        }

        const requestHeaders = new Headers(headers());
        requestHeaders.set('methodAPI', method + ': ' + pathName);

        // Admin API
        if (pathName.startsWith('/api/admin/')) {
            if (!authorization || !jwtToken || !jwtPayload) {
                return NextResponse.json(
                    { error: 'Unauthentication' },
                    {
                        status: 403,
                    },
                );
            }

            if (!jwtPayload?.role || jwtPayload?.role === 'guest') {
                return NextResponse.json(
                    { error: 'Unauthorized' },
                    {
                        status: 401,
                    },
                );
            }
        }

        jwtPayload?.id && requestHeaders.set('tokenUserId', jwtPayload?.id);
        return NextResponse.next({ request: { headers: requestHeaders } });
    },
    {
        callbacks: {
            authorized: async ({ req, token }) => {
                if (req.nextUrl.pathname.startsWith('/admin')) {
                    if (token === null) {
                        return false;
                    }

                    if (token && token?.accessToken) {
                        const { role } = await verifyJWT(token?.accessToken);
                        if (!role || role === 'guest') {
                            return false;
                        }
                    }
                }

                return true;
            },
        },
    },
);
