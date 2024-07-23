const validate = require('../../validators');
const { Sequelize, DataTypes } = require('sequelize');

const schemaPost = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: validate.notNull(),
    },
    slug: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: validate.notNull(),
    },
    content: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
        validate: validate.notNull(),
    },
    heading_tags: {
        type: DataTypes.JSON,
    },
    faq: {
        type: DataTypes.JSON,
    },
    views: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: validate.isInt(),
    },
    likes: {
        type: DataTypes.INTEGER,
        validate: validate.isInt(),
    },
    keyword: {
        type: DataTypes.STRING,
        validate: validate.varcharLen(),
    },
    meta_desc: {
        type: DataTypes.TEXT,
    },
    image: {
        type: DataTypes.STRING,
        validate: validate.varcharLen(),
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
    publish_at: {
        type: DataTypes.DATE,
        validate: validate.composeValidators(validate.isDate(), validate.isAfter()),
    },
    published: {
        type: DataTypes.TINYINT(1),
        defaultValue: 1,
        validate: validate.isIn([0, 1, 2]), // 0:unpublished (draft), 1:published, 2:trashed
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

module.exports = schemaPost;
