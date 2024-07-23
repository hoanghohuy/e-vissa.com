'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('Xref_visa_countries', {
            fields: ['country'],
            type: 'foreign key',
            references: {
                table: 'Countries',
                field: 'code',
            },
            name: 'fk_xref_visa_countries_country',
        });

        await queryInterface.addConstraint('Xref_visa_countries', {
            fields: ['allowed_country'],
            type: 'foreign key',
            references: {
                table: 'Countries',
                field: 'code',
            },
            name: 'fk_xref_visa_countries_allowed_country',
        });

        await queryInterface.addConstraint('Xref_visa_countries', {
            fields: ['visa_detail'],
            type: 'foreign key',
            references: {
                table: 'Visa_country_details',
                field: 'id',
            },
            name: 'fk_xref_visa_countries_visa_detail',
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('Xref_visa_countries', 'fk_xref_visa_countries_country');
        await queryInterface.removeConstraint('Xref_visa_countries', 'fk_xref_visa_countries_allowed_country');
        await queryInterface.removeConstraint('Xref_visa_countries', 'fk_xref_visa_countries_visa_detail');
    },
};
