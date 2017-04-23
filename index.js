init_module = require('./init.js');

var app_config = init_module.app_config;
var bluetooth = init_module.bluetooth;
var webSocket = init_module.webSocket;
var database = init_module.database;
var functions = init_module.functions;

webSocket.wss.on('connection', handleConnection);

// console.log(Date.now());
// date = new Date(Date.now());
// console.log(date.getFullYear(), date.getMonth()+1, date.getDate());

function handleConnection(client) {
    console.log("New Connection"); // you have a new client
    webSocket.connections.push(client); // add this client to the connections array

    client.on('message', function incoming(message) {
        console.log('Message received: %s', message);
        processMessageFromWebSocket(message);
    });

    client.on('close', function() { // when a client closes its connection
        console.log("connection closed"); // print it out
        var position = webSocket.connections.indexOf(client); // get the client's position in the array
        webSocket.connections.splice(position, 1); // and delete it from the array
    });
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
            functions.setTestInterval();
            return;
        case message == 'test-turn-off':
            functions.clearInterval();
            return;
        case message.indexOf('get-readings') !== -1:
            readings = require('./modules/database/populateReadings.js');
            readings.populate(message);
            return;
        default:
            console.log(message);
    }
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
                webSocket.saveLatestData(buffer.toString('utf-8'));
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