'use strict';
const service = require('./data/service_data.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Services', service, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Services', null, {});
    },
};
