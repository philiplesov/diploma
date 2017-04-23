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
		if($(this).hasClass('btn-success')) {
			socket.send('turn-on');
			$(this).removeClass('btn-success');
			$(this).addClass('btn-danger');
			$(this).html('Turn Sensor OFF');
		} else {
			socket.send('turn-off');
			$(this).removeClass('btn-danger');
			$(this).addClass('btn-success');
			$(this).html('Turn Sensor ON');
		}
	});

	$('#test').click(function () {
		if($(this).hasClass('btn-default')) {
			socket.send('test-turn-on');
			$(this).removeClass('btn-default');
		} else {
			socket.send('test-turn-off');
			$(this).addClass('btn-default');
		}
	});
});
