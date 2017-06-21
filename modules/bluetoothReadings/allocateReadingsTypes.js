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
			prepareDataGPRMC(gpsReadingContents);
			dbInsert.insertGPRMC(gpsReadingContents);
			break;
	}
}

function prepareDataGPGGA(gpsReadingContents) {
    if (gpsReadingContents[2]) {
        gpsReadingContents[2] = functions.convertToDecimal(gpsReadingContents[2]);
        if (gpsReadingContents[3] == 'S') {
        	gpsReadingContents[2] = -Math.abs(gpsReadingContents[2]);
        }
    }
    if (gpsReadingContents[4]) {
        gpsReadingContents[4] = functions.convertToDecimal(gpsReadingContents[4]);
        if (gpsReadingContents[5] == 'W') {
        	gpsReadingContents[4] = -Math.abs(gpsReadingContents[4]);
        }
    }
}

function prepareDataGPRMC(gpsReadingContents) {
	if (gpsReadingContents[3]) {
        gpsReadingContents[3] = functions.convertToDecimal(gpsReadingContents[3]);
        if(gpsReadingContents[4] == 'S') {
        	gpsReadingContents[3] = -Math.abs(gpsReadingContents[3]);
        }
    }
    if (gpsReadingContents[5]) {
        gpsReadingContents[5] = functions.convertToDecimal(gpsReadingContents[5]);
        if (gpsReadingContents[6] == 'W') {
        	gpsReadingContents[5] = -Math.abs(gpsReadingContents[5]);
        }
    }
    gpsReadingContents[7] ? gpsReadingContents[7] = parseFloat(gpsReadingContents[7])*1.852 : gpsReadingContents[7] = 0;
}