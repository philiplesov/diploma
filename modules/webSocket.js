var app_config = require('../config.json');

var WebSocketServer = require('ws');

var SERVER_PORT = 8081;   // port number for the webSocket server

exports.wss = new WebSocketServer.Server({
    perMessageDeflate: false,
    port: SERVER_PORT
});

exports.connections = new Array;          // list of connections to the server

// This function broadcasts messages to all webSocket clients
exports.broadcast = function(data) {
    for (myConnection in exports.connections) {   // iterate over the array of connections
        exports.connections[myConnection].send(data); // send the data to each connection
    }
}

exports.saveLatestData = function(data) {
    // if there are webSocket connections, send the serial data
    // to all of them:
    if (exports.connections.length > 0) {
        exports.broadcast(data);
    }
}