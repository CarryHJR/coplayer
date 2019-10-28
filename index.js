var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');
var path = require('path');
app.use(express.static(path.join(__dirname, 'static')))


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');

});

http.listen(3000, function() {
    console.log('listening on *:3000');
});

io.on('connection', function(socket) {
    console.log('a user connected');
    var address = socket.request.connection
        .remoteAddress + ':' + socket.request.connection.remotePort
    console.log('New connection from ' + address);

    socket.on('disconnect', function() {
        console.log('user disconnected');

    });
    socket.on('chat message', function(msg) {
        console.log('message: ' + msg);

        io.emit('chat message', msg);

    });

});
