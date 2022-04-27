import Fastify from 'fastify';
import CorsPlugin from 'fastify-cors';
import FastifyExpress from 'fastify-express';
import PointOfView from 'point-of-view';
import pageRoute from './controller/page';
import apiRoute from './controller/api';

const fastify = Fastify({ logger: true });

// reigster Plugins
fastify.register(CorsPlugin);
fastify.register(FastifyExpress);
fastify.register(PointOfView, {
  engine: {
    ejs: require('ejs'),
  },
});

// route
fastify.register(pageRoute, { prefix: '' });
// fastify.register(apiRoute, { prefix: '/api' });

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start();
