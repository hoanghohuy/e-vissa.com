'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('Comments', {
            fields: ['created_by'],
            type: 'foreign key',
            references: {
                table: 'Users',
                field: 'id',
            },
            name: 'fk_comments_created_by',
        });

        await queryInterface.addConstraint('Comments', {
            fields: ['post_id'],
            type: 'foreign key',
            references: {
                table: 'Users',
                field: 'id',
            },
            name: 'fk_comments_post_id',
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('Comments', 'fk_comments_created_by', 'fk_comments_post_id');
    },
};
