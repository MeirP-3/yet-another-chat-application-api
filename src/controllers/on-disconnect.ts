import { errorHandler } from "../utils/error-handler"
import { saveEvent } from "../events/handle-events";
import { unregisterUser } from "../users/registration";


const onDisconnect = (socket: SocketIO.Socket) => async () => {

  try {

    const nickname = socket['nickname'];
  
    const event = {
      type: 'user disconnected',
      name: nickname
    };
  
    await saveEvent(event);
  
    const message = { ...event, time: Date.now() };
  
    socket.broadcast.send(message);
  
    await unregisterUser(nickname);
  
  } catch (error) {
    
    errorHandler(error);

  }
};


export const setOnDisconnect = async (
  socket: SocketIO.Socket,
  next
) => {
  socket.on('disconnect', onDisconnect(socket));
  next();
};