import { getLastMessages } from "../messages/messages.service";
import { saveEvent } from "../events/handle-events";
import { errorHandler } from "../utils/error-handler";

export const onConnection = async (socket: SocketIO.Socket, next) => {

  try {

    const nickname = socket['nickname'];

    const connectEvent = {
      type: 'user connected',
      name: nickname,
    };

    const connectMessage = { ...connectEvent, time: Date.now() };
    
    const lastMessages = await getLastMessages();

    socket.emit('last messages', {
      // TODO: include connection events
      lastMessages
    });


    // Send to all including current user
    socket.broadcast.send(connectMessage);
    socket.send(connectMessage);

    await saveEvent(connectEvent);

    next();

  } catch (error) {

    errorHandler(error);

    next(new Error('server error'));

  }
};