var database = require('../database.js');

exports.insert = function(data) {
    database.connection.query("INSERT INTO `diploma-test` (`data`, `createdAt`) values ('" + data + "', '" + Date.now() + "')", function(err, rows, fields) {
        if (err)
            console.log('Error while performing Query: ',err);
    });
}

exports.insertGPGGA = function(gpsReadingContents) {
	console.log(gpsReadingContents);
    database.connection.query("INSERT INTO `GPGGA` (`universal_time`, `latitude`, `longitude`, `fixed_pos_indicator`, `satellite_used`, `HDOP`, `altitude`, `altitude_measurement_units`, `eccentricity`, `eccentricity_measurement_units`, `correction_limitation`, `correction_id_control_amount`, `created_at`) VALUES ('" + gpsReadingContents[1] + "', " + parseFloat(gpsReadingContents[2]) + ", " + parseFloat(gpsReadingContents[4]) + ", '" + gpsReadingContents[6] + "', " + gpsReadingContents[7] + ", '" + gpsReadingContents[8] + "', " + parseFloat(gpsReadingContents[9]) + ", '" + gpsReadingContents[10] + "', '" + gpsReadingContents[11] + "', '" + gpsReadingContents[12] + "', '" + gpsReadingContents[13] + "', '" + gpsReadingContents[14] + "', '" + Date.now() + "')", function(err, rows, fields) {
        if (err)
            console.log('Error while performing Query: ',err);
    });
}

exports.insertGPGSA = function(gpsReadingContents) {
    database.connection.query("INSERT INTO `GPGSA` (`mode_1`, `mode_2`, `sat_used_1`, `sat_used_2`, `sat_used_3`, `sat_used_4`, `sat_used_5`, `sat_used_6`, `sat_used_7`, `sat_used_8`, `sat_used_9`, `sat_used_10`, `sat_used_11`, `PDOP`, `HDOP`, `VDOP`, `control_amount`, `created_at`) VALUES ('" + gpsReadingContents[1] + "', '" + gpsReadingContents[2] + "', '" + gpsReadingContents[3] + "', '" + gpsReadingContents[4] + "', '" + gpsReadingContents[5] + "', '" + gpsReadingContents[6] + "', '" + gpsReadingContents[7] + "', '" + gpsReadingContents[8] + "', '" + gpsReadingContents[9] + "', '" + gpsReadingContents[10] + "', '" + gpsReadingContents[11] + "', '" + gpsReadingContents[12] + "', '" + gpsReadingContents[13] + "', '" + gpsReadingContents[14] + "', '" + gpsReadingContents[15] + "', '" + gpsReadingContents[16] + "', '" + gpsReadingContents[17] + "', '" + Date.now() + "')", function(err, rows, fields) {
        if (err)
            console.log('Error while performing Query: ',err);
    });
}

exports.insertGPRMC = function(gpsReadingContents) {
	console.log(gpsReadingContents);
    database.connection.query("INSERT INTO `GPRMC` (`universal_time`, `status`, `latitude`, `longitude`, `ground_speed`, `movement_direction`, `date`, `magnetic_variation`, `control_amount`, `created_at`) VALUES ('" + gpsReadingContents[1] + "', '" + gpsReadingContents[2] + "', " + parseFloat(gpsReadingContents[3]) + ", '" + parseFloat(gpsReadingContents[5]) + "', '" + gpsReadingContents[7] + "', '" + gpsReadingContents[8] + "', '" + gpsReadingContents[9] + "', '" + gpsReadingContents[10] + "', '" + gpsReadingContents[11] + "', '" + Date.now() + "')", function(err, rows, fields) {
        if (err)
            console.log('Error while performing Query: ',err);
    });
}