import moment from 'moment/moment';
import { prefixOrder, prefixTurkeyOrder } from '../../../settings';
export const handleDataForAutocomplete = (array) => {
    array &&
        array.length > 0 &&
        array.forEach((object) => {
            object.label = object.name;
            object.value = object.code;
        });
    return array;
};

export const isAlphanumeric = (inputString) => {
    if (inputString == '') {
        return true;
    }
    const pattern = /^[a-zA-Z0-9_]+$/;
    return pattern.test(inputString);
};

export const handleDataTypeVisaForAutocomplete = (array) => {
    array &&
        array.length > 0 &&
        array.forEach((object) => {
            object.label = object.desc;
            object.value = object.name;
        });
};

export const handleDataOrderForAutocomplete = (arrData, website) => {
    let prefix = '';
    switch (website) {
        case 'Evissa':
            prefix = prefixOrder;
            break;
        case 'Turkey':
            prefix = prefixTurkeyOrder;
            break;

        default:
            prefix = '';
            break;
    }
    arrData &&
        arrData.length > 0 &&
        arrData.map((item, index) => {
            item.booking_code = `${prefix}${item.id}`;
            item.customer = `${item.first_name} ${item.last_name}`;
            item.arrival_date = moment(item.arrival_date).format('DD/MM/YYYY');
            item.departure_date = moment(item.departure_date).format('DD/MM/YYYY');
            // item.another_people_number = item.another_people ? JSON.parse(item.another_people).length : 0;
            item.additional_service_number = item.additional_service ? JSON.parse(item.additional_service).length : 0;
            item.created_at = moment(item.created_at).format('HH:mm:ss - DD/MM/YYYY');
            item.updated_at = moment(item.updated_at).format('HH:mm:ss - DD/MM/YYYY');
            item.confirm_by = `${item.updated_by_info?.first_name ? item.updated_by_info?.first_name : ''} ${
                item.updated_by_info?.last_name ? item.updated_by_info?.last_name : ''
            }`;
            item.website = website;
        });
};

export const handleDataVisaForAutocomplete = (array) => {
    array &&
        array.length > 0 &&
        array.forEach((object) => {
            object.label = object.visa_info.name;
            object.value = object.visa_info.name;
        });
};

export const adminFormatDateFromAPI = (arrData) => {
    arrData &&
        arrData.length > 0 &&
        arrData.map((item, index) => {
            item.created_at = moment(item.created_at).format('MMMM Do YYYY, h:mm:ss a');
            item.updated_at = moment(item.updated_at).format('MMMM Do YYYY, h:mm:ss a');
        });
    return arrData;
};

export const handleDataTypeVisaForTable = (arrData) => {
    arrData &&
        arrData.length > 0 &&
        arrData.map((item, index) => {
            item.no = index + 1;
            item.created_at = moment(item.created_at).format('DD/MM/YYYY - HH:mm');
            item.updated_at = moment(item.updated_at).format('DD/MM/YYYY - HH:mm');
        });
    return arrData;
};

export const handleDataVisaForTable = (arrData) => {
    arrData &&
        arrData.length > 0 &&
        arrData.map((item, index) => {
            item.no = index + 1;
            item.country_table = item.country;
            item.visa_table = `${item?.visa_info.name} ${item?.visa_info.type}`;
            switch (item?.validity_type) {
                case 'd':
                    item.validity_table = `${item?.validity} days`;
                    break;
                case 'm':
                    item.validity_table = `${item?.validity} months`;
                    break;
                case 'y':
                    item.validity_table = `${item?.validity} years`;
                    break;
                default:
                    break;
            }
            item.allowed_country_table =
                Object.keys(item.allowed_country_info).length > 0 ? Object.keys(item.allowed_country_info).length : 0;

            if (item.allowed_country_table > 0) {
                const allowed_country_info = item.allowed_country_info.reduce((acc, country) => {
                    acc[country.code] = country.name;
                    return acc;
                }, {});
                item.allowed_country_info = Object.keys(allowed_country_info);
            }

            item.entryType = item?.visa_detail_entry_type;
            item.supporting_doc = item?.supporting_doc ? item?.supporting_doc : '';
            item.processing_times = `${item?.processing_times} days`;
            item.standard_fee_table = `${item?.standard_fee} ${item?.standard_fee_currency}`;
            item.government_fee_table = `${item?.government_fee} ${item?.government_fee_currency}`;
            item.published_table = item?.published == 1 ? 1 : 0;
            // item.visa_detail_info = null;
            // item.allowed_country = null;
        });
    return arrData;
};

export const handleDataLogForTable = (arrData) => {
    arrData &&
        arrData.length > 0 &&
        arrData.map((item, index) => {
            item.no = index + 1;
            item.created_at = moment(item.created_at).format('DD/MM/YYYY - HH:mm:ss');
            item.updated_at = moment(item.updated_at).format('DD/MM/YYYY - HH:mm:ss');
            item.created_by_table = `${item.created_by_info?.first_name} ${item.created_by_info?.last_name}`;
        });
    return arrData;
};
