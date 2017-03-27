var functions = require('firebase-functions');
var admin = require('firebase-admin');
var nodemailer = require('nodemailer');
var config = require('./config.json');
var messageRef = functions.database.ref('/messages/{pushId}')

admin.initializeApp(functions.config().firebase);

exports.sendEmail = functions.database.ref('/messages/{pushId}').onWrite(event => {

    const original = event.data.val();

    const transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: config.email,
            pass: config.password,
        },
    });

    var styledMessage = original.message.replace("/\n/g", " \n ")

    const mailOptions = {
        from: 'Your lovely need-words bot',
        to: 'samprinssen@gmail.com',
        subject: 'Nieuw bericht op need-words',
        html: `Hallo Marieke, <br>
        er heeft iemand contact met je opgenomen op need-words.nl: <br>
        ${original.name} (${original.email}) <br><br>

        ${styledMessage} <br><br>

        Ok doei! <br>
        De bot`
    };
    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        // console.log(`Message sent: ${info.response}`);
    });
    
});