const validate = require('../../validators');
const { Sequelize, DataTypes } = require('sequelize');

const schemaXref_visa_country = {
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
    allowed_country: {
        type: DataTypes.CHAR(5),
        allowNull: false,
        validate: validate.composeValidators(validate.notNull(), validate.len([2, 5], validate.isAlpha())),
    },
    visa_detail: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: validate.composeValidators(validate.notNull(), validate.isInt()),
    },
    supporting_doc: {
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

module.exports = schemaXref_visa_country;
