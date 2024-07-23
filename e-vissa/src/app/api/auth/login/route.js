import { NextResponse } from 'next/server';
import { generateJWT } from '@/middlewares/jwt';
import { serviceGenerateUserType, serviceLogin } from '@/services/serviceUser';
import Internal_users from '@/dbx/internal_users/internal_users';
const { User } = require('@/dbx/e-vissa/models');

// Login by API
export const POST = async (request) => {
    const { email, password, device_info } = await request.json();
    const user = await serviceLogin(email, password);
    if (user.error) {
        return NextResponse.json(user, { status: 400 });
    }
    if (user) {
        const accessToken = await generateJWT(serviceGenerateUserType(user));

        try {
            if (device_info) {
                if (user.internal_id) {
                    await Internal_users.update(
                        { device_info: JSON.stringify(device_info) },
                        { where: { id: user.internal_id } },
                    );
                } else {
                    await User.update({ device_info: JSON.stringify(device_info) }, { where: { id: user.id } });
                }
            }
        } catch (error) {
            console.error(error.message);
        }

        return NextResponse.json({ user: user, accessToken }, { status: 201 });
    }

    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
};
