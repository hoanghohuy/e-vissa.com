const { Log } = require('@/dbx/e-vissa/models');
import { headers } from 'next/headers';
import { isEmptyObject } from './validation';

/**
 * Adds a log entry to the database.
 * @param {Object} logData - The log data object containing details of the log entry.
 * @param {String} logType - The type of log entry (e.g., 'info', 'error', 'warn').
 * @returns {Promise<boolean>} - A promise indicating whether the log was successfully added.
 */
export async function addLog(logData = {}, logType = 'info') {
    if (isEmptyObject(logData)) {
        console.error('Error: Log description is empty.');
        return false;
    }

    // Construct the log entry object
    const logEntry = {
        type: logType,
        action: headers().get('methodAPI'),
        IP: headers().get('X-Forwarded-For'),
        ...(headers().get('tokenUserId') && { created_by: headers().get('tokenUserId') }),
        ...logData,
        desc: JSON.stringify(logData.desc), // Override desc with the stringified value
    };

    try {
        await Log.create(logEntry);
        console.log('Log entry added successfully.');
        return true;
    } catch (error) {
        console.error('Error: Failed to save log entry -', error.message);
        return false;
    }
}
