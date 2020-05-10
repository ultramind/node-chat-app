const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const {generateMessage, generateLocation} =require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

var port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

var pathPublic = path.join(__dirname, '../public');
app.use(express.static(pathPublic));

io.on('connection', (socket) => {
    console.log('New User connected');

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room is required');           
        }


        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        

        io.to(params.room).emit('updateList', users.getUserList(params.room));
        
        socket.emit('newMessage',generateMessage('Admin', 'Welcome to the chat'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} join the room`));
        callback();
    });
    
    socket.on('newMessage', (message, response) => {
        var user = users.getUser(socket.id);
        if (user && isRealString(message.text)) {
            console.log('New message', message);
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
            response('This is from the server');
        }
        
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })

    });

    socket.on('getLocation', (coords, response) => {
        var user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            io.to(user.room).emit('getLocation', generateLocation(user.name, coords));
        }
        
    })
    

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} left the room`));
            console.log('The new users',user);
        }
        

    });
});

server.listen(port, () => {
    console.log(`Server run on port ${port}`);
})