import bcrypt from 'bcryptjs';
import { isInternalUser } from '@/middlewares/authorization';
import { permissionsOfRole } from '@/dbx/e-vissa/models/data/role_data';
import { isEmptyObject } from '@/utils/validation';
import { siteName } from '@/utils/constants';
const { User } = require('@/dbx/e-vissa/models');

async function createUserInWebsite(user, isCredential = true) {
    try {
        const webUserData = {
            email: user.email,
        };

        if (isCredential === false) {
            webUserData.first_name = user.name;
        } else {
            webUserData.first_name = user.first_name;
            webUserData.last_name = user.last_name;
            webUserData.role = user.role;
            webUserData.is_manager = user.is_manager;
            webUserData.permissions = permissionsOfRole(user.role);
            webUserData.published = 2;
        }
        return await User.create(webUserData);
    } catch (error) {
        return null;
    }
}

async function processLogin(email, password = null, socialData = null) {
    // Check user in website
    let user = await User.findOne({ where: { email }, raw: true });
    const internalUser = await isInternalUser({ email });

    // Check user in internal
    if (user === null && internalUser === null) {
        if (socialData !== null) {
            user = await createUserInWebsite(socialData, false);
        }
    }

    if (user === null && internalUser) {
        user = await createUserInWebsite(internalUser);
    }

    if (user === null || internalUser === false) {
        return { error: 'Something went wrong, please try again!' };
    }

    if (user?.published == 0) {
        return { error: 'Account is disabled. Please contact support for assistance.' };
    }

    if (user?.activation) {
        return { error: 'Please, Activate your account in Email!' };
    }

    if (password !== null) {
        const userPassword = internalUser ? internalUser.password : user.password;
        const passwordMatch = await bcrypt.compare(password, userPassword);

        if (passwordMatch !== true) {
            return { error: 'Password is incorrect' };
        }
    }

    return {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: internalUser?.role ?? user.role,
        is_manager: internalUser?.is_manager ?? user.is_manager,
        permissions: internalUser?.permissions ?? user.permissions,
        gender: user.gender,
        date_of_birth: user.date_of_birth,
        published: user.published,
        ...(internalUser?.id && { internal_id: internalUser.id }),
    };
}

export async function serviceLogin(email, password) {
    try {
        if (!email || !password) {
            return { error: 'Email or password is invalid' };
        }
        return await processLogin(email, password);
    } catch (error) {
        return { error: error.message };
    }
}

export async function serviceLoginBySocialMedia(socialData) {
    try {
        if (isEmptyObject(socialData)) {
            return { error: 'Data is invalid' };
        }
        return await processLogin(socialData.email, null, socialData);
    } catch (error) {
        return { error: error.message };
    }
}

export function serviceGenerateUserType(user, type = 'token') {
    try {
        const commonProperties = {
            id: user.id,
            ...(user.internal_id && { internal_id: user.internal_id }),
            ...(user.is_manager && { is_manager: user.is_manager }),
        };

        if (type === 'token') {
            return {
                ...commonProperties,
                email: user.email,
                role: user.role,
                from: siteName,
            };
        }

        if (type === 'session') {
            return {
                ...commonProperties,
                role: user.role,
                name: user.first_name || '',
                image: user.image || '',
                permissions: user.permissions || [],
            };
        }
    } catch (error) {
        return { error: error.message };
    }
}
