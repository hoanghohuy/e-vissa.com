'use strict';
const { Model } = require('sequelize');
const schemaCurrency = require('../schema/schemaCurrency');
module.exports = (sequelize, DataTypes) => {
    class Currency extends Model {
        static associate(models) {
            // define association here
        }
    }
    Currency.init(schemaCurrency, {
        sequelize,
        modelName: 'Currency',
    });
    return Currency;
};
