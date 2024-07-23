'use strict';
const { Model } = require('sequelize');
const schemaXref_post_category = require('../schema/schemaXref_post_category');
module.exports = (sequelize, DataTypes) => {
    class Xref_post_category extends Model {
        static associate(models) {
            Xref_post_category.belongsTo(models.Post, {
                foreignKey: 'post_id',
                as: 'post_info',
            });
        }
    }
    Xref_post_category.init(schemaXref_post_category, {
        sequelize,
        modelName: 'Xref_post_category',
    });
    return Xref_post_category;
};
