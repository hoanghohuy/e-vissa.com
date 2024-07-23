import stylesAdmin from '../Admin.module.css';

export const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    {
        field: 'published',
        headerName: 'Status',
        width: 200,
        renderCell: (params) => {
            return (
                <div className={`${params.value == '1' ? stylesAdmin.published : stylesAdmin.unPublished}`}>
                    {params.value == '1' ? 'Published' : 'Disabled'}
                </div>
            );
        },
    },
];
