import { LayoutEmail } from './_Layout';
import { siteURL, hostName } from '@/utils/constants';

export const subjectEmail_account_reset_pass = (customerName) => {
    return `[${hostName}] Hi ${customerName}, reset password now!`;
};

export const bodyEmail_account_reset_pass = (resetPassLink, code) => {
    const body = `
        <div style="width:100%;background:#ececec;min-height:50px;">
            <div style="width:650px;margin:auto;background:#fff;font-family:Roboto,RobotoDraft,Helvetica,Arial,sans-serif;border-top:1px solid #eae5e5;">
               <div style="padding:20px;">

                    <div style="padding-bottom:10px;margin-bottom:10px;border-bottom:1px solid #ccc;color:#333;">
                        <h1>Reset account password</h1>
                        <p>Please click the button below to reset your account password:</p>
                        <a style="padding: 8px 20px; background-color: #3772FF; border-radius: 4px; color: #fff" href="${resetPassLink}">Click Here</a>
                        <p>Your code: ${code}</p>
                    </div>
                    <div style="font-size:13px;color:#ccc;">
                        <div style="margin-bottom:5px;">Website: ${siteURL}</div>
                    </div>
               </div>
            </div>
        </div>
    `;
    return LayoutEmail(body);
};
