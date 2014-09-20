var WebSocket = require('ws');
var ws = new WebSocket('ws://localhost:7204/myo/1');

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var morgan = require('morgan');

server.listen(3000);

app.use(express.static(__dirname + "/public"));

io.sockets.on('connection', function(socket){
	socket.on('pointable', function(leap){
		console.log(JSON.parse(leap));
	});
	ws.on('message', function(myo){
//		console.log(JSON.parse(myo));
	});
});
