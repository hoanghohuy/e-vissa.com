const validate = require('../../validators');
const { Sequelize, DataTypes } = require('sequelize');

const schemaUser = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    first_name: {
        type: DataTypes.STRING,
        validate: validate.varcharLen(),
    },
    last_name: {
        type: DataTypes.STRING,
        validate: validate.varcharLen(),
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: validate.composeValidators(validate.isEmail(), validate.varcharLen()),
    },
    password: {
        type: DataTypes.STRING,
        validate: validate.varcharLen(),
    },
    date_of_birth: {
        type: DataTypes.DATE,
        validate: validate.composeValidators(validate.isDate(), validate.isBefore()),
    },
    phone_number: {
        type: DataTypes.STRING,
        validate: validate.varcharLen(),
    },
    activation: {
        type: DataTypes.STRING,
        validate: validate.varcharLen(),
    },
    key_reset_password: {
        type: DataTypes.STRING,
        validate: validate.varcharLen(),
    },
    device_info: {
        type: DataTypes.TEXT,
    },
    country_of_residence: {
        type: DataTypes.CHAR(5),
        validate: validate.composeValidators(validate.len([2, 5]), validate.isAlpha()),
    },
    nationality: {
        type: DataTypes.CHAR(5),
        validate: validate.composeValidators(validate.len([2, 3]), validate.isAlpha()),
    },
    address: {
        type: DataTypes.STRING,
        validate: validate.varcharLen(),
    },
    image: {
        // avatar
        type: DataTypes.STRING,
        validate: validate.varcharLen(),
    },
    role: {
        type: DataTypes.ENUM('administrator', 'editor', 'sales', 'intern', 'guest'),
        defaultValue: 'guest',
        validate: validate.isIn(['administrator', 'editor', 'sales', 'intern', 'guest']),
    },
    permissions: {
        type: DataTypes.JSON,
    },
    is_manager: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        validate: validate.isBoolean(),
    },
    invitation: {
        type: DataTypes.TEXT,
    },
    gender: {
        type: DataTypes.TINYINT(1),
        defaultValue: 1,
        validate: validate.isIn([0, 1]),
    },
    published: {
        type: DataTypes.TINYINT(1),
        defaultValue: 1,
        validate: validate.isIn([0, 1, 2]), // 0: disabled, 1: published, 2: Internal User
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

module.exports = schemaUser;
