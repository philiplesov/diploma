var readings = $('#readings');
var socket = new WebSocket("ws://localhost:8081");

socket.onopen = openSocket;
socket.onmessage = showData;

function openSocket() {
	//socket.send('get-readings-0-20');
}

function showData(result) {
	var test = [{"band": "Weezer","song": "El Scorcho"},{"band": "Chevelle","song": "Family System"}];
	asd = JSON.parse(result.data);
	$('#readingsTable').dynatable({
	  dataset: {
	    records: asd
	  }
	});
	// when the server returns, show the result in the div:
	readings.html(result.data);
}

$(document).ready(function() {

	$('.datepicker').datetimepicker({
		dayOfWeekStart : 1,
		lang:'en',
	});

	$('.get-readings-btn').click(function() {
		var startDate = $('#startDate')[0].value;
		var endDate = $('#endDate')[0].value;

		if(!startDate || !endDate) {
			return;
		}
		
		socket.send('get-readings-0-20');
	});

});
