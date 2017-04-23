// Get App Config
exports.app_config = require('./config.json');

// Set database
exports.database = require('./modules/database.js');

// Set bluetooth module
exports.bluetooth = require('./modules/bluetooth.js');

// Set webSocket module
exports.webSocket = require('./modules/webSocket.js');

// Set functions module
exports.functions = require('./modules/functions.js');