import { headers } from 'next/headers';
import { siteName } from '@/utils/constants';
import { verifyJWT } from '@/middlewares/jwt';
import { isEmptyObject } from '@/utils/validation';
import { roleValues } from '@/dbx/e-vissa/models/data/role_data';
import { isDevelopmentEnv } from '@/utils/validation';
import Internal_users from '@/dbx/internal_users/internal_users';
const { User } = require('@/dbx/e-vissa/models');

// checkRoles is empty that means as long as logged in
export async function isAllowed(checkRoles = []) {
    const authorization = headers().get('authorization');
    if (!authorization) return false;

    const jwtToken = authorization?.split(' ')[1];
    if (!jwtToken) return false;

    const jwtPayload = await verifyJWT(jwtToken);
    if (!jwtPayload || !jwtPayload?.id || !jwtPayload?.role) return false;

    let user;
    if (jwtPayload?.internal_id) {
        user = await checkInternalUser({ id: jwtPayload.internal_id });
        user.id = jwtPayload.id;
        user.internal_id = jwtPayload.internal_id;
    } else {
        user = await checkUser({ id: jwtPayload?.id });
    }

    if (!user) return false;

    // As well as logged in
    if (isEmptyObject(checkRoles)) {
        return user;
    }

    // Check specific role
    if (user.role !== jwtPayload.role || !checkRoles.includes(user.role)) return false;

    return user;
}

// Administrator role only
export async function isAdmin() {
    return await isAllowed(['administrator']);
}

// Default guest has no permissions to access, return false
export async function isNotGuest(excludedRole = []) {
    isEmptyObject(excludedRole) ? (excludedRole = ['guest']) : excludedRole.push('guest');
    const filteredRoles = roleValues.filter((role) => !excludedRole.includes(role));

    return await isAllowed(filteredRoles);
}

// Check user's existence
export async function checkUser(
    condition = {},
    attributes = {
        exclude: ['created_at', 'updated_at', 'created_by', 'updated_by'],
    },
) {
    const where = {
        attributes,
        where: condition,
        raw: true,
    };
    condition.published = 1;
    return await User.findOne(where);
}

// Check InternalUser's existence
export async function checkInternalUser(
    condition = {},
    attributes = {
        exclude: ['created_at', 'updated_at', 'created_by', 'updated_by'],
    },
) {
    condition.published = 1;
    const where = {
        attributes,
        where: condition,
        raw: true,
    };

    const internalUsers = await Internal_users.findOne(where);

    if (
        internalUsers &&
        (isDevelopmentEnv ||
            internalUsers.role === 'administrator' ||
            internalUsers.is_manager === 1 ||
            (internalUsers.websites && JSON.parse(internalUsers.websites).includes(siteName)))
    ) {
        return internalUsers;
    }

    return null;
}

export async function isInternalUser(condition = {}) {
    const where = {
        where: condition,
        raw: true,
    };

    const internalUsers = await Internal_users.findOne(where);
    if (internalUsers === null) {
        return null;
    }

    if (internalUsers.published !== 1) {
        return false;
    }

    if (
        internalUsers &&
        (isDevelopmentEnv ||
            internalUsers.role === 'administrator' ||
            internalUsers.is_manager === 1 ||
            (internalUsers.websites && JSON.parse(internalUsers.websites).includes(siteName)))
    ) {
        return internalUsers;
    }

    return false;
}

// Role Admin is manager
export function isManager(user, role = '') {
    if (!user) {
        return false;
    }

    if (user.role === 'administrator') {
        return true;
    }

    if (!user || !user.is_manager) {
        return false;
    }

    if (role !== '' && user.role !== role) {
        return false;
    }

    return true;
}
