const sendMailModel = require('../models/EmailService.js');
const sendMailController = {};

sendMailController.sendMail = function (req, res) {


    sendMailModel(req.body.from, req.body.subject, req.body.text, function (error, data) {
       if(error)
       {
        res.send(error);
       }
       else
       {
        res.render("home", {
            title: "Flash Rides - Flash speed commuting service.",
            layout: "guest.hbs"
          });
       }
        
    });
};

module.exports =sendMailController;
