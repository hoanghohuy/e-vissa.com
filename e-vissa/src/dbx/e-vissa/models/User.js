'use strict';
const { Model } = require('sequelize');
const schemaUser = require('../schema/schemaUser');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.belongsTo(models.Country, {
                foreignKey: 'country_of_residence',
                targetKey: 'code',
                as: 'country_of_residence_info',
            });

            User.belongsTo(models.Country, {
                foreignKey: 'nationality',
                targetKey: 'code',
                as: 'nationality_info',
            });
        }
    }
    User.init(schemaUser, {
        sequelize,
        modelName: 'User',
    });
    return User;
};
