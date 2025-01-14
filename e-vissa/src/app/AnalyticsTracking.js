import Script from 'next/script';

export const AnalyticsTracking = () => {
    return (
        <>
            {/* Global site tag (gtag.js) - Google Analytics */}
            <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-CTF95CPNM2" />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){window.dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-CTF95CPNM2');
                `}
            </Script>
            {/* ===Hotjar tracking=== */}
            <Script>
                {`
                    (function(h,o,t,j,a,r){
                        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                        h._hjSettings={hjid:4992724,hjsv:6};
                        a=o.getElementsByTagName('head')[0];
                        r=o.createElement('script');r.async=1;
                        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                        a.appendChild(r);
                    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                `}
            </Script>
        </>
    );
};
