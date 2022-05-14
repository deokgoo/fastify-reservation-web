import Fastify from 'fastify';
import FastifyStatic from '@fastify/static';
import CorsPlugin from '@fastify/cors';
import CookiePlugin from '@fastify/cookie';
import FormbodyPlugin from '@fastify/formbody';
import db from './models';
import PointOfView from 'point-of-view';
import pageRoute from './routes/page';
import devicePageRoute from './routes/devicePage';
import deviceRoute from './routes/device';
import authRoute from './routes/auth';
import reservationRoute from './routes/reservation';
import auth from './middleware/auth';
import path from 'path';

const SERVER_PORT = 4000;

const fastify = Fastify({ logger: true });

db.sequelize.sync({ force: false });

// reigster Plugins
fastify
  .register(FastifyStatic, {
    root: path.join(__dirname, 'static'),
    prefix: '/static/',
  })
  .register(CorsPlugin, {
    origin: true,
    credentials: true,
  })
  .register(FormbodyPlugin)
  .register(CookiePlugin)
  .register(PointOfView, { engine: { ejs: require('ejs') } })
  .register(auth);

// route
fastify
  .register(pageRoute, { prefix: '' })
  .register(devicePageRoute, { prefix: '/device' })
  .register(authRoute, { prefix: '/api/auth' })
  .register(deviceRoute, { prefix: '/api/device' })
  .register(reservationRoute, { prefix: '/api/reservation' });

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
