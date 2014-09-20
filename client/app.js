var WebSocket = require('ws');
var ws = new WebSocket('ws://localhost:7204/myo/1');

var express = require('express');
var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server);

ws.on('message', function(message) {
	json = JSON.parse(message);
	var data = json[1];
	if (data.type == "pose" || data.type == "orientation") {
		console.log(data);
   		io.emit('myo', message);
	}
});

