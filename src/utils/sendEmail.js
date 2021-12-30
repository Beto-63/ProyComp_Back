const nodemailer = require("nodemailer");

const { RECOVERY_EMAIL } = require('../config/configuration');

const sendRecoveryEmail = async (email, subject, content) => {
    try {
        const transporter = nodemailer.createTransport({
            host: RECOVERY_EMAIL.host,
            service: RECOVERY_EMAIL.service,
            port: RECOVERY_EMAIL.port,
            secure: true,
            auth: {
                user: RECOVERY_EMAIL.user,
                pass: RECOVERY_EMAIL.pass,
            },
        });

        await transporter.sendMail({
            from: RECOVERY_EMAIL.user,
            to: email,
            cc: RECOVERY_EMAIL.user, // Con copia al administrador
            subject: subject,
            html: content,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = { 
    sendRecoveryEmail,
    //
};