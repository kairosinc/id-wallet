import express from 'express';
import compression from 'compression';

import routing from './routing';
import isProduction from './isProduction';
import {
  STATIC_PATH,
  SERVER_PORT
} from './config';



const server = express();

server.use(compression());
server.use(STATIC_PATH, express.static("dist"));
server.use(STATIC_PATH, express.static("public"));

routing(server);

server.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}.`);
  console.log(`Server running in ${ isProduction ? "PRODUCTION" : "DEVELOPMENT" } mode.`);
});
