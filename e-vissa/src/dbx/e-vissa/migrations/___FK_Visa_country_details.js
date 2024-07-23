'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('Visa_country_details', {
            fields: ['updated_by'],
            type: 'foreign key',
            references: {
                table: 'Users',
                field: 'id',
            },
            name: 'fk_visa_country_details_updated_by',
        });

        await queryInterface.addConstraint('Visa_country_details', {
            fields: ['created_by'],
            type: 'foreign key',
            references: {
                table: 'Users',
                field: 'id',
            },
            name: 'fk_visa_country_details_created_by',
        });

        await queryInterface.addConstraint('Visa_country_details', {
            fields: ['country'],
            type: 'foreign key',
            references: {
                table: 'Countries',
                field: 'code',
            },
            name: 'fk_visa_country_details_country',
        });

        await queryInterface.addConstraint('Visa_country_details', {
            fields: ['government_fee_currency'],
            type: 'foreign key',
            references: {
                table: 'Currencies',
                field: 'code',
            },
            name: 'fk_visa_country_details_government_fee_currency',
        });

        await queryInterface.addConstraint('Visa_country_details', {
            fields: ['visa'],
            type: 'foreign key',
            references: {
                table: 'Visas',
                field: 'id',
            },
            name: 'fk_visa_country_details_visa',
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('Visa_country_details', 'fk_visa_country_details_updated_by');
        await queryInterface.removeConstraint('Visa_country_details', 'fk_visa_country_details_created_by');
        await queryInterface.removeConstraint('Visa_country_details', 'fk_visa_country_details_country');
        await queryInterface.removeConstraint(
            'Visa_country_details',
            'fk_visa_country_details_government_fee_currency',
        );
        await queryInterface.removeConstraint('Visa_country_details', 'fk_visa_country_details_visa');
    },
};
