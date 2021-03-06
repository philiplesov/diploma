var webSocket = require('../webSocket.js');
var allocateReadingsTypes = require('./allocateReadingsTypes.js');

// Set remained which connects splitted(by the bluetooth 'data' method) information from the gps 
var remainder = '';

exports.convertBtData = function(buffer) {
    var data = buffer.toString('utf-8');

    if (remainder) {
        data = remainder + data;
        remainder = '';
    }

    var res = data.split("$");
    expr = /\r?\n|\r/;

    if (res.length > 0 && !expr.test(res[res.length-1])) {
        remainder = res.pop();
    }

    for (gpsDataType in res) {
        if(!res[gpsDataType]) {
            continue;
        }

        webSocket.saveLatestData(res[gpsDataType]);
        allocateReadingsTypes.allocate(res[gpsDataType]);
    }
}