var readings = $('#readings');
var socket = new WebSocket("ws://localhost:8081");

socket.onopen = openSocket;
socket.onmessage = showData;

function openSocket() {
	//socket.send('get-readings-0-20');
}

function showData(result) {
	// when the server returns, show the result in table
	var dynatable = $('#readingsTable').dynatable({ 
    	dataset: { records: JSON.parse(result.data) } }, 
    	{ features: { pushState: false }}).data("dynatable");
    dynatable.settings.dataset.originalRecords =  JSON.parse(result.data);
    dynatable.process(); 
}

function toTimestamp(datetime) {
	// Date d-m-Y H:i to timestamp
	var dateString = datetime,
    dateTimeParts = dateString.split(' '),
    timeParts = dateTimeParts[1].split(':'),
    dateParts = dateTimeParts[0].split('-'),
    date;

	date = new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0], timeParts[0], timeParts[1]);

	return date.getTime();
}

$(document).ready(function() {

	$('.datepicker').datetimepicker({
		dayOfWeekStart : 1,
		lang:'en',
		format:'d-m-Y H:i',
	});

	$('.get-readings-btn').click(function() {
		// Show records after datetime filters applied
		var socketMessage = 'get-readings-';

		var startDate = $('#startDate')[0].value;
		var endDate = $('#endDate')[0].value;
		var dbType = $('#dbType').val();

		startDate = startDate ? toTimestamp(startDate) : 0;
		endDate = endDate ? toTimestamp(endDate) : 0;

		socketMessage += dbType + '-';
		socketMessage += startDate + '-' + endDate;

		socket.send(socketMessage);
	});

});
