var app_config = require('../config.json');
var webSocket = require('./webSocket.js');

exports.btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();

var remainder;

//Bluetooth
exports.btSerial.on('found', function(address, name) {
    console.log(address, name);
    exports.btSerial.findSerialPortChannel(address, function(channel) {
        exports.btSerial.connect(address, channel, function() {
            console.log('connected');

            exports.btSerial.on('data', function(buffer) {
            	var data = buffer.toString('utf-8');
            	console.log('data:', buffer.toString('utf-8'));
            	if (remainder) {
            		data = remainder + data;
            		remainder = '';
            	}
            	console.log('data+remainder:', data);
            	var res = data.split("$");
            	console.log('res: ', res);
            	expr = /\r?\n|\r/;
                if (res.length > 0 && !expr.test(res[res.length-1])) {
                	remainder = res.pop();
                }
                console.log('remainder: ', remainder);
                console.log('=================');
                //webSocket.saveLatestData(buffer.toString('utf-8'));
                //dbInsert = require('./database/insertData.js');
				//dbInsert.insert(buffer.toString('utf-8'));
            });
        }, function () {
            console.log('cannot connect');
        });

        // close the connection when you're ready
        exports.btSerial.close();
    }, function() {
        console.log('found nothing');
    });
});
