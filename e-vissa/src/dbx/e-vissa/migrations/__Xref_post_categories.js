'use strict';
const schemaXref_post_category = require('../schema/schemaXref_post_category');
const tableName = 'Xref_post_categories';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(tableName, schemaXref_post_category);
        await queryInterface.sequelize.query(
            `ALTER TABLE ${tableName} MODIFY COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
        );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable(tableName);
    },
};
