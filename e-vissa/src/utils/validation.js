export const isDevelopmentEnv = process.env.NEXT_PUBLIC_SITE_NAME.endsWith('demo');

export function validateEmail(email) {
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            return false;
        }
        if (emailRegex.test(email)) {
            return true;
        }
        return false;
    } catch (error) {
        console.error('validate email failed: ' + error.message);
        return false;
    }
}

export function validateSlug(slug) {
    try {
        const emailRegex = /^[a-zA-Z0-9\-_.]+$/;
        if (emailRegex.test(slug)) {
            return true;
        }
        return false;
    } catch (error) {
        console.error('validate slug failed: ' + error.message);
        return false;
    }
}

export function validatePhoneNumber(phone) {
    try {
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if (phoneRegex.test(phone)) {
            return true;
        }
        return false;
    } catch (error) {
        console.error('validate phone failed: ' + error.message);
        return false;
    }
}

export function validateParams(request, params = ['published']) {
    try {
        const url = new URL(request.url);
        const extractedValues = {};

        for (const param of params) {
            const paramValue = url.searchParams.get(param) || undefined;
            if (paramValue === undefined) {
                continue;
            }

            // Check if the paramValue can be converted to a number
            const numericValue = Number(paramValue);
            if (!isNaN(numericValue)) {
                extractedValues[param] = numericValue; // Convert to a number
            } else {
                extractedValues[param] = paramValue; // Keep as a string
            }

            if (paramValue !== '') {
                if (!extractedValues['condition']) {
                    extractedValues['condition'] = {};
                }
                extractedValues['condition'][param] = extractedValues[param];
            }
        }

        if (
            typeof extractedValues['condition'] === 'undefined' ||
            Object.keys(extractedValues['condition']).length === 0
        ) {
            extractedValues['condition'] = {};
        }

        return extractedValues;
    } catch (error) {
        console.error('validate failed: ' + error.message);
        return {};
    }
}

export function isEmptyObject(objOrArr) {
    return (
        !objOrArr ||
        (Array.isArray(objOrArr) && objOrArr.length === 0) ||
        (typeof objOrArr === 'object' && Object.keys(objOrArr).length === 0)
    );
}

export function checkOrderId(id) {
    try {
        const orderId = parseInt(id.match(/\d+/)[0], 10);
        if (orderId) {
            return orderId;
        }
        return false;
    } catch (error) {
        return false;
    }
}

export function removeKeysInObject(dataObj, keysToDelete) {
    try {
        if (typeof dataObj !== 'object' || keysToDelete.length === 0) {
            return dataObj;
        }

        for (const key of keysToDelete) {
            if (dataObj?.[key]) {
                delete dataObj[key];
            }
        }
        return dataObj;
    } catch (error) {
        return dataObj;
    }
}

export function isSuccessStatus(statusCode) {
    try {
        const code = parseInt(statusCode);
        if (code === 200 || code === 201) {
            return true;
        }

        return false;
    } catch (error) {
        return false;
    }
}

export function checkValidityType(code) {
    switch (code) {
        case 'd':
            return 'days';
        case 'm':
            return 'months';
        case 'y':
            return 'years';

        default:
            return '';
    }
}

export function upperFirstLetter(str) {
    if (typeof str === 'string') {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return str;
}

export function isSchemaJsonLD(schema) {
    try {
        const schemaObj = JSON.parse(schema);
        return typeof schemaObj === 'object';
    } catch (error) {
        return false;
    }
}
