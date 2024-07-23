'use strict';
const schemaXref_visa_country = require('../schema/schemaXref_visa_country');
const tableName = 'Xref_visa_countries';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(tableName, schemaXref_visa_country);
        await queryInterface.sequelize.query(
            `ALTER TABLE ${tableName} MODIFY COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
        );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable(tableName);
    },
};
