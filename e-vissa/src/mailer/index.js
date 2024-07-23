const nodemailer = require('nodemailer');

export const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.USER_MAILER,
        pass: process.env.PASSWORD_MAILER,
    },
});

export const sendEmail = async (to, subject, html, cc = [], bcc = ['congthuong147@gmail.com']) => {
    try {
        await transporter.sendMail({
            from: process.env.NEXT_PUBLIC_SITE_NAME,
            to: Array.isArray(to) ? to.join(', ') : to,
            cc: Array.isArray(cc) ? cc.join(', ') : cc,
            bcc: Array.isArray(bcc) ? bcc.join(', ') : bcc,
            subject,
            html,
        });
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
