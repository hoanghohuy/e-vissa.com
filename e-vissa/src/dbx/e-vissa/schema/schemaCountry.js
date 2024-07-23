const validate = require('../../validators');
const { Sequelize, DataTypes } = require('sequelize');

const schemaCountry = {
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
    code: {
        type: DataTypes.CHAR(5),
        allowNull: false,
        unique: true,
        validate: validate.composeValidators(validate.notNull(), validate.len([2, 5], validate.isAlpha())),
    },
    phone: {
        type: DataTypes.STRING,
        validate: validate.varcharLen(),
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

module.exports = schemaCountry;
