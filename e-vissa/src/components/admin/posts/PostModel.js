import stylesAdmin from '../Admin.module.css';
export const columns = [
    { field: 'id', headerName: 'ID', width: 120 },
    { field: 'title', headerName: 'Post title', width: 300 },
    { field: 'author', headerName: 'Author', width: 200 },
    // { field: 'meta_desc', headerName: 'Description (meta description)', width: 250 },
    // { field: 'keyword', headerName: 'Keywords', width: 200 },
    // { field: 'content', headerName: 'Content', width: 200 },
    { field: 'image', headerName: 'Thumbnail image', width: 360 },
    { field: 'created_at_table', headerName: 'Created at', width: 160 },
    {
        field: 'published',
        headerName: 'Published',
        renderCell: (params) => {
            return (
                <div className={`${params.value == '1' ? stylesAdmin.published : stylesAdmin.unPublished}`}>
                    {params.value}
                </div>
            );
        },
        width: 120,
    },
];
