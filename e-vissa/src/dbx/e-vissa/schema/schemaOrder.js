const validate = require('../../validators');
const orderStatus = require('../seeders/data/order_data.json');
const { Sequelize, DataTypes } = require('sequelize');

const schemaOrder = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
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
        type: DataTypes.JSON,
    },
    service_ids: {
        type: DataTypes.STRING,
        validate: validate.varcharLen(),
    },
    visa_service: {
        type: DataTypes.JSON,
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
        type: DataTypes.JSON,
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
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        validate: validate.isDate(),
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        validate: validate.isDate(),
    },
};

module.exports = schemaOrder;
