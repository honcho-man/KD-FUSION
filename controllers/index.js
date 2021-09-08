const transporter = require('./mailer')
const db = require('../config/config').get(process.env.NODE_ENV);
const fs = require('fs')
const handlebars = require('handlebars')

module.exports = {
    onGetHome: async (req, res) => {
        res.render('index');
    },
    onContact: async (req, res) => {
        fs.readFile('./utils/new-contact.html', { encoding: 'utf-8' }, function (err, html) {
            if (err) {
                console.log(err)
            } else {
                var template = handlebars.compile(html);
                var messages = {
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    subject: req.body.subject,
                    message: req.body.message
                };
                
                var userMsgs = template(messages);
                var userDatatoOwner = {
                    from: db.SMTP_USER,
                    to: 'mike2kennyomg@gmail.com,oladipupo.oed@gmail.com',
                    subject: 'New Contact',
                    html: userMsgs
                }
                //console.log(userDatatoOwner)
            }
            transporter.sendMail(userDatatoOwner, function (err, info) {
                if (err) {
                    console.log(err);
                    res.status(500).send('An error occured, please try again later'); // <----- HERE
                } else {
                    //console.log("Successfully sent email back to help center.");
                    res.status(200).send('<span>Message sent! We will reach out to you in a jiffy</span><i class="fa fa-smile pl-2"></i>'); // <------------- HERE
                }
            })
        })
    }
}