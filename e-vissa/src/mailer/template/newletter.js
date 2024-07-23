import { siteURL } from '@/utils/constants';
import { LayoutEmail } from './_Layout';

export const SubjectNewletter = (email) => {
    return `Thank you for registration, more information about E-visa - ${email}`;
};

export const Template_Newletter = (email, randomCode) => {
    const body = `
        <div style="width:100%;background:#ececec;min-height:50px;">
            <div style="width:650px;margin:auto;background:#fff;font-family:Roboto,RobotoDraft,Helvetica,Arial,sans-serif;border-top:1px solid #eae5e5;">
               <div style="padding:20px;">

                    <div style="padding-bottom:10px;margin-bottom:10px;border-bottom:1px solid #ccc;color:#333;">
                    Thank you for registration.<br/>
                    <a href='${siteURL}/api/newsletters?email=${email}&unsub=${randomCode}'>Unsubcribe</a>
                    </div>
               </div>
            </div>
        </div>
    `;

    return LayoutEmail(body);
};
