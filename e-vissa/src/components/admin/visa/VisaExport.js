import { Button } from '@mui/material';
import stylesSystem from '@/app/page.module.css';

const VisaExport = ({ accessToken, country }) => {
    const handleExport = async () => {
        try {
            const response = await fetch(`/api/admin/csv?country=${country}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken,
                },
            });

            if (response.ok) {
                // Get the filename from the Content-Disposition header
                const filename = response.headers.get('Content-Disposition').split('filename=')[1];

                // Create a Blob from the response
                const blob = await response.blob();

                // Create a temporary link element
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = filename || 'exported_data.csv';

                // Append the link to the document and trigger the click event
                document.body.appendChild(link);
                link.click();

                // Remove the link from the document
                document.body.removeChild(link);
            } else {
                // Handle error response
                console.error('Error exporting data:', response.statusText);
            }
        } catch (error) {
            console.error('Error exporting data:', error);
        }
    };

    return (
        <div>
            {country && (
                <Button
                    variant="contained"
                    disableElevation
                    className={stylesSystem.admin__button__primary}
                    onClick={handleExport}
                >
                    Export CSV
                </Button>
            )}
        </div>
    );
};

export default VisaExport;
