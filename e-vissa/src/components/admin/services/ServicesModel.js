import stylesAdmin from '../Admin.module.css';

export const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 250 },
    { field: 'value', headerName: 'Value (USD)', width: 130 },
    // { field: 'currency', headerName: 'Currency', width: 130 },
    {
        field: 'value_on',
        headerName: 'Value on',
        width: 130,
        renderCell: (params) => {
            return (
                <div
                    className={`${
                        params.value == 'person'
                            ? 'text-[#fff] bg-[#FFA732] py-1 px-3 rounded-md'
                            : 'bg-[#5C8374] text-[#fff] py-1 px-3 rounded-md'
                    }`}
                >
                    {params.value}
                </div>
            );
        },
    },
    { field: 'desc', headerName: 'Desc', width: 600 },
    {
        field: 'published',
        type: 'boolean',
        headerName: 'Published',
        width: 100,
        renderCell: (params) => {
            return (
                <div className={`${params.value == '1' ? stylesAdmin.published : stylesAdmin.unPublished}`}>
                    {params.value == '1' ? 'Active' : 'Disabled'}
                </div>
            );
        },
    },
];
