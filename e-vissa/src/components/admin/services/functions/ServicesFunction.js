import moment from 'moment';

export const handleDataServicesForTable = (arrData) => {
    arrData &&
        arrData.length > 0 &&
        arrData.map((item, index) => {
            item.no = index + 1;
            item.created_at = moment(item.created_at).format('MMMM Do YYYY, h:mm:ss a');
            item.updated_at = moment(item.updated_at).format('MMMM Do YYYY, h:mm:ss a');
            item.published_table = item.published == '1' ? 'Published' : 'x';
        });
    return arrData;
};
