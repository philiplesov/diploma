var database = require('../database.js');
var webSocket = require('../webSocket.js');

exports.populate = function(message) {
	database.connection.query("SELECT * FROM diploma.`diploma-test`;", function(err, rows, fields) {
        if (err)
            console.log('Error while performing Query: ',err);

        var results = [];
        for (var i in rows) {
        	if(rows[i].createdAt) {
        		var date = new Date(parseInt(rows[i].createdAt));
        		rows[i].createdAt = date.getDate() + '-' + (parseInt(date.getMonth()) + 1) + '-'+date.getFullYear();
        	}
            results.push(rows[i]);
        }
        webSocket.saveLatestData(JSON.stringify(results));
    });
}

