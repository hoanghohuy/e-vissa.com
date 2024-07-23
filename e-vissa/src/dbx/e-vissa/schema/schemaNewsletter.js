const validate = require('../../validators');
const { Sequelize, DataTypes } = require('sequelize');

const schemaNewsletter = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: validate.composeValidators(validate.isEmail(), validate.varcharLen(), validate.notNullAndEmpty()),
    },
    unsub: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: validate.composeValidators(validate.varcharLen(), validate.notNullAndEmpty()),
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

module.exports = schemaNewsletter;
