'use strict';
const schemaNewsletter = require('../schema/schemaNewsletter');
const tableName = 'Newsletters';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(tableName, schemaNewsletter);
        await queryInterface.sequelize.query(
            `ALTER TABLE ${tableName} MODIFY COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
        );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable(tableName);
    },
};
