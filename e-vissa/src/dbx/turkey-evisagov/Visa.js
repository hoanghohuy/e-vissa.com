import { DataTypes } from 'sequelize';
import sequelize from '@/dbx/turkey-evisagov/config';
const validate = require('../validators');

export const Visa = sequelize.define(
    'Visas',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: validate.composeValidators(validate.notNull(), validate.varcharLen()),
        },
        type: {
            type: DataTypes.ENUM('E-visa', 'ESTA', 'ETA'),
            allowNull: false,
            validate: validate.composeValidators(validate.notNull(), validate.isIn(['E-visa', 'ESTA', 'ETA'])),
        },
        desc: {
            type: DataTypes.TEXT,
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

export default Visa;
