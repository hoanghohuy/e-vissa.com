import { ThemeProvider } from '@/context/ThemeContext';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import { AnalyticsTracking } from './AnalyticsTracking';
import { ToastContainer } from 'react-toastify';
import { Suspense } from 'react';
import GoogleCaptchaWrapper from './GoogleCaptchaWrapper';
import ReduxProvider from '@/redux/ReduxProvider';
import Loading from './loading';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import './dark.css';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <AnalyticsTracking />
            <GoogleCaptchaWrapper>
                <body>
                    <ReduxProvider>
                        <AuthProvider>
                            <Suspense fallback={<Loading />}>
                                <ThemeProvider>{children}</ThemeProvider>
                            </Suspense>
                        </AuthProvider>
                        <ToastContainer />
                    </ReduxProvider>
                </body>
            </GoogleCaptchaWrapper>
        </html>
    );
}
