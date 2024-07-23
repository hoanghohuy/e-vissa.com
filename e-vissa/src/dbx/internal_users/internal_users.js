import { DataTypes } from 'sequelize';
import sequelize from '@/dbx/internal_users/config';
const validate = require('../validators');

export const Internal_users = sequelize.define(
    'Internal_users',
    {
        first_name: {
            type: DataTypes.STRING,
            validate: validate.varcharLen(),
        },
        last_name: {
            type: DataTypes.STRING,
            validate: validate.varcharLen(),
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: validate.composeValidators(validate.isEmail(), validate.varcharLen()),
        },
        password: {
            type: DataTypes.STRING,
            validate: validate.varcharLen(),
        },
        date_of_birth: {
            type: DataTypes.DATE,
            validate: validate.composeValidators(validate.isDate(), validate.isBefore()),
        },
        phone_number: {
            type: DataTypes.STRING,
            validate: validate.varcharLen(),
        },
        activation: {
            type: DataTypes.STRING,
            validate: validate.varcharLen(),
        },
        key_reset_password: {
            type: DataTypes.STRING,
            validate: validate.varcharLen(),
        },
        device_info: {
            type: DataTypes.TEXT,
        },
        address: {
            type: DataTypes.STRING,
            validate: validate.varcharLen(),
        },
        image: {
            // avatar
            type: DataTypes.STRING,
            validate: validate.varcharLen(),
        },
        role: {
            type: DataTypes.ENUM('administrator', 'editor', 'sales', 'intern'),
            allowNull: false,
            validate: validate.isIn(['administrator', 'editor', 'sales', 'intern']),
        },
        websites: {
            type: DataTypes.TEXT,
        },
        is_manager: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            validate: validate.isBoolean(),
        },
        invitation: {
            type: DataTypes.TEXT,
        },
        gender: {
            type: DataTypes.TINYINT(1),
            defaultValue: 1,
            validate: validate.isIn([0, 1]),
        },
        published: {
            type: DataTypes.TINYINT(1),
            defaultValue: 1,
            validate: validate.isIn([0, 1]),
        },
    },
    {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
);

export async function syncInternalUserModel() {
    try {
        await Internal_users.sync();
    } catch (error) {
        console.error('Error creating Internal_users table:', error.message);
    }
}

export default Internal_users;
