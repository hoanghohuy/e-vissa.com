'use strict';
const { Model } = require('sequelize');
const schemaPost = require('../schema/schemaPost');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            Post.belongsTo(models.User, {
                foreignKey: 'updated_by',
                as: 'updated_by_info',
            });

            Post.belongsTo(models.User, {
                foreignKey: 'created_by',
                as: 'created_by_info',
            });

            Post.belongsToMany(models.Category, {
                through: 'Xref_post_categories',
                foreignKey: 'post_id',
                otherKey: 'category_id',
                as: 'category_info',
            });
        }
    }
    Post.init(schemaPost, {
        sequelize,
        modelName: 'Post',
    });
    return Post;
};
