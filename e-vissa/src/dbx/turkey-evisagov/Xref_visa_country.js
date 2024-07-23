import { DataTypes } from 'sequelize';
import sequelize from '@/dbx/turkey-evisagov/config';
import Visa_country_detail from './Visa_country_detail';
const validate = require('../validators');

export const Xref_visa_country = sequelize.define(
    'Xref_visa_countries',
    {
        country: {
            type: DataTypes.CHAR(5),
            allowNull: false,
            validate: validate.composeValidators(validate.notNull(), validate.len([2, 5], validate.isAlpha())),
        },
        allowed_country: {
            type: DataTypes.CHAR(5),
            allowNull: false,
            validate: validate.composeValidators(validate.notNull(), validate.len([2, 5], validate.isAlpha())),
        },
        visa_detail: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: validate.composeValidators(validate.notNull(), validate.isInt()),
        },
        supporting_doc: {
            type: DataTypes.TEXT(),
        },
    },
    {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
);

Xref_visa_country.belongsTo(Visa_country_detail, { as: 'visa_detail_info', foreignKey: 'visa_detail' });

export default Xref_visa_country;
