import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { generateJWT, verifyJWT } from '@/middlewares/jwt';
import { serviceGenerateUserType, serviceLogin, serviceLoginBySocialMedia } from '@/services/serviceUser';

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            async authorize(credentials) {
                const user = await serviceLogin(credentials.email, credentials.password);
                if (user.error) {
                    throw new Error(user.error);
                } else {
                    return user;
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            httpOptions: {
                timeout: 40000,
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            try {
                if (user && !token.accessToken) {
                    if (account.provider === 'google') {
                        user = await serviceLoginBySocialMedia(user);
                        if (user.error) {
                            throw new Error(user.error);
                        }
                    }

                    token.accessToken = await generateJWT(serviceGenerateUserType(user));
                    token.user = serviceGenerateUserType(user, 'session');
                }

                return token;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        async session({ session, token }) {
            const accessToken = token.accessToken;
            if (accessToken) {
                if (!(await verifyJWT(accessToken))) {
                    return (session = {});
                }
                session.user = token.user;
                session.accessToken = 'Bearer ' + accessToken;

                // Delete the default Nextjs token's expiration
                delete session.expires;
            }

            return session;
        },
        async redirect({ url, baseUrl }) {
            return '/';
        },
    },
    pages: {
        error: '/login',
        signIn: '/login',
        verifyRequest: '/login',
    },
});

export { handler as GET, handler as POST };
