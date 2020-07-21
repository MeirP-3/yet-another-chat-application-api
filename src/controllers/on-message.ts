import { saveMessage } from "../messages/messages.service";
import { errorHandler } from "../utils/error-handler";

const onMessage = (socket: SocketIO.Socket) => async ({ content }) => {

  try {

    const nickname = socket['nickname'];

    const {
      from,
      createdAt: time
    } = await saveMessage({
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

export const setOnMessage = (socket: SocketIO.Socket, next) => {
  socket.on('message', onMessage(socket));
  next();
}