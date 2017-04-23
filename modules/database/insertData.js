var database = require('../database.js');

exports.insert = function(data) {
	database.connection.query("INSERT INTO `diploma-test` (`data`, `createdAt`) values ('" + data + "', '" + Date.now() + "')", function(err, rows, fields) {
	    if (err)
	        console.log('Error while performing Query: ',err);
	});
}