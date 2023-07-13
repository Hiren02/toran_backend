import { Server } from './server.js';
import { SERVER_PORT } from './services/config.js';

const server = new Server(SERVER_PORT);
server.start();
