const driver = require('../models/Driver.js');
// const mongoose = require('mongoose');


const driverController = {};

driverController.getDriver = function(req,res)
{
    driver.find().exec().then(function (result) {
        console.log(result);
        res.json(result);
     
 }).catch(function (err) {
     if (err) {
         console.log(err);
         res.json(err);
     }
 });
}

module.exports = driverController;
