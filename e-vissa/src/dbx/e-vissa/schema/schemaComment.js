const validate = require('../../validators');
const { Sequelize, DataTypes } = require('sequelize');

const schemaComment = {
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
    desc: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: validate.notNull(),
    },
    star: {
        type: DataTypes.INTEGER,
        defaultValue: 5,
        validate: validate.composeValidators(validate.min(1), validate.max(5)),
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
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: validate.composeValidators(validate.notNull(), validate.isInt()),
    },
};

module.exports = schemaComment;
