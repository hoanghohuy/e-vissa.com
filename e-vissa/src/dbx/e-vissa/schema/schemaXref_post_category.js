const validate = require('../../validators');
const { Sequelize, DataTypes } = require('sequelize');

const schemaXref_post_category = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: validate.composeValidators(validate.notNull(), validate.isInt()),
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: validate.composeValidators(validate.notNull(), validate.isInt()),
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

module.exports = schemaXref_post_category;
