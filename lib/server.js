import express from 'express';
import process from 'process';
import bodyparser from 'body-parser'
import logger from './services/logging.js';
import userRoute from './modules/user/userRoute.js';
import { loginBaseURL } from './services/config.js';
import initializeSwagger from './swagger.js';
export class Server {
  app;
  port;

  constructor(port) {
    this.port = port;
    this.app = express();

    this.api();
    initializeSwagger(this.app);
 
  }

  async start() {
    try {
      await this.app.listen(this.port, '0.0.0.0');
      logger.info(`server listening on ${this.port}`);
    } catch (err) {
      logger.info(`server listening on ${this.port}`);
      process.exit(1);
    }
  }

  // REST api routes here
  api() {
    this.app.use(bodyparser.urlencoded({ extended: true }))
    this.app.use(bodyparser.json())
    this.app.get('/', (req, res) => {
      res.sendStatus(200);
    });
    this.app.use(loginBaseURL, userRoute);
  }
}
