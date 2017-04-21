var app_config = require('../config.json');

var WebSocketServer = require('ws');

var SERVER_PORT = 8081;   // port number for the webSocket server

exports.wss = new WebSocketServer.Server({
    perMessageDeflate: false,
    port: SERVER_PORT
});