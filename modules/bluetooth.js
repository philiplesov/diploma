var app_config = require('../config.json');

exports.btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();
