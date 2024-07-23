'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('Posts', {
            fields: ['updated_by'],
            type: 'foreign key',
            references: {
                table: 'Users',
                field: 'id',
            },
            name: 'fk_posts_updated_by',
        });

        await queryInterface.addConstraint('Posts', {
            fields: ['created_by'],
            type: 'foreign key',
            references: {
                table: 'Users',
                field: 'id',
            },
            name: 'fk_posts_created_by',
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('Posts', 'fk_posts_updated_by');
        await queryInterface.removeConstraint('Posts', 'fk_posts_created_by');
    },
};
