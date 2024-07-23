'use strict';
const XrefVisaCountry = require('./data/xref_visa_country_data.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Xref_visa_countries', XrefVisaCountry, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Xref_visa_countries', null, {});
    },
};
