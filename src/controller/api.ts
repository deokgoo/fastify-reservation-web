import { FastifyInstance } from "fastify";

const apiRoutes = (fastify: FastifyInstance) => {
  fastify.get("/getSomething", async function createUser(request, reply) {

    reply.status(200).send({
      test: 'api ok'
    });
  });
}

export default apiRoutes;
