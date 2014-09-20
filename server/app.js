
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();
var server = app.listen(3000);
var io = require('socket.io').listen(server);


// Configuration

app.configure(function(){
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
});

// Routes

io.listen(app);
io.sockets.on('connection', function (socket) {
    socket.on('myo', function (data) {
	console.log(data);	
    });
});

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
