var database = require('../database.js');
var webSocket = require('../webSocket.js');

exports.populate = function(message) {
    var messageContents = message.split("-");

    var startDate = parseInt(messageContents[2]),
        endDate = parseInt(messageContents[3])

    var selectClause = 'SELECT * FROM diploma.`diploma-test`',
        whereClause = ' WHERE 1=1';

    if (startDate) {
        whereClause += ' and createdAt >=' + startDate;
    }
    if (endDate) {
        whereClause += ' and createdAt <= ' + endDate;
    }

    var query = selectClause + whereClause;
    console.log(query);
	database.connection.query(query, function(err, rows, fields) {
        if (err)
            console.log('Error while performing Query: ',err);

        var results = [];
        for (var i in rows) {
        	if(rows[i].createdAt) {
        		var date = new Date(parseInt(rows[i].createdAt));
        		rows[i].createdAt = date.getDate() + '-' + (parseInt(date.getMonth()) + 1) + '-'+date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
        	}
            results.push(rows[i]);
        }
        webSocket.saveLatestData(JSON.stringify(results));
    });
}

