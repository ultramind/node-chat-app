const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const {generateMessage, generateLocation} =require('./utils/message');

var port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);

var pathPublic = path.join(__dirname, '../public');
app.use(express.static(pathPublic));

io.on('connection', (socket) => {
    console.log('New User connected');

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.emit('newMessage',generateMessage('Admin', 'Welcome to the chat'));
    
    socket.on('newMessage', (message, response) => {
        console.log('New message', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        response('This is from the server');
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })

    });

    socket.on('getLocation', (coords, response) => {
        io.emit('getLocation', generateLocation('Admin', coords));
    })
    

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server run on port ${port}`);
})