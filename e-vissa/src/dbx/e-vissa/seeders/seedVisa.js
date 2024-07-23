'use strict';
const visa = require('./data/visa_data.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Visas', visa, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Visas', null, {});
    },
};
