'use strict';
const { Model } = require('sequelize');
const schemaCoupon = require('../schema/schemaCoupon');
module.exports = (sequelize, DataTypes) => {
    class Coupon extends Model {
        static associate(models) {
            Coupon.belongsTo(models.User, {
                foreignKey: 'updated_by',
                as: 'updated_by_info',
            });

            Coupon.belongsTo(models.User, {
                foreignKey: 'created_by',
                as: 'created_by_info',
            });
        }
    }
    Coupon.init(schemaCoupon, {
        sequelize,
        modelName: 'Coupon',
    });
    return Coupon;
};
