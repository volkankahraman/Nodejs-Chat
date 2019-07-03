if (process.env.NODE_ENV !== 'production') require('dotenv').config()
var socket = require('socket.io');
var dbHelper = require('./dbHelper');
var Server = require('./server');

var dbh = new dbHelper();
dbh.Connect();

var server = new Server();

server.app.get('/messages',function(req,res){
    dbh.GetLastMessages(function (data) {
        res.json(data);
    })   
});

var io = socket(server.Listen());

io.on('connection', function (socket) {
    console.log("Biri Bağlandı", socket.id);
    socket.on('chat', function (data) {
        io.sockets.emit('chatClient', data);
        dbh.AddToMessages(data);
    });

    socket.on('typing', function (data) {
        socket.broadcast.emit('typing', data);
    });
});
