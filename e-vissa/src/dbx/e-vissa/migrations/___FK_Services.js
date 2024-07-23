'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('Services', {
            fields: ['updated_by'],
            type: 'foreign key',
            references: {
                table: 'Users',
                field: 'id',
            },
            name: 'fk_services_updated_by',
        });

        await queryInterface.addConstraint('Services', {
            fields: ['created_by'],
            type: 'foreign key',
            references: {
                table: 'Users',
                field: 'id',
            },
            name: 'fk_services_created_by',
        });

        await queryInterface.addConstraint('Services', {
            fields: ['currency'],
            type: 'foreign key',
            references: {
                table: 'Currencies',
                field: 'code',
            },
            name: 'fk_services_currency',
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('Services', 'fk_services_updated_by');
        await queryInterface.removeConstraint('Services', 'fk_services_created_by');
        await queryInterface.removeConstraint('Services', 'fk_services_currency');
    },
};
