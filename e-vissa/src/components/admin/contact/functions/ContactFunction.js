import moment from 'moment/moment';

export const handleDataContactForTable = (data) => {
    data &&
        data.length &&
        data.map((item) => {
            item.confirmed = item.confirmed_email ? true : false;
            item.created_at_table = moment(item.created_at_table).format('DD/MM/YYYY HH:mm');
        });
    return data;
};
