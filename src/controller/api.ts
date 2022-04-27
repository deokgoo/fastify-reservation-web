import { FastifyInstance } from "fastify";

const apiRoutes = (fastify: FastifyInstance, opt: any, done: () => void) => {
  fastify.get("/*", async function createUser(req, reply) {
    reply.status(200).send({
      test: 'api ok'
    });
  });

  done();
}

export default apiRoutes;
