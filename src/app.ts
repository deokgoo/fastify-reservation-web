import Fastify from 'fastify';
import CorsPlugin from 'fastify-cors';
import FastifySwagger from 'fastify-swagger';
import PointOfView from 'point-of-view';
import pageRoute from './controller/page';
import apiRoute from './controller/api';

const fastify = Fastify({ logger: true });

// reigster Plugins
fastify
  .register(CorsPlugin)
  .register(PointOfView, { engine: { ejs: require('ejs') } })
  .register(FastifySwagger);

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
    await fastify.listen(4000);
  } catch (e) {
    fastify.log.error(e);
    process.exit(1);
  }
})();
