var database = require('../database.js');
var webSocket = require('../webSocket.js');
var functions = require('../functions.js');

exports.populate = function(message) {
    var messageContents = message.split("-");

    var dbTable = messageContents[2],
        startDate = parseInt(messageContents[3]),
        endDate = parseInt(messageContents[4])

    var selectClause = 'SELECT * FROM diploma.`' + dbTable + '`',
        whereClause = ' WHERE 1=1';

    if (startDate) {
        whereClause += ' and created_at >=' + startDate;
    }
    if (endDate) {
        whereClause += ' and created_at <= ' + endDate;
    }

    var query = selectClause + whereClause;

	database.connection.query(query, function(err, rows, fields) {
        if (err)
            console.log('Error while performing Query: ',err);

        var results = [];
        for (var i in rows) {
        	if(rows[i].created_at) {
        		var date = new Date(parseInt(rows[i].created_at));
        		rows[i].created_at = date.getDate() + '-' + (parseInt(date.getMonth()) + 1) + '-'+date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
        	}
            if(rows[i].latitude) {
                rows[i].latitude = functions.convertToDecimal(rows[i].latitude);
            }
            if(rows[i].longitude) {
                rows[i].longitude = functions.convertToDecimal(rows[i].longitude);
            }
            results.push(rows[i]);
        }

        webSocket.saveLatestData(JSON.stringify({'type': dbTable, 'data':results}));
    });
}

