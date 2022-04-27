import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import chalk from 'chalk';

const pageRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  fastify
    .decorate('verifyAdmin', (req: FastifyRequest, reply: FastifyReply, done: () => void) => {
      console.log(chalk.bgBlueBright(req.routerPath));
      done();
    })

  // 대여 페이지
  fastify.get("/", async (_, reply) => {
    
    reply.view("/static/html/landing.ejs", { text: "hello world" });
  });

  // amdin 페이지
  fastify.get("/admin/*", async (_, reply) => {
    
    reply.view("/static/html/admin.ejs");
  });

  next();
}

export default pageRoute;
