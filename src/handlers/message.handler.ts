import { errorHandler } from "../utils/error-handler";
import Message from "../models/message";

const onMessage = (socket: SocketIO.Socket) => async ({ content }) => {

  try {

    const nickname = socket['nickname'];

    const {
      from,
      createdAt: time
    } = await Message.saveMessage({
      content,
      from: nickname
    });

    const message = {
      type: 'message',
      content,
      from: nickname,
      time
    };
    
    socket.broadcast.send(message);
    
  } catch (error) {

    errorHandler(error);

    socket.error('server error');
  }
};

export const messageHandler = (socket: SocketIO.Socket, next) => {
  socket.on('message', onMessage(socket));
  next();
}