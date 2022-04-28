import fp from 'fastify-plugin';
import {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
  FastifyPluginOptions,
} from 'fastify';
import jwt from '@fastify/jwt';
import chalk from 'chalk';

export default fp(
  async (fastify: FastifyInstance, opts: FastifyPluginOptions) => {
    fastify.register(jwt, {
      secret: 'secret',
    });
    fastify.decorate(
      'auth',
      async (request: FastifyRequest, reply: FastifyReply) => {
        try {
          await request.jwtVerify();
          console.log(chalk.bgGreenBright('admin access page'));
        } catch (err) {
          reply.send(err);
        }
      }
    );
  }
);