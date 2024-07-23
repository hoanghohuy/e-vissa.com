'use strict';
const { Model } = require('sequelize');
const schemaCountry = require('../schema/schemaCountry');
module.exports = (sequelize, DataTypes) => {
    class Country extends Model {
        static associate(models) {
            // define association here
        }
    }
    Country.init(schemaCountry, {
        sequelize,
        modelName: 'Country',
    });
    return Country;
};
