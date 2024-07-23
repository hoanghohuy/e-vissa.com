'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('Visas', {
            fields: ['updated_by'],
            type: 'foreign key',
            references: {
                table: 'Users',
                field: 'id',
            },
            name: 'fk_visas_updated_by',
        });

        await queryInterface.addConstraint('Visas', {
            fields: ['created_by'],
            type: 'foreign key',
            references: {
                table: 'Users',
                field: 'id',
            },
            name: 'fk_visas_created_by',
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('Visas', 'fk_visas_updated_by');
        await queryInterface.removeConstraint('Visas', 'fk_visas_created_by');
    },
};
