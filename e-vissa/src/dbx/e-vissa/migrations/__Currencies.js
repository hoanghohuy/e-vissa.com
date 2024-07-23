'use strict';
const schemaCurrency = require('../schema/schemaCurrency');
const tableName = 'Currencies';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(tableName, schemaCurrency);
        await queryInterface.sequelize.query(
            `ALTER TABLE ${tableName} MODIFY COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
        );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable(tableName);
    },
};
