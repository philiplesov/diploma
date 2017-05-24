var dbInsert = require('../database/insertData.js');
var functions = require('../functions.js');

exports.allocate = function(gpsReading) {
	var gpsReadingContents = gpsReading.split(',');

	switch(gpsReadingContents[0]) {
		case 'GPGGA':
			prepareDataGPGGA(gpsReadingContents);
			dbInsert.insertGPGGA(gpsReadingContents);
			break;
		case 'GPGSA':
			dbInsert.insertGPGSA(gpsReadingContents);
			break;
		case 'GPRMC':
			dbInsert.insertGPRMC(gpsReadingContents);
			break;
	}
}

function prepareDataGPGGA(gpsReadingContents) {
    if(gpsReadingContents[2]) {
        gpsReadingContents[2] = functions.convertToDecimal(gpsReadingContents[2]);
    }
    if(gpsReadingContents[4]) {
        gpsReadingContents[4] = functions.convertToDecimal(gpsReadingContents[4]);
    }
}