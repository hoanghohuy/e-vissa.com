import { Button, CircularProgress } from '@mui/material';
import stylesSystem from '@/app/page.module.css';
import styles from './ButtonApply.module.css';

export default function ButtonApply({ type, title, fullWidth, minWidth = '', color = '' }) {
    switch (type) {
        case 'primary':
            return (
                <>
                    <button
                        style={{
                            backgroundColor: color,
                            width: fullWidth ? '100%' : '',
                            minWidth: minWidth ? minWidth : '',
                        }}
                        className={styles.button__apply__primary}
                    >
                        {title}
                    </button>
                </>
            );

        case 'secondary':
            return (
                <>
                    <button
                        style={{
                            backgroundColor: color,
                            width: fullWidth ? '100%' : '',
                            minWidth: minWidth ? minWidth : '',
                        }}
                        className={`${styles.button__apply__secondary} dark:bg-[#222323] dark:hover:bg-[#121212]`}
                    >
                        {title}
                    </button>
                </>
            );

        case 'disabled':
            return (
                <>
                    <button
                        style={{
                            backgroundColor: color,
                            width: fullWidth ? '100%' : '',
                            minWidth: minWidth ? minWidth : '',
                        }}
                        className={styles.button__apply__disabled}
                    >
                        {title}
                    </button>
                </>
            );
        case 'loading':
            return (
                <>
                    <button
                        style={{
                            backgroundColor: color,
                            width: fullWidth ? '100%' : '',
                            minWidth: minWidth ? minWidth : '',
                        }}
                        className={styles.button__apply__loading}
                    >
                        <CircularProgress size={20} sx={{ color: '#fff' }} />
                    </button>
                </>
            );
        default:
            return <>Default</>;
    }
}
