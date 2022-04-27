import fp from 'fastify-plugin';
import {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
  FastifyPluginOptions,
} from 'fastify';
// @ts-ignore
import jwt from 'fastify-jwt';
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
          console.log(chalk.bgGreenBright('test jwt'));
          // @ts-ignore
          await request.jwtVerify();
        } catch (err) {
          reply.send(err);
        }
      }
    );
  }
);