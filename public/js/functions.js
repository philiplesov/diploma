$(document).ready(function() {
	var readings = $('#readings');
	var socket = new WebSocket("ws://localhost:8081");

	socket.onopen = openSocket;
	socket.onmessage = showData;

	function openSocket() {
		readings.html("Socket open");
	}

	function showData(result) {
		// when the server returns, show the result in the div:
		readings.html(result.data);
	}

	$('#bltSwitch').click(function () {
		socket.send('Make it rain');
	});
});
