import Swal from 'sweetalert2';
import styles from './PageNotify.module.css';

export const PageNotify = (type, text, confirmText, redirect) => {
    let notifyObj = {};
    switch (type) {
        case 'warning':
            notifyObj.title = 'Warning';
            notifyObj.icon = 'warning';
            break;
        case 'success':
            notifyObj.title = 'Yay! 🎉';
            notifyObj.icon = 'success';
            break;
        default:
            break;
    }
    Swal.fire({
        icon: notifyObj.icon,
        text: text,
        showCloseButton: true,
        confirmButtonText: confirmText,
        customClass: { confirmButton: `${styles.page__custom__notify}` },
    }).then(() => {
        if (redirect) {
            window.location.assign(redirect);
        }
    });
};

export const PageConfirmDialog = (text, confirmText) => {
    Swal.fire({
        icon: 'warning',
        text: text,
        showCloseButton: true,
        confirmButtonText: confirmText,
        customClass: { confirmButton: `${styles.page__custom__notify}` },
    }).then((result) => {
        if (result.isConfirmed) {
            const pathname = window.location.href;
            localStorage.setItem('latest_route', pathname);
            window.location.assign('/login');
        }
    });
};
