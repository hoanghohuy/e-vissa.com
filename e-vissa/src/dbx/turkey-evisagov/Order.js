import { DataTypes } from 'sequelize';
import sequelize from '@/dbx/turkey-evisagov/config';
import User from './User';
import Xref_visa_country from './Xref_visa_country';

const validate = require('../validators');
const orderStatus = [
    'Pending',
    'Paying',
    'Paid',
    'Paid Failed',
    'Processing',
    'Approved',
    'Completed',
    'Cancelled',
    'Refunded',
];

export const Order = sequelize.define(
    'Orders',
    {
        device_id: {
            type: DataTypes.STRING,
            validate: validate.notEmpty(),
        },
        // user's info
        first_name: {
            type: DataTypes.STRING,
            validate: validate.varcharLen(),
        },
        last_name: {
            type: DataTypes.STRING,
            validate: validate.varcharLen(),
        },
        gender: {
            type: DataTypes.TINYINT(1),
            defaultValue: 1,
            validate: validate.isIn([0, 1]),
        },
        address: {
            type: DataTypes.STRING,
            validate: validate.varcharLen(),
        },
        phone_number: {
            type: DataTypes.STRING,
            validate: validate.varcharLen(),
        },
        email: {
            type: DataTypes.STRING,
            validate: validate.isEmail(),
        },
        date_of_birth: {
            type: DataTypes.DATE,
            validate: validate.composeValidators(validate.isDate(), validate.isBefore()),
        },
        country_of_residence: {
            type: DataTypes.CHAR(5),
            validate: validate.composeValidators(validate.len([2, 5]), validate.isAlpha()),
        },
        nationality: {
            type: DataTypes.CHAR(5),
            validate: validate.composeValidators(validate.len([2, 5]), validate.isAlpha()),
        },
        passport_number: {
            type: DataTypes.INTEGER,
            validate: validate.isInt(),
        },
        passport_expired_date: {
            type: DataTypes.DATE,
            validate: validate.composeValidators(validate.isDate(), validate.isAfter()),
        },
        customer_note: {
            type: DataTypes.STRING,
            validate: validate.varcharLen(),
        },

        // Order
        xref_visa_country: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: validate.notNull(),
        },
        arrival_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: validate.composeValidators(validate.notNull(), validate.isDate(), validate.isAfter()),
        },
        departure_date: {
            type: DataTypes.DATE,
            validate: validate.composeValidators(validate.isDate(), validate.isAfter()),
        },
        travel_by: {
            type: DataTypes.STRING,
            validate: validate.varcharLen(),
        },
        arrival_port: {
            type: DataTypes.STRING,
            validate: validate.varcharLen(),
        },
        another_people: {
            type: DataTypes.TEXT,
        },
        service_ids: {
            type: DataTypes.STRING,
            validate: validate.varcharLen(),
        },
        payment_method: {
            type: DataTypes.STRING,
            validate: validate.varcharLen(),
        },
        transaction: {
            type: DataTypes.STRING,
            validate: validate.varcharLen(),
        },
        total_price: {
            type: DataTypes.FLOAT,
            validate: validate.isFloat(),
        },
        original_price: {
            type: DataTypes.FLOAT,
            validate: validate.isFloat(),
        },
        detail_price: {
            type: DataTypes.STRING,
            validate: validate.varcharLen(),
        },
        coupon: {
            type: DataTypes.STRING,
            validate: validate.varcharLen(),
        },
        admin_note: {
            type: DataTypes.STRING,
            validate: validate.varcharLen(),
        },
        currency: {
            type: DataTypes.CHAR(3),
            validate: validate.composeValidators(validate.len([2, 3]), validate.isAlpha()),
        },
        created_by: {
            type: DataTypes.INTEGER,
            validate: validate.isInt(),
        },
        updated_by: {
            type: DataTypes.INTEGER,
            validate: validate.isInt(),
        },
        status: {
            type: DataTypes.ENUM(orderStatus),
            defaultValue: 'Pending',
            validate: validate.isIn(orderStatus),
        },
    },
    {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
);
Order.belongsTo(User, { as: 'created_by_info', foreignKey: 'created_by' });
Order.belongsTo(User, { as: 'updated_by_info', foreignKey: 'updated_by' });
Order.belongsTo(Xref_visa_country, { as: 'xref_visa_country_info', foreignKey: 'xref_visa_country' });

export default Order;
