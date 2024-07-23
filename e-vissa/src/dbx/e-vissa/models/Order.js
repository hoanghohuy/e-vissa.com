'use strict';
const { Model } = require('sequelize');
const schemaOrder = require('../schema/schemaOrder');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            Order.belongsTo(models.Xref_visa_country, {
                foreignKey: 'xref_visa_country',
                as: 'xref_visa_country_info',
            });

            Order.belongsTo(models.Currency, {
                foreignKey: 'currency',
                targetKey: 'code',
                as: 'currency_info',
            });

            Order.belongsTo(models.User, {
                foreignKey: 'updated_by',
                as: 'updated_by_info',
            });

            Order.belongsTo(models.User, {
                foreignKey: 'created_by',
                as: 'created_by_info',
            });

            Order.belongsTo(models.Country, {
                foreignKey: 'country_of_residence',
                targetKey: 'code',
                as: 'country_of_residence_info',
            });

            Order.belongsTo(models.Country, {
                foreignKey: 'nationality',
                targetKey: 'code',
                as: 'nationality_info',
            });

            Order.addHook('beforeCreate', async (instance) => {
                instance.id = await generateUniqueRandomNumber(Order, 6, 9);
            });

            async function generateUniqueRandomNumber(model, minDigits, maxDigits) {
                while (true) {
                    const randomId = generateRandomNumber(minDigits, maxDigits);
                    const existingRecord = await model.findOne({ where: { id: randomId } });
                    if (existingRecord === null) {
                        return randomId;
                    }
                }
            }

            function generateRandomNumber(minDigits, maxDigits) {
                const min = Math.pow(10, minDigits - 1);
                const max = Math.pow(10, maxDigits) - 1;
                return String(Math.floor(min + Math.random() * (max - min + 1)));
            }
        }
    }
    Order.init(schemaOrder, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
};
