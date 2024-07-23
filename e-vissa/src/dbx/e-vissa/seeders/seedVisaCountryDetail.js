'use strict';
const visaDetail = require('./data/visa_country_detail_data.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Visa_country_details', visaDetail, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Visa_country_details', null, {});
    },
};
