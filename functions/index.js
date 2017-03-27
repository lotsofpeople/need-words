var functions = require('firebase-functions');
var admin = require('firebase-admin');
var nodemailer = require('nodemailer');
var config = require('./config.json');
var messageRef = functions.database.ref(config.database_ref_trigger)

admin.initializeApp(functions.config().firebase);

exports.sendEmail = functions.database.ref(config.database_ref_trigger).onWrite(event => {

    const userFormData = event.data.val();
    const transport = nodemailer.createTransport(config.email_transport);
    var styledMessage = userFormData.message.replace("/\n/g", " \n ");

    const mailOptions = {
        from: config.email_from,
        to: config.email_to,
        subject: config.email_subject,
        html: config.email_message_intro +
        `${userFormData.name} (${userFormData.email}) <br><br>
        ${styledMessage}` +
        config.email_message_signature
    };
    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        // console.log(`Message sent: ${info.response}`);
    });
    
});