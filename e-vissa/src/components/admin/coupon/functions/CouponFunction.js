import moment from 'moment';

export const handleDataCouponForTable = (arrData) => {
    arrData &&
        arrData.length > 0 &&
        arrData.map((item, index) => {
            item.no = index + 1;
            item.published_table = item.published == 1 ? 'Published' : 'x';
            item.percent_table = `${item.percent} %`;
            item.price_table = `${item.price} USD`;
            item.date_start_table = moment(item.date_start).format('HH:mm - DD/MM/YYYY');
            item.date_end_table = moment(item.date_end).format('HH:mm - DD/MM/YYYY');
        });
    return arrData;
};
