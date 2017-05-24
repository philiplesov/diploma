var webSocket = require('./webSocket.js');

exports.intervalID;

exports.setTestInterval = function() {
    exports.intervalID = setInterval(function(){
        webSocket.saveLatestData(randomId());
    }, 1000);
}

exports.clearInterval = function() {
    clearInterval(exports.intervalID);
}

exports.convertToDecimal = function(nmeaFormat) {
    var posOfDot = nmeaFormat.indexOf(".");
    var degrees = parseFloat(nmeaFormat.substring(0, posOfDot-2));
    var minutes = parseFloat(nmeaFormat.substring(posOfDot-2));
    console.log('lat ',nmeaFormat, 'deg: ', degrees, 'min: ', minutes);
    return degrees + minutes/60;
}

function randomId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}