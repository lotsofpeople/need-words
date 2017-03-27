var nodemailer = require('nodemailer');

function sendEmail(config, userName, userEmail, userMessage) {
    var emailConfig = _getEmailConfig(config, userName, userEmail, userMessage);
    var transport = nodemailer.createTransport(config.email_transport);
    transport.sendMail(emailConfig, (error, info) => {
        if (error) return console.error(error);
        console.info(`Message sent: ${info.response}`);
    });
}

function _getEmailConfig(config, userName, userEmail, userMessage) {
    var styledMessage = userMessage.replace(/\n/g, "<br>");
    return {
        from: config.email_from,
        to: config.email_to,
        subject: config.email_subject,
        html: `${config.email_message_intro} <br><br>

        name: ${userName} <br>
        email: (${userEmail}) <br>
        <br>
        --------------------------- <br>
        <br>
        ${styledMessage} <br>
        <br>
        --------------------------- <br>
        <br>
        ${config.email_message_signature} <br>
        `
    }
}

exports.sendEmail = sendEmail;