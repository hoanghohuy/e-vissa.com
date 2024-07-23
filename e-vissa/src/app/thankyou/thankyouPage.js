import React from 'react';
import { settingsData } from '../../../settings';

export default function ThankyouPage() {
    return (
        <div className="max-w-[400px] h-[500px] mx-auto">
            <div className="my-8 p-8 flex flex-col justify-center rounded-md shadow-md">
                <div className="text-[#23262F] text-[40px] font-[700] font-dmsans text-center">Thank you! 🎉</div>
                <div>
                    Great news! Your eVisa order is confirmed. We are now working on your travel documents. Stay tuned
                    for updates via hotline or email.
                    <br />
                    We will contact you soon!
                </div>
            </div>
            <div className="my-8 p-8 flex flex-col justify-center rounded-md shadow-md">
                <div className="text-[#23262F] text-[40px] font-[700] font-dmsans">Contact us</div>
                <a href={`mailto:${settingsData.siteContactEmail}`}>Email: {settingsData.siteContactEmail}</a>
                <a href={`tel:${settingsData.siteContactPhone}`}>Phone: {settingsData.siteContactPhone}</a>
            </div>
        </div>
    );
}
