var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

users = [];
connections = [];

server.listen(process.env.PORT || 3000 );
console.log(`Server running...`);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})

io.sockets.on('connection', function(socket) {
    connections.push(socket);
    console.log(`Connected: ${connections.length} sockets connected`)

    //Disconnect
    socket.on('disconnect', function(data) {
        connections.splice(connections.indexOf(socket), 1);
    console.log(`Disconnected: ${connections.length} socket connected`);
    }); 

    // Send Message
    socket.on('send message', function(data) {
        console.log(data);
        io.sockets.emit('new message', {msg:data});
    })
});
