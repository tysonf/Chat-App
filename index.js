//Server Side

var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000');
});

// Static files
app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {
    console.log('made socket connection', socket.id);

    socket.on('chat',function(data){
        //all the sockets connected to the server recieve the data
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
       //sends data to every other socket besides the one that is being typed on
        socket.broadcast.emit('typing', data)
    })
});