'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('Xref_post_categories', {
            fields: ['post_id'],
            type: 'foreign key',
            references: {
                table: 'Posts',
                field: 'id',
            },
            name: 'fk_xref_post_categories_post_id',
        });

        await queryInterface.addConstraint('Xref_post_categories', {
            fields: ['category_id'],
            type: 'foreign key',
            references: {
                table: 'Categories',
                field: 'id',
            },
            name: 'fk_xref_post_categories_category_id',
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('Xref_post_categories', 'fk_xref_post_categories_post_id');
        await queryInterface.removeConstraint('Xref_post_categories', 'fk_xref_post_categories_category_id');
    },
};
