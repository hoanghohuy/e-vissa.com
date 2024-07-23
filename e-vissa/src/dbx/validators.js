// validators.js
'use strict';
const { UniqueConstraintError, ValidationError } = require('sequelize');

module.exports = {
    notNull: function (msg = 'cannot be null') {
        return { notNull: { msg } };
    },

    notEmpty: function (msg = 'must not be empty or contain only whitespace') {
        return { notEmpty: { msg } };
    },

    notNullAndEmpty: function (msg = 'must not be empty or contain only whitespace') {
        return {
            notEmpty: { msg },
            notNull: { msg },
        };
    },

    isInt: function (msg = 'must be an integer') {
        return { isInt: { msg } };
    },

    isFloat: function (msg = 'must be a floating-point number') {
        return { isFloat: { msg } };
    },

    max: function (maxNum, msg = `must be greater than or equal to ${maxNum}`) {
        return {
            max: {
                args: [maxNum],
                msg,
            },
        };
    },

    min: function (minNum, msg = `must be less than or equal to ${minNum}`) {
        return {
            min: {
                args: [minNum],
                msg,
            },
        };
    },

    isIn: function (arr, msg = 'is invalid') {
        return { isIn: { args: [arr], msg } };
    },

    isBoolean: function (msg = 'is invalid') {
        return { isIn: { args: [[true, false, 1, 0]], msg } };
    },

    isIP: function (version, msg = 'is invalid') {
        return {
            isIP: {
                version, //'4' for IPv4, '6' for IPv6
                msg,
            },
        };
    },

    isEmail: function (msg = 'is invalid') {
        return {
            isEmail: { msg },
        };
    },

    isDate: function (msg = 'is invalid format') {
        return {
            isDate: { msg },
        };
    },

    len: function (arr = [], msg = `length must be min: ${arr[0]}, max: ${arr[1]}`) {
        return {
            len: {
                args: arr,
                msg,
            },
        };
    },

    varcharLen: function (arr = [0, 255], msg = `length must be min: ${arr[0]}, max: ${arr[1]}`) {
        return {
            len: {
                args: arr,
                msg,
            },
        };
    },

    isAlpha: function (msg = 'should only contain alphabetical characters.') {
        return {
            isAlpha: {
                msg,
            },
        };
    },

    isAfter: function (
        inputDate = new Date(new Date().setDate(new Date().getDate() - 1)),
        msg = 'starting today and extending into the future.',
    ) {
        const stringDate = getISOString(inputDate);

        if (stringDate === '') {
            return {};
        }

        return {
            isAfter: {
                args: stringDate,
                msg,
            },
        };
    },

    isBefore: function (
        inputDate = new Date(new Date().setDate(new Date().getDate() + 1)),
        msg = 'starting today and extending into the past.',
    ) {
        const stringDate = getISOString(inputDate);

        if (stringDate === '') {
            return {};
        }

        return {
            isBefore: {
                args: stringDate,
                msg,
            },
        };
    },

    composeValidators: function (...validators) {
        return validators.reduce((acc, validator) => {
            return { ...acc, ...validator };
        }, {});
    },

    SequelizeValidationError: function (error, formatFieldName = true, firstMsg = true) {
        // Default error message 500 | Show error message in development mode only.
        let errorMessage = error.message;
        if (!process.env.NEXT_PUBLIC_SITE_NAME.endsWith('demo')) {
            errorMessage = '';
        }
        let validationErrors = {
            message: { error: 'Internal Server Error ' + errorMessage },
            status: { status: 500 },
        };

        // Unique Constraint Error
        if (error instanceof UniqueConstraintError) {
            const violatingField = Object.keys(error.fields)[0];
            const sqlMessage = error.original?.sqlMessage || `The ${violatingField} field must be unique.`;
            return { message: { error: sqlMessage }, status: { status: 422 } };
        }

        // Sequelize validation
        if (error instanceof ValidationError) {
            validationErrors.status = { status: 422 };
            validationErrors.message = {};

            error.errors.forEach((err) => {
                let fieldName = err.path;

                if (formatFieldName) {
                    // Replace underscores with spaces and capitalize first word
                    fieldName = fieldName.replace(/_/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase());
                }

                if (firstMsg) {
                    validationErrors.message = { error: `${fieldName} ${err.message}` };
                } else {
                    validationErrors.message[fieldName] = { error: `${fieldName} ${err.message}` };
                }
            });
        }

        return validationErrors;
    },
};

function getISOString(date) {
    if (typeof date === 'object') {
        return date.toISOString().split('T')[0];
    }

    if (typeof date === 'string') {
        const dateObject = new Date(date);
        return dateObject.toISOString().split('T')[0];
    }

    return '';
}
