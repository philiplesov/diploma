var app_config = require('../config.json');

var mysql      = require('mysql');

exports.connection = mysql.createConnection({
	host     : app_config.db.host,
	user     : app_config.db.user,
	password : app_config.db.password,
	database : app_config.db.database
});

exports.connection.connect();