import fp from 'fastify-plugin';

export default fp(async (fastify) => {
  try {
    // init sqlite
  } catch (error) {
    console.log(error);
  }
});