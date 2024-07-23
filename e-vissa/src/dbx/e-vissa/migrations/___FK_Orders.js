'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('Orders', {
            fields: ['updated_by'],
            type: 'foreign key',
            references: {
                table: 'Users',
                field: 'id',
            },
            name: 'fk_orders_updated_by',
        });

        await queryInterface.addConstraint('Orders', {
            fields: ['created_by'],
            type: 'foreign key',
            references: {
                table: 'Users',
                field: 'id',
            },
            name: 'fk_orders_created_by',
        });

        await queryInterface.addConstraint('Orders', {
            fields: ['xref_visa_country'],
            type: 'foreign key',
            references: {
                table: 'Xref_visa_countries',
                field: 'id',
            },
            name: 'fk_orders_xref_visa_country',
        });

        await queryInterface.addConstraint('Orders', {
            fields: ['country_of_residence'],
            type: 'foreign key',
            references: {
                table: 'Countries',
                field: 'code',
            },
            name: 'fk_orders_country_of_residence',
        });

        await queryInterface.addConstraint('Orders', {
            fields: ['nationality'],
            type: 'foreign key',
            references: {
                table: 'Countries',
                field: 'code',
            },
            name: 'fk_orders_nationality',
        });

        await queryInterface.addConstraint('Orders', {
            fields: ['currency'],
            type: 'foreign key',
            references: {
                table: 'Currencies',
                field: 'code',
            },
            name: 'fk_orders_currency',
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('Orders', 'fk_orders_updated_by');
        await queryInterface.removeConstraint('Orders', 'fk_orders_created_by');
        await queryInterface.removeConstraint('Orders', 'fk_orders_xref_visa_country');
        await queryInterface.removeConstraint('Orders', 'fk_orders_country_of_residence');
        await queryInterface.removeConstraint('Orders', 'fk_orders_nationality');
        await queryInterface.removeConstraint('Orders', 'fk_orders_currencies');
        await queryInterface.removeConstraint('Orders', 'fk_orders_government_fee_currency');
    },
};
