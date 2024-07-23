'use strict';
const { Model } = require('sequelize');
const schemaVisa_country_detail = require('../schema/schemaVisa_country_detail');
module.exports = (sequelize, DataTypes) => {
    class Visa_country_detail extends Model {
        static associate(models) {
            Visa_country_detail.belongsTo(models.User, {
                foreignKey: 'updated_by',
                as: 'updated_by_info',
            });

            Visa_country_detail.belongsTo(models.User, {
                foreignKey: 'created_by',
                as: 'created_by_info',
            });

            Visa_country_detail.belongsTo(models.Country, {
                foreignKey: 'country',
                targetKey: 'code',
                as: 'country_info',
            });

            Visa_country_detail.belongsTo(models.Currency, {
                foreignKey: 'government_fee_currency',
                targetKey: 'code',
                as: 'government_fee_currency_info',
            });

            Visa_country_detail.belongsTo(models.Visa, {
                foreignKey: 'visa',
                as: 'visa_info',
            });

            Visa_country_detail.belongsToMany(models.Country, {
                through: 'Xref_visa_countries',
                foreignKey: 'visa_detail',
                otherKey: 'allowed_country',
                as: 'allowed_country_info',
                targetKey: 'code',
            });
        }
    }
    Visa_country_detail.init(schemaVisa_country_detail, {
        sequelize,
        modelName: 'Visa_country_detail',
    });
    return Visa_country_detail;
};
