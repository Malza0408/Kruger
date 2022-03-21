import nodemailer from 'nodemailer';
import 'dotenv/config';

const adminEmail = process.env.ADMIN_EMAIL;
const accessKey = process.env.ACCESS_KEY;

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: adminEmail,
        pass: accessKey
    }
});

let sendMail = (to, subject, text) => {
    return new Promise((resolve, reject) => {
        const message = {
            from: adminEmail,
            to,
            subject,
            text
        };

        transport.sendMail(message, (err, info) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(info);
        });
    });
};

export { sendMail };
