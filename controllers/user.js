const User = require('./../models/User.js');
const md5 = require('md5');
const UserController = {};



/**<=============User-Register-Start=================>*/

UserController.register = function (req, res) {
    var data = req.body;
    User.create({
        name: data.name, email: data.email, phonenumber: data.phonenumber, password: data.password
        /*avatar:`https://gravatar.com/avatar/${md5(data.email)}?s=128`*/
    }, function (error, response) {
        if (error) {
            return res
                .status(500)
                .send({
                    status: false,
                    message: "Failed to create a user",
                    error: error
                })
        }
        return res.status(200).send({
            status: true,
            message: 'Congratulations! You can login now',
            data: response
        })
    })
}
/**<=============User-Register-End=================>*/

/**<=============User-Login-Start=================>*/

UserController.login = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    var emailexpression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email) {
        return res.send({ status: 401, message: 'email is required' });
    }
    if (!(emailexpression.test(email))) {
        return res.send({ status: 401, message: 'You have entered an invalid email address' });
    }

    if (!password) {
        return res.send({ status: 401, message: 'password is required' });
    }

    User.findOne({ email: email }, function (error, response) {
        if (error) {
            return res
                .send({
                    status: 500,
                    message: error,
                });
        }
        if (!response) {

            return res.send({ status: 401, message: "This email doesn't exist" });
        }
        else {

            if (password === response.password) {
                req.session.user = response;
                console.log(req.session.user);
                return res
                    .status(200)
                    .send({
                        status: 200,
                        message: 'You are logged in now',
                    });
            }
            else {
                return res
                    .send({
                        status: 401,
                        message: 'Incorrect Password, Try again',
                    });
            }
        }
    })
}
/**<=============User-Login-End=================>*/


module.exports = UserController;