$(document).ready(function() {
	var readings = $('#readings');
	var socket = new WebSocket("ws://localhost:8081");

	socket.onopen = openSocket;
	socket.onmessage = showData;

	var htmlTemplate = "<div class='gps-reading'>DATA_HERE</div>";

	function openSocket() {
		var prependHtml = htmlTemplate.replace("DATA_HERE", "Socket opened!");
		readings.prepend(prependHtml);
	}

	function showData(result) {
		// when the server returns, show the result
		$(".sk-circle").hide();
		readings.children().first().fadeOut("slow");

		var prependHtml = htmlTemplate.replace("DATA_HERE", result.data);
		readings.prepend(prependHtml);
		readings.children().first().delay(2500).fadeOut("slow");
	}

	$('#bltSwitch').click(function () {
		var loader = $(".sk-circle");
		var labelONOrOFF = $(this).children('.blt-switch-label').html();
		if($(this).hasClass('btn-success')) {
			socket.send('turn-on');
			$(this).removeClass('btn-success');
			$(this).addClass('btn-danger');
			loader.show();
			$(this).children('.blt-switch-label').html(labelONOrOFF.replace("ON", "OFF"));
		} else {
			socket.send('turn-off');
			$(this).removeClass('btn-danger');
			$(this).addClass('btn-success');
			loader.hide();
			$(this).children('.blt-switch-label').html(labelONOrOFF.replace("OFF", "ON"));
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
