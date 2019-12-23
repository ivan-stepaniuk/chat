const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 5000;
const path = require('path');
const firebase = require('firebase');
const firebaseConfig = require("./config/config.json");
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

app.use(express.static(path.join(__dirname + '/client/build')));

io.on('connection', function (socket) {
    socket.on('chat message', function (data) {
        const messageData = JSON.parse(data);
        db.collection('messages').doc().set(messageData);

        io.emit('chat message', data);
    });
});

http.listen(port, function () {
    console.log('listening on *:' + port);
});
