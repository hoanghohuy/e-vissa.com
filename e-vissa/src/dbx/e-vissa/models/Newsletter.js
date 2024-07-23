'use strict';
const { Model } = require('sequelize');
const schemaNewsletter = require('../schema/schemaNewsletter');
module.exports = (sequelize, DataTypes) => {
    class Newsletter extends Model {
        static associate(models) {
            // define association here
        }
    }
    Newsletter.init(schemaNewsletter, {
        sequelize,
        modelName: 'Newsletter',
    });
    return Newsletter;
};
