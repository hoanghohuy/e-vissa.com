'use strict';
const country = require('./data/country_data.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Countries', country, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Countries', null, {});
    },
};
