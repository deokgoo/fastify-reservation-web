import Fastify from 'fastify';
import PointOfView from 'point-of-view';
import pageRoute from './controller/page';
import apiRoute from './controller/api';
import CorsPlugin from '@fastify/cors';
import auth from './middleware/auth';

const SERVER_PORT = 4000;

const fastify = Fastify({ logger: true });

// reigster Plugins
fastify
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
