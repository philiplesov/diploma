var app_config = require('../config.json');
var webSocket = require('./webSocket.js');
var bluetoothReadings = require('./bluetoothReadings/convertReadings.js');

exports.btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();

//Bluetooth
exports.btSerial.on('found', function(address, name) {
    console.log(address, name);
    exports.btSerial.findSerialPortChannel(address, function(channel) {
        exports.btSerial.connect(address, channel, function() {
            console.log('connected');
            exports.btSerial.on('data', convertBtData);
        }, function () {
            console.log('cannot connect');
        });

        // close the connection when ready
        exports.btSerial.close();
    }, function() {
        console.log('found nothing');
    });
});

exports.btSerial.on('closed', function(address, name) {
    console.log('Bluetooth connection closed');
});

exports.btSerial.on('failure', function(err) {
    console.log(err);
});

var convertBtData = function(buffer) {
    bluetoothReadings.convertBtData(buffer);
}