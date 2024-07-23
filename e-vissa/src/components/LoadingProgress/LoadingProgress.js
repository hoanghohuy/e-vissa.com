import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const useLoadingProgress = () => {
    const pathName = usePathname();
    const [showProgress, setShowProgress] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleLoadingProgress = (link) => {
        if (pathName === `/${link}`) {
            return;
        }
        setShowProgress(true);
        setProgress(0);
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress >= 99) {
                    return 99;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 500);

        return () => {
            clearInterval(timer);
            setShowProgress(false);
        };
    };

    useEffect(() => {
        setShowProgress(false);
    }, [pathName]);

    return { showProgress, progress, handleLoadingProgress };
};
