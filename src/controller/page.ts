import chalk from "chalk";
import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";

const pageRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  // 대여 페이지
  fastify.get("/" , 
    async (_, reply) => {
      console.log(chalk.bgGray('test2'));
      reply.view("/static/html/landing.ejs", { text: "hello world" });
    }
  );

  // amdin 페이지
  fastify.get("/admin",
    { preValidation: fastify.auth }, 
    async (_, reply) => {
      reply.view("/static/html/admin.ejs");
    }
  );

  done();
}

export default pageRoute;
