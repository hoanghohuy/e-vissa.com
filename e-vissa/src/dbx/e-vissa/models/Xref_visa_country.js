'use strict';
const { Model } = require('sequelize');
const schemaXref_visa_country = require('../schema/schemaXref_visa_country');
module.exports = (sequelize, DataTypes) => {
    class Xref_visa_country extends Model {
        static associate(models) {
            Xref_visa_country.belongsTo(models.Country, {
                foreignKey: 'country',
                targetKey: 'code',
                as: 'country_info',
            });

            Xref_visa_country.belongsTo(models.Country, {
                foreignKey: 'allowed_country',
                targetKey: 'code',
                as: 'allowed_country_info',
            });

            Xref_visa_country.belongsTo(models.Visa_country_detail, {
                foreignKey: 'visa_detail',
                as: 'visa_detail_info',
            });
        }
    }
    Xref_visa_country.init(schemaXref_visa_country, {
        sequelize,
        modelName: 'Xref_visa_country',
    });
    return Xref_visa_country;
};
