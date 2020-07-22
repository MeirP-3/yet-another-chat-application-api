import * as express from 'express';

export const healthcheck = express().get('/', (req, res) => {
  res.send('yet-another-chat-app healthcheck');
});