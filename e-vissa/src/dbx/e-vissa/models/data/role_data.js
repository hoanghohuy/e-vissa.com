export const roleData = {
    data: [
        {
            id: 1,
            label: 'Administrator',
            name: 'Administrator',
            value: 'administrator',
            permissions: [
                'dashboard',
                'user',
                'internal_user',
                'internal_post',
                'order',
                'turkey-order',
                'visa',
                'type_visa',
                'contact',
                'coupon',
                'services',
                'category',
                'posts',
                'country',
                'currency',
                'logs',
                // 'settings',
            ],
        },
        {
            id: 2,
            label: 'Editor',
            name: 'Editor',
            value: 'editor',
            permissions: ['category', 'posts', 'internal_user', 'visa', 'type_visa', 'internal_post', 'logs'],
        },
        {
            id: 3,
            label: 'Sales',
            name: 'Sales',
            value: 'sales',
            permissions: [
                'user',
                'internal_user',
                'order',
                'turkey-order',
                'contact',
                'country',
                'currency',
                'visa',
                'type_visa',
                'services',
                'coupon',
            ],
        },
        {
            id: 4,
            label: 'Intern',
            name: 'Intern',
            value: 'intern',
            permissions: [],
        },
        {
            id: 5,
            label: 'Guest',
            name: 'Guest',
            value: 'guest',
            permissions: [],
        },
    ],
};

export const roleValues = roleData.data.map((item) => item.value);

export function permissionsOfRole(role) {
    const matchedRole = roleData.data.find((roleObj) => roleObj.value === role);
    if (matchedRole) {
        const permissions = matchedRole.permissions;
        if ((role && role !== 'guest') || permissions.length > 0) {
            return JSON.stringify(permissions);
        }
    }
    return null;
}
