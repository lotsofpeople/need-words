var functions = require('firebase-functions');
var admin = require('firebase-admin');
var config = require('./config.json');
var emailClient = require('./emailClient');
var messageRef = functions.database.ref(config.database_ref_trigger)
admin.initializeApp(functions.config().firebase);

exports.sendEmail = functions.database.ref(config.database_ref_trigger).onWrite(event => {
    var userFormData = event.data.val();
    emailClient.sendEmail(config, userFormData.name, userFormData.email, userFormData.message);
});