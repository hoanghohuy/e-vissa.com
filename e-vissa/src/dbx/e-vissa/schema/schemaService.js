const validate = require('../../validators');
const { Sequelize, DataTypes } = require('sequelize');

const schemaService = {
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
    desc: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: validate.notNull(),
    },
    value: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: validate.composeValidators(validate.notNull(), validate.isFloat()),
    },
    value_on: {
        type: DataTypes.ENUM('person', 'people'),
        allowNull: false,
        defaultValue: 'people',
        validate: validate.composeValidators(validate.notNull(), validate.isIn(['person', 'people'])),
    },
    image: {
        type: DataTypes.STRING,
        validate: validate.varcharLen(),
    },
    currency: {
        type: DataTypes.CHAR(3),
        defaultValue: 'USD',
        validate: validate.composeValidators(validate.len([2, 3]), validate.isAlpha()),
    },
    type: {
        type: DataTypes.ENUM('SwiftPass', 'TravelPlus'),
        comment: 'SwiftPass: The name of the service || TravelPlus: Additional Services',
        validate: validate.isIn(['SwiftPass', 'TravelPlus']),
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

module.exports = schemaService;
