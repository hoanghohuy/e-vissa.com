'use strict';
const { Model } = require('sequelize');
const schemaLog = require('../schema/schemaLog');

module.exports = (sequelize, DataTypes) => {
    class Log extends Model {
        static associate(models) {
            Log.belongsTo(models.User, {
                foreignKey: 'created_by',
                as: 'created_by_info',
            });
        }
    }
    Log.init(schemaLog, {
        sequelize,
        modelName: 'Log',
    });
    return Log;
};
