'use strict';
const { Model } = require('sequelize');
const schemaVisa = require('../schema/schemaVisa');
module.exports = (sequelize, DataTypes) => {
    class Visa extends Model {
        static associate(models) {
            Visa.belongsTo(models.User, {
                foreignKey: 'updated_by',
                as: 'updated_by_info',
            });

            Visa.belongsTo(models.User, {
                foreignKey: 'created_by',
                as: 'created_by_info',
            });
        }
    }
    Visa.init(schemaVisa, {
        sequelize,
        modelName: 'Visa',
    });
    return Visa;
};
