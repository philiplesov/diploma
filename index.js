var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'diploma'
});

connection.connect();

var btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();
var WebSocketServer = require('ws');

var SERVER_PORT = 8081;               // port number for the webSocket server
var wss = new WebSocketServer.Server({
    perMessageDeflate: false,
    port: SERVER_PORT
}); // the webSocket server

var connections = new Array;          // list of connections to the server

wss.on('connection', handleConnection);
 
function handleConnection(client) {
    console.log("New Connection"); // you have a new client
    connections.push(client); // add this client to the connections array

    client.on('close', function() { // when a client closes its connection
        console.log("connection closed"); // print it out
        var position = connections.indexOf(client); // get the client's position in the array
        connections.splice(position, 1); // and delete it from the array
    });
}

// This function broadcasts messages to all webSocket clients
function broadcast(data) {
    for (myConnection in connections) {   // iterate over the array of connections
        connections[myConnection].send(data); // send the data to each connection
    }
}

function saveLatestData(data) {
    // if there are webSocket connections, send the serial data
    // to all of them:
    if (connections.length > 0) {
        broadcast(data);
    }
}

//Bluetooth
btSerial.on('found', function(address, name) {
    console.log(address, name);
    btSerial.findSerialPortChannel(address, function(channel) {
        btSerial.connect(address, channel, function() {
            console.log('connected');
            var buffer = Buffer.alloc(10);
            btSerial.on('data', function(buffer) {
                console.log(buffer.toString('utf-8'));
                console.log('=================');
                saveLatestData(buffer.toString('utf-8'));
                // connection.query("INSERT INTO `diploma-test` (`gps-data`) values ('" + buffer.toString('utf-8') + "')", function(err, rows, fields) {
                //     if (err)
                //         console.log('Error while performing Query: ',err);
                // });
            });
        }, function () {
            console.log('cannot connect');
        });

        // close the connection when you're ready
        btSerial.close();
    }, function() {
        console.log('found nothing');
    });
});

btSerial.inquire();