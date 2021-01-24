var express = require('express');
var socket = require('socket.io');


// App setup
var app = express();
const PORT = 4000;

var server = app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});

// Static files
app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);

io.on('connection', (socket) => {
    console.log('A user connected', socket.id);



    // Handle chat event
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });

    socket.on('disconnect', () =>{
      console.log('user disconnected')
    })

});
