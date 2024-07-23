'use strict';
const currency = require('./data/currency_data.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Currencies', currency, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Currencies', null, {});
    },
};
