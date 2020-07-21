import * as http from 'http';
import * as socketio from 'socket.io';
import * as express from 'express';

const connectedUsers = {};
const connectedSocketIds = {};

let messages = [];

setInterval(() => {
  const length = messages.length;
  const last10Messages = messages.slice(length - 10, length);
  messages.length = 0;
  messages.push(...last10Messages);
}, 1000 * 60 * 60);

const port = process.env.PORT || 8080;

const httpServer = http.createServer(
  express()
  .get('/', (req, res) => {
    res.send('yet-another-chat-app healthcheck');
  })
);

const io = socketio(httpServer);

io.use((socket, next) => {
  const { id, handshake: { query: { nickname } } } = socket;

  if (!nickname) {
    return next(new Error('plaease provide nickname'));
  }

  if (!!connectedUsers[nickname]) {
    return next(new Error('nickname currently in use'));
  }

  connectedUsers[nickname] = id;
  connectedSocketIds[id] = nickname;

  socket.emit('ok');

  next();
});


io.on('connection', async socket => {
  const { id } = socket;

  const nickname = connectedSocketIds[id];

  socket.on('disconnect', () => {
    const disconnectMessage = {
      type: 'user disconnected',
      name: nickname
    };

    io.send(disconnectMessage);

    delete connectedUsers[nickname];
    delete connectedSocketIds[id];

    messages.push(disconnectMessage);
  });


  const connectMessage = {
    type: 'user connected',
    name: nickname,
    time: Date.now()
  };

  io.send(connectMessage);

  socket.emit('last messages', {
    lastMessages: messages
  });

  messages.push(connectMessage);

  socket.on('message', ({ content }) => {
    const message = {
      type: 'message',
      content,
      from: nickname,
      time: Date.now()
    };

    socket.broadcast.send(message);
    messages.push(message);
  });
});


httpServer.listen(port, () => {
  console.log(`Chat app server is listening on port ${port}`);
});