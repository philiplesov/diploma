init_module = require('./init.js');

var app_config = init_module.app_config;
var bluetooth = init_module.bluetooth;
var webSocket = init_module.webSocket;
var database = init_module.database;

var connections = new Array;          // list of connections to the server

var intervalID;

webSocket.wss.on('connection', handleConnection);
 
function handleConnection(client) {
    console.log("New Connection"); // you have a new client
    connections.push(client); // add this client to the connections array

    client.on('message', function incoming(message) {
        console.log('Message received: %s', message);
        processMessageFromWebSocket(message);
    });

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

function processMessageFromWebSocket(message) {
    if(!message) {
        return;
    }

    switch(true) {
        case message == 'turn-on':
            bluetooth.btSerial.inquire();
            return;
        case message == 'turn-off':
            bluetooth.btSerial.close();
            return;
        case message == 'test-turn-on':
            setTestInterval();
            return;
        case message == 'test-turn-off':
            stopTestInterval();
            return;
        case message.indexOf('get-readings') !== -1:
            populateReadings(message);
            return;
        default:
            console.log(message);
    }
}

function randomId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

//Send data periodically to client
function setTestInterval() {
    intervalID = setInterval(function(){
        saveLatestData(randomId());
    }, 1000);
}

// Stop sending test data to client
function stopTestInterval() {
    clearInterval(intervalID);
}

function populateReadings(message) {
    database.connection.query("SELECT * FROM diploma.`diploma-test`;", function(err, rows, fields) {
        if (err)
            console.log('Error while performing Query: ',err);

        var results = [];
        for (var i in rows) {
            results.push(rows[i]);
        }
        saveLatestData(JSON.stringify(results));
    });
}

//Bluetooth
bluetooth.btSerial.on('found', function(address, name) {
    console.log(address, name);
    bluetooth.btSerial.findSerialPortChannel(address, function(channel) {
        bluetooth.btSerial.connect(address, channel, function() {
            console.log('connected');
            var buffer = Buffer.alloc(10);
            bluetooth.btSerial.on('data', function(buffer) {
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
        bluetooth.btSerial.close();
    }, function() {
        console.log('found nothing');
    });
});

// btSerial.inquire();