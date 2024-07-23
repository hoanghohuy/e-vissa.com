'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'Categories',
            [
                { id: 1, name: 'Blog', slug: 'blog', created_by: 3 },
                { id: 2, name: 'Visa applications', slug: 'visa-applications', created_by: 3 },
                { id: 3, name: 'Passport', slug: 'passport', created_by: 3 },
                { id: 4, name: 'Visa guide', slug: 'visa-guide', created_by: 3 },
                { id: 5, name: 'Embassy', slug: 'embassy', created_by: 3 },
                { id: 6, name: 'Travel documents', slug: 'travel-documents', created_by: 3 },
                { id: 7, name: 'Visa fees', slug: 'visa-fees', created_by: 3 },
                { id: 8, name: 'News', slug: 'news', created_by: 3 },
                { id: 9, name: 'Requirements', slug: 'requirements', created_by: 3 },
            ],
            {},
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Categories', null, {});
    },
};
