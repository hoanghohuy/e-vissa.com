'use strict';
const { Model } = require('sequelize');
const schemaComment = require('../schema/schemaComment');
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        static associate(models) {
            Comment.belongsTo(models.Post, {
                foreignKey: 'post_id',
                as: 'post_info',
            });

            Comment.belongsTo(models.User, {
                foreignKey: 'created_by',
                as: 'created_by_info',
            });
        }
    }
    Comment.init(schemaComment, {
        sequelize,
        modelName: 'Comment',
    });
    return Comment;
};
