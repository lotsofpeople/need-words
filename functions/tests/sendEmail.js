var config = require('../config.json');
var emailClient = require('../emailClient');

emailClient.sendEmail(
	config,
	'John Doe',
	'john@johndoe.com',
	`Hey there,
	I would really like to work with you.
	Please email me back!
	<br>
	Best, John
	`
);