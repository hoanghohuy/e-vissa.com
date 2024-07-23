import { validateParams } from '@/utils/validation';
import { NextResponse } from 'next/server';
import * as fastcsv from 'fast-csv';
import fs from 'fs';
import os from 'os';
import path from 'path';
// models
const { sequelize, Sequelize, Visa_country_detail, Xref_visa_country, Visa } = require('@/dbx/e-vissa/models');

export const GET = async (request) => {
    try {
        const { visa_detail, country, condition } = validateParams(request, ['visa_detail', 'country']);
        let result = await Xref_visa_country.findAll({
            attributes: [
                'visa_detail',
                'country',
                [
                    Sequelize.fn('GROUP_CONCAT', Sequelize.literal('DISTINCT allowed_country SEPARATOR ", "')),
                    'allowed_countries',
                ],
                [Sequelize.fn('COUNT', Sequelize.literal('DISTINCT allowed_country')), 'allowed_country_count'],
            ],
            include: [
                {
                    model: Visa_country_detail,
                    as: 'visa_detail_info',
                    attributes: {
                        exclude: ['id', 'country', 'created_at', 'updated_at', 'created_by', 'updated_by'],
                    },
                    include: [
                        {
                            model: Visa,
                            as: 'visa_info',
                            attributes: {
                                exclude: ['id', 'created_at', 'updated_at', 'created_by', 'updated_by', 'published'],
                            },
                        },
                    ],
                },
            ],
            where: condition,
            group: ['visa_detail', 'country'],
            raw: true,
        });

        if (result) {
            // Function to remove or change prefix from keys
            const modifyPrefix = (obj, prefix, newPrefix = '') => {
                const newObj = {};
                for (const key in obj) {
                    if (key.startsWith(prefix)) {
                        newObj[newPrefix + key.substring(prefix.length)] = obj[key];
                    } else {
                        newObj[key] = obj[key];
                    }
                }
                return newObj;
            };

            // Apply modifyPrefix function to each object in the array
            const removedPrefix = result.map((obj) => modifyPrefix(obj, 'visa_detail_info.'));
            result = removedPrefix.map((obj) => modifyPrefix(obj, 'visa_info.', 'visa_'));
        }

        // Create a temporary file
        const tempDir = os.tmpdir();
        const tmpFilePath = path.join(tempDir, 'e-vissa.csv');
        const streamedFile = fs.createWriteStream(tmpFilePath);

        // Write CSV data and wait for the stream to finish
        await new Promise((resolve) => {
            fastcsv.write(result, { headers: true }).pipe(streamedFile).on('finish', resolve);
        });

        const fileContent = fs.createReadStream(tmpFilePath);

        return new Response(fileContent, {
            status: 200,
            headers: {
                'content-disposition': `attachment; filename=${path.basename(tmpFilePath)}`,
                'content-type': 'text/csv',
            },
        });
    } catch (error) {
        return NextResponse.json({ error: 'Error creating file: ' + error.message }, { status: 500 });
    }
};

export const POST = async (request) => {
    const formData = await request.formData();
    const csvFile = formData.get('csvFile');
    const buffer = Buffer.from(await csvFile.arrayBuffer());

    try {
        const csvData = [];
        fastcsv
            .parseString(buffer.toString(), { headers: true })
            .on('data', (row) => {
                csvData.push(row);
            })
            .on('end', () => {
                // Process the CSV data here
                console.log('Parsed CSV data:', csvData);
                return NextResponse.json({ csvData });
            });

        return NextResponse.json({ success: 'Import sucessfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Error reading file: ' + error.message }, { status: 500 });
    }
};
