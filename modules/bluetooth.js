var app_config = require('../config.json');
var webSocket = require('./webSocket.js');

exports.btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();

//Bluetooth
exports.btSerial.on('found', function(address, name) {
    console.log(address, name);
    exports.btSerial.findSerialPortChannel(address, function(channel) {
        exports.btSerial.connect(address, channel, function() {
            console.log('connected');
            var buffer = Buffer.alloc(10);
            exports.btSerial.on('data', function(buffer) {
                console.log(buffer.toString('utf-8'));
                console.log('=================');
                webSocket.saveLatestData(buffer.toString('utf-8'));
                dbInsert = require('./modules/database/insertData.js');
				dbInsert.insert(buffer.toString('utf-8'));
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
