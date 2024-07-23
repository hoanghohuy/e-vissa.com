import moment from 'moment';

export const adminUserFormatDataForTable = (arrData) => {
    arrData &&
        arrData.length > 0 &&
        arrData.map((item, index) => {
            item.no = index + 1;
            item.gender_table = item.gender == '1' ? `Male` : `Female`;
            item.name_table = `${item.first_name} ${item.last_name}`;
            item.role_table = item.role_info?.name;
            item.nationality_table = item.nationality_info?.name;
            item.date_of_birth_table = moment(item.date_of_birth).format('DD/MM/YYYY');
            item.published_table = item.published == 1 ? `Active` : `x`;
            // item.created_at = moment(item.created_at).format('MMMM Do YYYY, h:mm:ss a');
            // item.updated_at = moment(item.updated_at).format('MMMM Do YYYY, h:mm:ss a');
        });
    return arrData;
};
