'use strict';
const { Model } = require('sequelize');
const schemaCategory = require('../schema/schemaCategory');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            Category.belongsTo(models.User, {
                foreignKey: 'updated_by',
                as: 'updated_by_info',
            });

            Category.belongsTo(models.User, {
                foreignKey: 'created_by',
                as: 'created_by_info',
            });
            Category.belongsTo(Category, {
                foreignKey: 'parent_id',
                as: 'parent_id_info',
            });
        }
    }
    Category.init(schemaCategory, {
        sequelize,
        modelName: 'Category',
    });
    return Category;
};
