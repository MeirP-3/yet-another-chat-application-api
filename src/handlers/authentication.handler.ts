import { errorHandler } from "../utils/error-handler";
import User from "../models/user";


export const authenticationHandler = async (
  socket: SocketIO.Socket,
  next
) => {

  try {

    const {
      id,
      handshake: {
        query: {
          nickname
        }
      }
    } = socket;

    if (!nickname) {
      return next(new Error('please provide nickname'));
    }

    const { success, message } = await User.register(nickname);

    if (!success) {
      return next(new Error(message));
    }

    socket.emit('ok');

    socket['nickname'] = nickname;

    next();

  } catch (error) {

    errorHandler(error);

    next(new Error('server error'));

  }
};