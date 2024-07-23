import { hostName, siteURL } from '@/utils/constants';
import { LayoutEmail } from './_Layout';
import { listCountries } from '@/dbx/e-vissa/models/data/countryData';
import { prefixOrder, settingsData } from '/settings';
import moment from 'moment';
export const subjectEmail_booking_order = (id) => {
    return `[${hostName}] MAKE PAYMENT - Booking Code: ${prefixOrder}${id}`;
};

export const bodyEmail_booking_order = (order) => {
    const {
        id,
        total_price,
        first_name,
        last_name,
        email,
        address,
        phone_number,
        nationality,
        arrival_date,
        departure_date,
        created_at,
        status,
        customer_note,
        payment_method,
        transaction,
    } = order;
    const body = `
        <div style="width:100%;background:#ececec;min-height:50px;">
            <div style="width:650px;margin:auto;background:#fff;font-family:Roboto,RobotoDraft,Helvetica,Arial,sans-serif;border-top:1px solid #eae5e5;">
               <div style="padding:20px;">

                    <div style="padding-bottom:10px;margin-bottom:10px;border-bottom:1px solid #ccc;color:#333;">
                        <h2>Online Application for E-visa </h2>
                        <div style="font-weight:800">Dear ${first_name},</div>
                        <div>We have received your request, your order code:</div>
                        <div style="color:#365486; background:#DCF2F1; padding:12px; font-size:20px; text-align:center; font-weight:800">${prefixOrder}${id}</div>
                        <h3>Your trip details:</h3>
                        <div>Date of arrival: <b>${arrival_date && moment(arrival_date).format('LL')}</b></div>
                        <div>Date of Departure: <b>${departure_date && moment(departure_date).format('LL')}</b></div>
                        <div>Price : <b>${total_price} USD</b></div>
                        <div>Payment Method : <b>${payment_method}</b></div>
                        <div>Status : <b>${status}</b></div>
                        <div>Transaction code : <b>${transaction}</b></div>
                        <h3>Your contact information:</h3>
                        <div>Full name: <b>${first_name} ${last_name}</b></div>
                        <div>Country/Region: <b>${
                            listCountries.find((item) => item.code == nationality)?.name
                        }</b></div>
                        <div>Email: <b>${email}</b></div>
                        <div>Phone number: <b>${phone_number}</b></div>
                        <div>Address: <b>${address}</b></div>
                        <div>Note: <b>${customer_note}</b></div>
                        <div><b>Details order: <a href='${siteURL}/check-order?order=${id}'>Click here to direct your order informations</a></b></div>
                        <br/>
                        <div>
                        <div>Your application has been successfully received and under processing now. Please send the required documents below via email address ${
                            settingsData.siteContactEmail
                        } or reply to this email as an attached file:</div>
                            <div>1. Passport data page: Full page including photo, personal information and ICAO lines.</div>
                            <div>2. Valid supporting document (valid visa OR valid residence permit from one of the Schengen Countries, USA, UK or Ireland).</div> 
                            <div>Tip: </div>
                            <div>* Using your smartphone to take photograph will be more convenient and faster.</div>
                            <div>* Processing time will be counted since we receive all documents and payments. </div>
                        </div>
                    </div>
                    <div style="font-size:13px;color:#ccc;">
                        <div style="margin-bottom:5px;">Website: ${siteURL}</div>
                        <div>Time create: ${created_at}</div>
                    </div>
               </div>
            </div>
        </div>
    `;

    return LayoutEmail(body);
};
