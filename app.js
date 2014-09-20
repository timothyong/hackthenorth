
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http');

var app = module.exports = express.createServer();
var server = app.listen(3000);
var io = require('socket.io').listen(server);


//---------------not working-----------------
var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({port: 1337});

wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        console.log(message);
    });
//    ws.send('something');
});
//-------------------------------------------

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

io.listen(app);
io.sockets.on('connection', function (socket) {
    console.log('New user connected!');
    socket.emit('info', { msg: 'What up bro?' });
    socket.on('clientstuff', function (data) {
	console.log(data);
    });
});
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
