import moment from 'moment';

export const handleDataPostForTable = (data) => {
    data &&
        data.length &&
        data.map((item) => {
            item.author = `${item.created_by_info?.first_name} ${item.created_by_info?.last_name}`;
            switch (item.published) {
                case 1:
                    item.published_table = 'Published';
                    break;
                case 2:
                    item.published_table = 'Draft';
                    break;
                case 0:
                    item.published_table = 'Disabled';
                    break;
                default:
                    break;
            }
            item.created_at_table = moment(item.created_at).format('HH:mm - DD/MM/YYYY');
        });
    return data;
};

export const handleAddIdForHeading = (content) => {
    let listHeadings = [];
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    let headingElement = tempDiv.querySelectorAll('h2, h3');
    headingElement.forEach((item) => {
        item.setAttribute(
            'id',
            item.innerHTML
                .toLowerCase()
                .replace(/<\/?strong>/g, '')
                .replace('’', '')
                .replace('&', '')
                .replace(/\s+/g, '-'),
        );
        listHeadings.push({
            type: item.tagName.toLowerCase(),
            id: item.id,
            text: item.textContent,
        });
    });
    return {
        heading_tags: listHeadings,
        newContent: tempDiv.innerHTML,
    };
};
