const validate = require('../../validators');
const { Sequelize, DataTypes } = require('sequelize');

const schemaVisa = {
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
    type: {
        type: DataTypes.ENUM('E-visa', 'ESTA', 'ETA'),
        allowNull: false,
        validate: validate.composeValidators(validate.notNull(), validate.isIn(['E-visa', 'ESTA', 'ETA'])),
    },
    desc: {
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

module.exports = schemaVisa;
