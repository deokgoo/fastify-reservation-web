import { Server, IncomingMessage, ServerResponse } from 'http';
import { Sequelize } from 'sequelize/types';

declare module 'fastify' {
  export interface FastifyInstance<
    HttpServer = Server,
    HttpRequest = IncomingMessage,
    HttpResponse = ServerResponse
  > {
    db: any;
    auth: any;
    jwt: any;
    sequelize: Sequelize;
  }
}