const db = require('../config/config').get(process.env.NODE_ENV);
//nodemailer
var nodemailer = require('nodemailer');
//console.log(db.SMTP_PASS)
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: db.SMTP_USER,
        pass: db.SMTP_PASS
    },
    secure: true,
    tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        },
});
module.exports = transporter;