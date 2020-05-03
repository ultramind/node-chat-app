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
    
    socket.on('newMessage', (message) => {
        console.log('New message', message);
        io.emit('newMessage', {
            from: message.form,
            text: message.text,
            createdAt: new Date().getTime()
        })
    });
    

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server run on port ${port}`);
})