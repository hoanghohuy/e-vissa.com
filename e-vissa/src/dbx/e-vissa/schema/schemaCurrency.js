const validate = require('../../validators');
const { Sequelize, DataTypes } = require('sequelize');

const schemaCurrency = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: validate.composeValidators(validate.notNull(), validate.varcharLen()),
    },
    name_plural: {
        type: DataTypes.STRING,
        validate: validate.varcharLen(),
    },
    code: {
        type: DataTypes.CHAR(4),
        allowNull: false,
        unique: true,
        validate: validate.composeValidators(validate.notNull(), validate.len(2, 4)),
    },
    symbol: {
        type: DataTypes.STRING,
        validate: validate.varcharLen(),
    },
    isObsolete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        validate: validate.isBoolean(),
    },
    alias: {
        type: DataTypes.TEXT,
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

module.exports = schemaCurrency;
