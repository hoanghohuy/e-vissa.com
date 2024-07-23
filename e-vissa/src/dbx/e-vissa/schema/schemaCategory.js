const validate = require('../../validators');
const { Sequelize, DataTypes } = require('sequelize');

const schemaCategory = {
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
    parent_id: {
        type: DataTypes.INTEGER,
        validate: validate.isInt(),
    },
    slug: {
        type: DataTypes.STRING,
        unique: true,
    },
    keyword: {
        type: DataTypes.STRING,
        validate: validate.varcharLen(),
    },
    meta_title: {
        type: DataTypes.TEXT,
    },
    meta_desc: {
        type: DataTypes.TEXT,
    },
    term: {
        type: DataTypes.ENUM('category', 'metadata', 'info-page', 'tag', 'menu'),
        allowNull: false,
        defaultValue: 'category',
    },

    image: {
        type: DataTypes.STRING,
        validate: validate.varcharLen(),
    },
    schema: {
        type: DataTypes.JSON,
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: validate.composeValidators(validate.notNull(), validate.isInt()),
    },
    updated_by: {
        type: DataTypes.INTEGER,
        validate: validate.isInt(),
    },
    published: {
        type: DataTypes.TINYINT(1),
        defaultValue: 1,
        validate: validate.isIn([0, 1]),
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

module.exports = schemaCategory;
