import Fastify from 'fastify';
import FastifyStatic from '@fastify/static';
import CorsPlugin from '@fastify/cors';
import PointOfView from 'point-of-view';
import pageRoute from './controller/page';
import apiRoute from './controller/api';
import auth from './middleware/auth';
import path from 'path';

const SERVER_PORT = 4000;

const fastify = Fastify({ logger: true });

console.log(__dirname);
// reigster Plugins
fastify
  .register(FastifyStatic, {
    root: path.join(__dirname, 'static'),
    prefix: '/static/',
  })
  .register(CorsPlugin)
  .register(PointOfView, { engine: { ejs: require('ejs') } })
  .register(auth);

// route
fastify
  .register(pageRoute, { prefix: '' })
  .register(apiRoute, { prefix: '/api' });

// error handler
fastify.setErrorHandler((error, _, reply) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'INTERNAL_SERVER_ERROR';

  reply.code(statusCode).send({
    statusCode,
    message,
  });
});

// Run the server!
(async () => {
  try {
    await fastify.listen(SERVER_PORT);
  } catch (e) {
    fastify.log.error(e);
    process.exit(1);
  }
})();
