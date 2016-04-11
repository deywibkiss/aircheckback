var config = require('./config'),
	express = require('express'),
	bodyParser = require('body-parser'),
	flash = require('connect-flash');

module.exports = function() {
	var app = express();

	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json());

	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	app.use(flash());

	require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/material.server.routes.js')(app);

	app.use(express.static('./public'));

	return app;
};