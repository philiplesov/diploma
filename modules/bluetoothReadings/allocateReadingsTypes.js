var dbInsert = require('../database/insertData.js');

exports.allocate = function(gpsReading) {
	var gpsReadingContents = gpsReading.split(',');

	switch(gpsReadingContents[0]) {
		case 'GPGGA':
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