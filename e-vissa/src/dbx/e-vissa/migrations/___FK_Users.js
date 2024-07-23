'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('Users', {
            fields: ['updated_by'],
            type: 'foreign key',
            references: {
                table: 'Users',
                field: 'id',
            },
            name: 'fk_users_updated_by',
        });

        await queryInterface.addConstraint('Users', {
            fields: ['created_by'],
            type: 'foreign key',
            references: {
                table: 'Users',
                field: 'id',
            },
            name: 'fk_users_created_by',
        });

        await queryInterface.addConstraint('Users', {
            fields: ['country_of_residence'],
            type: 'foreign key',
            references: {
                table: 'Countries',
                field: 'code',
            },
            name: 'fk_users_country_of_residence',
        });

        await queryInterface.addConstraint('Users', {
            fields: ['nationality'],
            type: 'foreign key',
            references: {
                table: 'Countries',
                field: 'code',
            },
            name: 'fk_users_nationality',
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('Users', 'fk_users_updated_by');
        await queryInterface.removeConstraint('Users', 'fk_users_created_by');
        await queryInterface.removeConstraint('Users', 'fk_users_country_of_residence');
        await queryInterface.removeConstraint('Users', 'fk_users_nationality');
    },
};
