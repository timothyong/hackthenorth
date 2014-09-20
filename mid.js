var WebSocket = require('ws');
var ws = new WebSocket('ws://localhost:7204/myo/1');

var app = require('http').createServer();
var server = app.listen(4000);
var io = require('socket.io').listen(server);
var fs = require('fs');

var myoID;

ws.on('message', function(message) {
        json = JSON.parse(message);

        if (json[0] != "event")
            return console.log(message);

        var data = json[1];

        if (data.type == "connected") {
            myoID = data.myo;
        }

        if (data.type == "pose") {
            console.log(data);
            io.sockets.on('connection',function(socket){
                    socket.emit(data);
                });
        }
    });

