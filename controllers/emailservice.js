const sendMailModel = require('../models/EmailService.js');
const sendMailController = {};

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

module.exports = sendMailController;
