import { errorHandler } from "../utils/error-handler";
import ConnectionEvent from "../models/connection-event";
import User from "../models/user";


const onDisconnect = (socket: SocketIO.Socket) => async () => {

  try {

    const nickname = socket['nickname'];
  
    const event = {
      type: 'user disconnected',
      name: nickname
    };
  
    await ConnectionEvent.saveEvent(event);
  
    const message = { ...event, time: Date.now() };
  
    socket.broadcast.send(message);
  
    await User.unregister(nickname);
  
  } catch (error) {
    
    errorHandler(error);

  }
};


export const disconnectHandler = async (
  socket: SocketIO.Socket,
  next
) => {
  socket.on('disconnect', onDisconnect(socket));
  next();
};