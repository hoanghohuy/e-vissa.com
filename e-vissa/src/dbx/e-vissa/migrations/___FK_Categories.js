'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('Categories', {
            fields: ['parent_id'],
            type: 'foreign key',
            references: {
                table: 'Categories',
                field: 'id',
            },
            name: 'fk_categories_parent_id',
        });

        await queryInterface.addConstraint('Categories', {
            fields: ['updated_by'],
            type: 'foreign key',
            references: {
                table: 'Users',
                field: 'id',
            },
            name: 'fk_categories_updated_by',
        });

        await queryInterface.addConstraint('Categories', {
            fields: ['created_by'],
            type: 'foreign key',
            references: {
                table: 'Users',
                field: 'id',
            },
            name: 'fk_categories_created_by',
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('Categories', 'fk_categories_parent_id');
        await queryInterface.removeConstraint('Categories', 'fk_categories_updated_by');
        await queryInterface.removeConstraint('Categories', 'fk_categories_created_by');
    },
};
