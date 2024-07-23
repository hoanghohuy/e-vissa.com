'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('Logs', {
            fields: ['created_by'],
            type: 'foreign key',
            references: {
                table: 'Users',
                field: 'id',
            },
            name: 'fk_logs_created_by',
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('Logs', 'fk_logs_created_by');
    },
};
