import moment from 'moment';

export const handleDataImagesForTable = (arrData) => {
    const data = [];
    arrData &&
        arrData.length > 0 &&
        arrData.map((item, index) => {
            let tempObj = {};
            tempObj.id = index + 1;
            tempObj.name = item;
            tempObj.link = item;
            data.push(tempObj);
        });
    return data;
};
