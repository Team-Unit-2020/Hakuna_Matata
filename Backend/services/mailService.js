var nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_SERVICE_SEND_MAIL,
        pass: process.env.EMAIL_SERVICE_APP_PASSWORD
    }
});

module.exports.sendEmail = async (email, subject, body) => new Promise((resolve, reject) => {
    var mailOptions = {
        from: process.env.EMAIL_SERVICE_SEND_MAIL,
        to: email,
        subject: subject,
        text: body
    };

    try {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                reject(false);
            } else {
                resolve(true)
            }
        });
    } catch (e) {
        console.log(e.message);
        reject(false);
    }
})