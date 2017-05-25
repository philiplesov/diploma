var database = require('../database.js');
var webSocket = require('../webSocket.js');

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

        webSocket.saveLatestData(JSON.stringify({'type': dbTable, 'data': rows}));
    });
}

