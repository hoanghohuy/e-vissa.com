import { toast } from 'react-toastify';
export const ToastNotify = (message, type = 'error') => {
    switch (type) {
        case 'success':
            toast.success(message, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            break;

        case 'info':
            toast.info(message, {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            break;
        default:
            toast.error(message, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            break;
    }
};
