'use strict';
const { Model } = require('sequelize');
const schemaService = require('../schema/schemaService');

module.exports = (sequelize, DataTypes) => {
    class Service extends Model {
        static associate(models) {
            Service.belongsTo(models.Currency, {
                foreignKey: 'currency',
                targetKey: 'code',
                as: 'currency_info',
            });

            Service.belongsTo(models.User, {
                foreignKey: 'updated_by',
                as: 'updated_by_info',
            });

            Service.belongsTo(models.User, {
                foreignKey: 'created_by',
                as: 'created_by_info',
            });
        }
    }
    Service.init(schemaService, {
        sequelize,
        modelName: 'Service',
    });
    return Service;
};
