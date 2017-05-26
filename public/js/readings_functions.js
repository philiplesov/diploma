var readings = $('#readings');
var socket = new WebSocket("ws://localhost:8081");

var config;
var serverData;

socket.onopen = openSocket;
socket.onmessage = showData;

function openSocket() {
    socket.send('get-config');
}

function showData(result) {
    serverReturn = JSON.parse(result.data);

    if(serverReturn.type == 'config') {
        config = serverReturn.data;
        return;
    }

    readingsTable = '#readingsTable' + serverReturn.type;

    // Set global serverData to contain newest returned server data
    serverData = serverReturn.data;

    var tableResults = [];
    for (var i in serverData) {
    	tableResults.push(JSON.parse(JSON.stringify(serverData[i])));
        if(tableResults[i].universal_time) {
            tableResults[i].universal_time = makeDateTimePretty(tableResults[i].universal_time);
        }
    	if(tableResults[i].created_at) {
    		tableResults[i].created_at = makeDateTimePretty(tableResults[i].created_at);
    	}
    }

    // when the server returns, show the result in table
    var dynatable = $(readingsTable).dynatable({ 
        dataset: { records: tableResults } }, 
        { features: { pushState: false }}).data("dynatable");
    dynatable.settings.dataset.originalRecords = tableResults;
    dynatable.process();

    $('#readingsTableContainer' + serverReturn.type).show();

    //set select values to charts' selects
    var selectValues = config.gpsTypes[serverReturn.type];
    for (key in selectValues) {
        $('#selectParam1').append($("<option></option>").attr("value",selectValues[key].value).text(selectValues[key].name));
        $('#selectParam2').append($("<option></option>").attr("value",selectValues[key].value).text(selectValues[key].name));  
    }

    $('#chartDataContainer').slideDown();
}

function createChart(params) {
    var data = [];
    for (key in serverData) {
        var obj = {};
        if(isNaN(parseFloat(serverData[key][params.param1.value])) || !isFinite(serverData[key][params.param1.value]) || isNaN(parseFloat(serverData[key][params.param2.value])) || !isFinite(serverData[key][params.param2.value])) {
            console.log('not number');
            return;
        }
        obj.x = parseFloat(serverData[key][params.param1.value]);
        obj.y = parseFloat(serverData[key][params.param2.value]);
        data.push(obj);
    }

    var xtime, ytime = false;
    if(params.param1.value == 'created_at' || params.param1.value == 'universal_time') {
        xtime = params.param1.value;
    }
    if(params.param2.value == 'created_at' || params.param2.value == 'universal_time') {
        ytime = params.param2.value;
    }

    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [params.param1.name, params.param2.name],
            datasets: [{
                label: params.param1.name + " - " + params.param2.name,
                data: data,
                backgroundColor: "rgba(92,184,92,0.5)",
                borderColor: "rgba(92,184,92)",
                pointBorderColor: "rgba(92,184,92)",
                pointHoverBackgroundColor: "rgba(92,184,92)",
                pointHoverBorderColor: "rgba(92,184,92)",
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom',
                    ticks: {
                        // Transform time to readable
                        callback: function(value, index, values) {
                            if(xtime) {
                            	value = makeDateTimePretty(value);
                            }
                            return value;
                        }
                    }
                }],
                yAxes: [{
                    ticks: {
                        // Transform time to readable
                        callback: function(value, index, values) {
                            if(ytime) {
                            	value = makeDateTimePretty(value);
                            }
                            return value;
                        }
                    }
                }]
            },
            tooltips: {
            	enabled: true,
                mode: 'single',
                callbacks: {
                    label: function(tooltipItems, data) { 
                        return '';
                    },
                    title: function(tooltipItems, data) {
                    	var xLabel = tooltipItems[0].xLabel;
                    	var yLabel = tooltipItems[0].yLabel;

                    	if(xtime) {
                            xLabel = makeDateTimePretty(xLabel);
                        }
                        if(ytime) {
                        	yLabel = makeDateTimePretty(yLabel);
                        }

                        return xLabel + '  |  ' + yLabel;
                    }
                }
	        }
        }
    });

    ctx.show();
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

function makeDateTimePretty(datetime) {
	datetime = datetime.toString();

	if(datetime.indexOf('.') > -1 || datetime.length == 6) {
		return convertToPrettyTime(datetime);
	}

	return convertToPrettyDateTime(datetime)
}

function convertToPrettyTime(time) {
	if(typeof time != 'string') {
		time = time.toString();
	}

	return time.substring(0,2) + ":" + time.substring(2,4) + ":" + time.substring(4,6);
}

function convertToPrettyDateTime(datetime) {
	var date = new Date(parseInt(datetime));

    return date.toLocaleString("en-GB");
}

$(document).ready(function() {

    $('.datepicker').datetimepicker({
        dayOfWeekStart : 1,
        lang:'en',
        format:'d-m-Y H:i',
    });

    $('.get-readings-btn').click(function() {
        // Show records in table
        var socketMessage = 'get-readings-';

        var startDate = $('#startDate')[0].value;
        var endDate = $('#endDate')[0].value;
        var dbType = $('#dbType').val();

        if(!dbType) {
            return;
        }

        $('[id^=readingsTableContainer]').hide();

        startDate = startDate ? toTimestamp(startDate) : 0;
        endDate = endDate ? toTimestamp(endDate) : 0;

        socketMessage += dbType + '-';
        socketMessage += startDate + '-' + endDate;

        socket.send(socketMessage);
    });

    $('.create-chart-btn').click(function() {
        var params = {
            "param1" : {
                "name": $('#selectParam1 option:selected').text(),
                "value": $('#selectParam1').val()
            },
            "param2" : {
                "name": $('#selectParam2 option:selected').text(),
                "value": $('#selectParam2').val()
            }
        };

        return createChart(params);
    });
});
