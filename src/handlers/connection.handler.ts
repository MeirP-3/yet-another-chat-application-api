import { errorHandler } from "../utils/error-handler";
import ConnectionEvent from "../models/connection-event";
import Message from "../models/message";

export const connectionHandler = async (socket: SocketIO.Socket, next) => {

  try {

    const nickname = socket['nickname'];

    const connectEvent = {
      type: 'user connected',
      name: nickname,
    };

    const connectMessage = { ...connectEvent, time: Date.now() };
    
    const lastMessages = await Message.getLast10();

    socket.emit('last messages', {
      // TODO: include connection events
      lastMessages
    });


    // Send to all including current user
    socket.broadcast.send(connectMessage);
    socket.send(connectMessage);

    await ConnectionEvent.saveEvent(connectEvent);

    next();

  } catch (error) {

    errorHandler(error);

    next(new Error('server error'));

  }
};