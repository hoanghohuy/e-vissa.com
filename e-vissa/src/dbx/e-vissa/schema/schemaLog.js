const validate = require('../../validators');
const { Sequelize, DataTypes } = require('sequelize');

const schemaLog = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: validate.composeValidators(validate.notNull(), validate.varcharLen()),
    },
    desc: {
        type: DataTypes.JSON,
        allowNull: false,
        validate: validate.notNull(),
    },
    type: {
        type: DataTypes.ENUM('info', 'warn', 'error', 'debug'),
        allowNull: false,
        defaultValue: 'info',
    },
    created_by: {
        type: DataTypes.INTEGER,
        validate: validate.isInt(),
    },
    IP: {
        type: DataTypes.STRING,
        validate: validate.isIP(),
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

module.exports = schemaLog;
