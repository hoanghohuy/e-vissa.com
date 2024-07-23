import { LayoutEmail } from './_Layout';
import { siteURL, hostName } from '@/utils/constants';

export const subjectEmail_account_invitation = (email, role) => {
    return `[${hostName}] Hi ${email}, you are invited as ${role}`;
};

export const bodyEmail_account_invitation = (invitationLink, role) => {
    const body = `
        <div style="width:100%;background:#ececec;min-height:50px;">
            <div style="width:650px;margin:auto;background:#fff;font-family:Roboto,RobotoDraft,Helvetica,Arial,sans-serif;border-top:1px solid #eae5e5;">
               <div style="padding:20px;">

                    <div style="padding-bottom:10px;margin-bottom:10px;border-bottom:1px solid #ccc;color:#333;">
                        <h1>Register account for E-visa </h1>
                        <p>Please click the link below to register your account as ${role}:</p>
                        <a style="padding: 8px 20px; background-color: #3772FF; border-radius: 4px; color: #fff" href="${invitationLink}">Register now</a>
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
