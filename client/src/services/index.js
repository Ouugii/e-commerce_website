"use strict";

class Server {
  constructor(host, port) {
    this.host = host;
    this.port = port;
    this.endpoint = `${this.host}:${this.port}`;
    this.api_v1_url = `${this.host}:${this.port}/api/v1`;
  }
}

const AppServer = new Server(process.env.DOMAIN_NAME, process.env.APP_PORT);

module.exports = {
  AppServer,
};
