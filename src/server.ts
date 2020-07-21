import * as express from 'express';
import * as http from 'http';
import * as socketio from 'socket.io';
import { userMiddleware } from './controllers/middleware';
import { onConnection } from './controllers/on-connection';
import { setOnDisconnect } from './controllers/on-disconnect';
import { setOnMessage } from './controllers/on-message';
import { healthcheck } from './utils/healthcheck';

const port = process.env.PORT || 8080;

const expressApp = express().get('/', healthcheck);

const httpServer = http.createServer(expressApp);

socketio(httpServer)
.use(userMiddleware)
.use(onConnection)
.use(setOnDisconnect)
.use(setOnMessage);

httpServer.listen(port, () => {
  console.log(`Chat app server is listening on port ${port}`);
});

import { sequelize } from './db';
sequelize.drop();
sequelize.sync({ force: true });