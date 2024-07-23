import { DataTypes } from 'sequelize';
import sequelize from '@/dbx/turkey-evisagov/config';
import Visa from './Visa';
const validate = require('../validators');

export const Visa_country_detail = sequelize.define(
    'Visa_country_details',
    {
        country: {
            type: DataTypes.CHAR(5),
            allowNull: false,
            validate: validate.composeValidators(validate.notNull(), validate.len([2, 5], validate.isAlpha())),
        },
        visa: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: validate.composeValidators(validate.notNull(), validate.isInt()),
        },
        validity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: validate.composeValidators(validate.notNull(), validate.isInt()),
        },
        validity_type: {
            type: DataTypes.ENUM('y', 'm', 'd'),
            defaultValue: 'd',
            allowNull: false,
            validate: validate.composeValidators(validate.notNull(), validate.isIn(['y', 'm', 'd'])),
        },
        length_of_stay: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: validate.composeValidators(validate.notNull(), validate.isInt()),
        },
        length_of_stay_type: {
            type: DataTypes.ENUM('y', 'm', 'd'),
            defaultValue: 'd',
            allowNull: false,
            validate: validate.composeValidators(validate.notNull(), validate.isIn(['y', 'm', 'd'])),
        },
        processing_times: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: validate.composeValidators(validate.notNull(), validate.isInt()),
        },
        standard_fee: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
            validate: validate.composeValidators(validate.notNull(), validate.isFloat()),
        },
        standard_fee_currency: {
            type: DataTypes.CHAR(3),
            allowNull: false,
            defaultValue: 'USD',
            validate: validate.composeValidators(validate.len([2, 3]), validate.isAlpha()),
        },
        government_fee: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
            validate: validate.composeValidators(validate.notNull(), validate.isFloat()),
        },
        government_fee_currency: {
            type: DataTypes.CHAR(3),
            allowNull: false,
            defaultValue: 'USD',
            validate: validate.composeValidators(validate.len([2, 3]), validate.isAlpha()),
        },
        is_single: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            validate: validate.isBoolean(),
        },
        requirement_desc: {
            type: DataTypes.TEXT,
        },
        published: {
            type: DataTypes.TINYINT(1),
            defaultValue: 1,
            validate: validate.isIn([0, 1]),
        },
        created_by: {
            type: DataTypes.INTEGER,
            validate: validate.isInt(),
        },
        updated_by: {
            type: DataTypes.INTEGER,
            validate: validate.isInt(),
        },
    },
    {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
);

Visa_country_detail.belongsTo(Visa, { as: 'visa_info', foreignKey: 'visa' });

export default Visa_country_detail;
