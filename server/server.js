const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

var port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);

var pathPublic = path.join(__dirname, '../public');
app.use(express.static(pathPublic));

io.on('connection', (socket) => {
    console.log('New User connected');
    
    socket.emit('new Message', {
        from: "oforhciomahope@gmail.com",
        test: "I just want to say i love you"
    });
    
    socket.on('createMessage', (message) => {
        console.log('New message', message);
    })
    

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server run on port ${port}`);
})