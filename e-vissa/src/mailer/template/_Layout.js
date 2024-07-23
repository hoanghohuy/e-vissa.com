import { settingsData } from '/settings';

export const LayoutEmail = (content) => {
    return `
    <div style="width:100%;background:#ececec; font-family:Roboto,RobotoDraft,Helvetica,Arial,sans-serif;">
        <div style="width:650px; margin: 0 auto; padding-top: 50px; ">
            <div style="display: flex;gap: 8px;justify-content: center; align-items: center; background:#fff; padding: 16px; border-radius: 8px 8px 0 0;">
                <img width="150" src="${process.env.NEXT_PUBLIC_SITE_URL}/logo.png"
                    style="display: inherit; margin-right: 8px;">
                    <div style="font-size: 30px; font-weight: 700; color:#333"></div>
            </div>
        </div>
    </div>
    ${content}
    <div style="width:100%;background:#ececec;padding-bottom:30px;font-family:Roboto,RobotoDraft,Helvetica,Arial,sans-serif">
        <div style="width:650px;background:#ffffff;min-height:120px;margin:0px auto;border-radius:5px">
            <div style="padding:0px 20px;">
                <div style="font-size:16px;font-weight:bold;color:#191919">
                    Do you need help ?
                </div>
            </div>
            <div style="padding:0px 20px">
                <table style="width:100%">
                    <tbody>
                        <tr>
                            <td style="padding:10px 0px;font-size:14px;font-weight:500">
                                <a style="color:#bb2129;text-decoration:none;display: flex;align-items: center;" href="https://www.e-vissa.com/faqs" target="_blank">
                                    Help Center
                                </a>
                            </td>
                            <td style="text-align:center;padding:10px 0px;color:#8f8f8f;font-weight:500">
                                <a style="color:#bb2129;text-decoration:none;display: flex;align-items: center;" href="mailto:${
                                    settingsData.siteContactEmail
                                }" target="_blank">
                                    ${settingsData.siteContactEmail}
                                </a>
                            </td>
                            <td style="text-align:right;padding:10px 0px;font-size:14px;font-weight:500">
                                <a style="color:#bb2129;text-decoration:none;display: flex;align-items: center;"
                                href="tel:${settingsData.siteContactPhone.replace(/\s/g, '')}" target="_blank">
                                    ${settingsData.siteContactPhone}
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    `;
};
