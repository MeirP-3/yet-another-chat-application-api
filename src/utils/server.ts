import { createServer } from "http";
import { healthcheck } from "./healthcheck";
import { port } from "../config/port";

export const httpServer = createServer(healthcheck)
  .listen(port, () => {
    console.log(`Chat app server is listening on port ${port}`);
  });