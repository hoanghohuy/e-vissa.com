import { DataTypes } from 'sequelize';
import sequelize from '@/dbx/internal_users/config';
const validate = require('../validators');

export const Visa_websites = sequelize.define(
    'Visa_websites',
    {
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: validate.composeValidators(validate.notNull(), validate.varcharLen()),
        },
        published: {
            type: DataTypes.TINYINT(1),
            defaultValue: 1,
            validate: validate.isIn([0, 1]),
        },
    },
    {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
);

export async function syncVisaWebsitesModel() {
    try {
        await Visa_websites.sync();
    } catch (error) {
        console.error('Error creating Visa_websites table:', error.message);
    }
}

export async function syncVisaWebsitesData() {
    try {
        if ((await Visa_websites.findAndCountAll())?.count === 0) {
            const websites = [
                {
                    name: 'evissa',
                },
                {
                    name: 'turkey-evisagov',
                },
                {
                    name: 'vietnam-evisagov',
                },
                {
                    name: 'canada-visagov',
                },
            ];
            await Visa_websites.bulkCreate(websites);
        }
    } catch (error) {
        console.error('Error creating Visa_websites data:', error.message);
    }
}

export default Visa_websites;
