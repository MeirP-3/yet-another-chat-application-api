import * as io from 'socket.io';
import { authenticationHandler } from './handlers/authentication.handler';
import { connectionHandler } from './handlers/connection.handler';
import { disconnectHandler } from './handlers/disconnect.handler';
import { messageHandler } from './handlers/message.handler';
import { httpServer } from './utils/server';


io(httpServer)
  .use(authenticationHandler)
  .use(connectionHandler)
  .use(disconnectHandler)
  .use(messageHandler);