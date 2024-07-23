'use strict';
const { Model } = require('sequelize');
const schemaContact = require('../schema/schemaContact');
module.exports = (sequelize, DataTypes) => {
    class Contact extends Model {
        static associate(models) {
            // define association here
        }
    }
    Contact.init(schemaContact, {
        sequelize,
        modelName: 'Contact',
    });
    return Contact;
};
