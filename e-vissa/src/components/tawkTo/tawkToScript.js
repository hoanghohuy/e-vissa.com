import Script from 'next/script';
import React from 'react';
const tawktoEmbed = `https://embed.tawk.to/${process.env.TAWKTO_KEY}`;

export default function TawkToScript() {
    return <Script strategy="lazyOnload" src={tawktoEmbed} />;
}
