const validate = require('../../validators');
const { Sequelize, DataTypes } = require('sequelize');

const schemaVisa_country_detail = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    country: {
        type: DataTypes.CHAR(5),
        allowNull: false,
        validate: validate.composeValidators(validate.notNull(), validate.len([2, 5], validate.isAlpha())),
    },
    visa: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: validate.composeValidators(validate.notNull(), validate.isInt()),
    },
    services: {
        type: DataTypes.JSON,
    },
    validity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: validate.composeValidators(validate.notNull(), validate.isInt()),
    },
    validity_type: {
        type: DataTypes.ENUM('y', 'm', 'd'),
        defaultValue: 'd',
        allowNull: false,
        validate: validate.composeValidators(validate.notNull(), validate.isIn(['y', 'm', 'd'])),
    },
    length_of_stay: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: validate.composeValidators(validate.notNull(), validate.isInt()),
    },
    length_of_stay_type: {
        type: DataTypes.ENUM('y', 'm', 'd'),
        defaultValue: 'd',
        allowNull: false,
        validate: validate.composeValidators(validate.notNull(), validate.isIn(['y', 'm', 'd'])),
    },
    government_fee: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
        validate: validate.composeValidators(validate.notNull(), validate.isFloat()),
    },
    government_fee_currency: {
        type: DataTypes.CHAR(3),
        allowNull: false,
        defaultValue: 'USD',
        validate: validate.composeValidators(validate.len([2, 3]), validate.isAlpha()),
    },
    entry_type: {
        type: DataTypes.ENUM('single', 'double', 'triple', 'multiple'),
        defaultValue: 'single',
        allowNull: false,
        validate: validate.composeValidators(
            validate.notNull(),
            validate.isIn(['single', 'double', 'triple', 'multiple']),
        ),
    },
    port_of_entry: {
        type: DataTypes.TEXT,
    },
    requirement_desc: {
        type: DataTypes.TEXT,
    },
    note: {
        type: DataTypes.TEXT,
    },
    published: {
        type: DataTypes.TINYINT(1),
        defaultValue: 1,
        validate: validate.isIn([0, 1]),
    },
    created_by: {
        type: DataTypes.INTEGER,
        validate: validate.isInt(),
    },
    updated_by: {
        type: DataTypes.INTEGER,
        validate: validate.isInt(),
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

module.exports = schemaVisa_country_detail;
