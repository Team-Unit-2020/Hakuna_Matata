const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { User, ConfimUser } = require('../models/model');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const { sendEmail } = require('../services/mailService');
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post('/new', async (req, res) => {

    var hashedPassword = await getHashedPassowrd(req.body.password);
    User.findOne({ email: req.body.email }, (exception, userObject) => {
        if (exception) console.log(exception)

        if (!userObject) {
            var id = uuidv4();

            const user = new User({
                id: id,
                name: req.body.name,
                email: req.body.email,
                nic: req.body.nic,
                phone: req.body.phone,
                address: req.body.address,
                password: hashedPassword,
                dob: req.body.dob,
                active: false,
                usertype: req.body.userType
            })

            user.save((err) => {
                if (err) res.json({ status: 503, message: "User not Added!" });
                var confirmCode = uuidv4();
                var confirmation = new ConfimUser({
                    id: confirmCode,
                    accountId: id,
                    expiresAt: moment().add(1, 'days').format("YYYY-MM-DDTHH:mm:ss").toString()
                })

                confirmation.save((error) => {
                    if (error) res.json({ status: 503, message: "Something went wrong!" });

                    var message = `Hi ${req.body.name},  Congratulations, You have successfull registered to the application! Please click below link to confirm your account. http://localhost:3000/#/confirm/${confirmCode}`
                    sendEmail(req.body.email, "Confirm Your registration", message).then(status => {
                        if (!status) res.json({ status: 503, message: "Something went wrong!" });

                        res.json({ status: 200, message: `You have successfully registered! We have sent a confirmation email to ${req.body.email}. Please confirm your email` });
                    });
                })
            })
        }
        else {
            res.json({ status: 503, message: "User Already registered, Try login instead!" });
        }
    })

})

router.get('/activate/:confirmationId', async (req, res) => {
    var confirmationId = req.params.confirmationId;
    ConfimUser.findOne({ id: confirmationId }, (err, object) => {
        if (err) res.json({ status: 503, message: "This URL is invalid" });
        if (object) {
            var currentTime = moment();
            var expiresTime = moment(object.expiresAt);
            if (moment.duration(expiresTime.diff(currentTime)).as('milliseconds') > 0) {
                User.updateOne({ id: object.accountId, active: false }, { active: true }, (error, writeOpResult) => {
                    if (error) res.json({ status: 503, message: "No user found incorporating this activation" });
                    ConfimUser.deleteOne({ id: confirmationId }, (ex) => {
                        if (ex) res.json({ status: 503, message: "Operation cannot be completed" });

                        res.json({ status: 200, message: "Account Activated Successfully, Please continue to Login!" });
                    })
                })
            } else {
                res.json({ status: 503, message: "This link is expired!" });
            }
        }
        else res.json({ status: 503, message: "Operation cannot be completed" });

    })
})

router.post('/reset', async (req, res) => {
    var email = req.body.email;

    User.findOne({ email: email }, (err, user) => {
        if (err) res.json({ status: 503, message: "Operation Unsuccessful" });

        if (user) {
            var confirmCode = uuidv4();
            var confirmation = new ConfimUser({
                id: confirmCode,
                accountId: user.id,
                expiresAt: moment().add(1, 'days').format("YYYY-MM-DDTHH:mm:ss").toString()
            });

            confirmation.save((error) => {
                if (error) res.json({ status: 503, message: "Operation Unsuccessful" });

                var message = `Hi ${user.name},  
                We recieved your Password Reset Request. So click this link to confirm your identity. http://localhost:3000/#/reset/${confirmCode}, If it is not you never mind this email. We don't allow anyone to access your account.`;

                sendEmail(email, "Reset Your Password!", message).then(status => {
                    if (!status) res.json({ status: 503, message: "Something went wrong!" });

                    res.json({ status: 200, message: `Your Password Reset Link is sent to ${email}.` });
                });

            })

        } else {
            res.json({ status: 503, message: "This email doesn't have associated account." });
        }
    })
})

router.get("/reset/validate/:code", async (req, res) => {
    var code = req.params.code;

    ConfimUser.findOne({ id: code }, (err, response) => {
        if (err) res.json({ status: 503, message: "Operation Unsuccessful." });

        if (response) {
            var currentTime = moment();
            var expiresTime = moment(response.expiresAt);
            if (moment.duration(expiresTime.diff(currentTime)).as('milliseconds') > 0) {
                res.json({ status: 200, message: "This Password Reset Link is Valid." });
            } else {
                res.json({ status: 503, message: "This Password Reset link is Expired." });
            }

        } else {
            res.json({ status: 503, message: "This Password Reset link is invalid." });
        }
    })
})

router.post("/reset/password", async (req, res) => {
    var code = req.body.code;
    var newPassword = req.body.newPassword;

    var hashedPassword = await getHashedPassowrd(newPassword);

    ConfimUser.findOne({ id: code }, (err, response) => {
        if (err) res.json({ status: 503, message: "Operation Unsuccessful." });

        if (response) {
            var currentTime = moment();
            var expiresTime = moment(response.expiresAt);
            if (moment.duration(expiresTime.diff(currentTime)).as('milliseconds') > 0) {

                User.updateOne({ id: response.accountId }, { password: hashedPassword }, (exception, result) => {
                    if (exception) res.json({ status: 503, message: "Operation Unsuccessful." });

                    ConfimUser.deleteOne({ id: code }, (ex) => {
                        User.findOne({ id: response.accountId }, (exp, user) => {
                            var message = `Hi ${user.name}, Your Password Reset Successfully`;
                            sendEmail(user.email, "Password Rest Successfully!", message).then(status => {
                                res.json({ status: 200, message: "Password Reset Successful." });
                            });
                        })
                    })
                })
            } else {
                res.json({ status: 503, message: "This Password Reset link is Expired." });
            }

        } else {
            res.json({ status: 503, message: "This Password Reset link is invalid." });
        }
    })
})

router.post("/login", async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || !user) {
                return res.json({ status: 503, message: "Username and Password combination is incorrect!" });
            }
            if (!user.active)
            return res.json({ status: 404, message: "User have deactivated his account" });
            
            req.logIn(user, { session: false }, async (error) => {
                const body = { id: user.id, email: user.email, name: user.name }
                const token = jwt.sign({ user: body }, process.env.AUTH_SECRET);
                const authenticatedUser = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    nic: user.nic,
                    phone: user.phone,
                    address: user.address,
                    dob: user.dob,
                    active: user.active,
                    userType: user.usertype
                };

                return res.json({ status: 200, message: "User Successfully Authenticated", access_token: token, user: authenticatedUser });
            })
        } catch (error) {
            return res.json({ status: 503, message: "An Error Occured" });
        }
    })(req, res, next);
})

const getHashedPassowrd = (password) => new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) reject(err);
        resolve(hash);
    });
})



module.exports = router;