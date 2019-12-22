var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 5000;


const firebase = require('firebase');
const firebaseConfig = require("./config/config.json");
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

io.on('connection', function (socket) {
    socket.on('chat message', function (data) {
        const messageData = JSON.parse(data);
        let setDoc = db.collection('messages').doc().set(messageData);

        io.emit('chat message', data);
    });
});

http.listen(port, function () {
    console.log('listening on *:' + port);
});
