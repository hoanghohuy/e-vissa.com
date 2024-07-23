const validate = require('../../validators');
const { Sequelize, DataTypes } = require('sequelize');

const schemaCoupon = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: validate.composeValidators(validate.notNull(), validate.varcharLen()),
    },
    date_start: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: validate.composeValidators(validate.notNull(), validate.isDate(), validate.isAfter()),
    },
    date_end: {
        type: DataTypes.DATE,
        validate: validate.composeValidators(validate.isDate(), validate.isAfter()),
    },
    price: {
        type: DataTypes.FLOAT,
        validate: validate.isFloat(),
    },
    percent: {
        type: DataTypes.TINYINT(3),
        validate: validate.composeValidators(validate.min(0), validate.max(100)),
    },
    usage_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: validate.isInt(),
    },
    max_usage_limit: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: validate.isInt(),
    },
    minimum_purchase_amount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: validate.isInt(),
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: validate.composeValidators(validate.notNull(), validate.isInt()),
    },
    updated_by: {
        type: DataTypes.INTEGER,
        validate: validate.isInt(),
    },
    published: {
        type: DataTypes.TINYINT(1),
        defaultValue: 1,
        validate: validate.isIn([0, 1]),
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

module.exports = schemaCoupon;
