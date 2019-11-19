const sendMailModel = require('../models/EmailService.js');
const sendMailController = {};


// contact us email service

sendMailController.contactUs = function (req, res) {

    sendMailModel.sendMail(req.body.from, req.body.subject, req.body.text, function (error, data) {
        if (error) {

            res.json({ message: "Error" });
        }
        else {
            res.json({ message: "Success" });
        }

    });
};


// subscribe email service
sendMailController.subscribeEmail = function (req, res) {

    sendMailModel.subscribe(req.body.email, function (error, data) {
        if (error) {

            res.json({ message: "Error" });
        }
        else {
            res.json({ message: "Success" });
        }

    });
};


module.exports = sendMailController;
