import { FastifyInstance } from "fastify";
import chalk from 'chalk'
import Fastify from "fastify";

const pageRoute = (fastify: FastifyInstance, opt, next) => {
  fastify.use((req, _, next) => {
    const path: string = req.path;

    if(path.startsWith('/admin')) {
      // need admin permission
    }

    next();
  });

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
