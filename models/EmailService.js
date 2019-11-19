const nodemailer = require('nodemailer');
const sendEmail = {};

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "flashride24x7@gmail.com",
        pass: "Flash@123"
    }
});

sendEmail.sendMail = function (from, subject, text, cb) {
    
    var mailOptions = {
        from: "flashride24x7@gmail.com",
        to: "flashride24x7@gmail.com",
        subject: " Contact Query " + from + " : " + subject,
        html: '<h3>Name : ' + subject + '</h3><p><b>Email:</b> ' + from + '</p><p><b>Message:</b> ' + text + '</P>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            cb(error, null)
        } else {
            cb(null, info);
        }
    });
}

module.exports = sendEmail;