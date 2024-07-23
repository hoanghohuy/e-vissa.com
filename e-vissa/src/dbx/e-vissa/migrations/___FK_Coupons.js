'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('Coupons', {
            fields: ['updated_by'],
            type: 'foreign key',
            references: {
                table: 'Users',
                field: 'id',
            },
            name: 'fk_coupons_updated_by',
        });

        await queryInterface.addConstraint('Coupons', {
            fields: ['created_by'],
            type: 'foreign key',
            references: {
                table: 'Users',
                field: 'id',
            },
            name: 'fk_coupons_created_by',
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('Coupons', 'fk_coupons_updated_by');
        await queryInterface.removeConstraint('Coupons', 'fk_coupons_created_by');
    },
};
