import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";

const pageRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  // 대여 페이지
  fastify.get("/" , 
    async (_, reply) => {
      reply.view("/static/html/landing.ejs", { 
        rentalInfo: [
          {
            phoneModel: 'model1',
            phoneName: '안드로이드1',
            phoneOS: 'AOS',
            status: 'ok',
            date: '',
          },
          {
            phoneModel: 'model2',
            phoneName: '아이폰1',
            phoneOS: 'IOS',
            status: 'ok',
            date: '',
          }
        ]
      });
    }
  );

  // reservation 페이지
  fastify.get("/reservation",
    async (_, reply) => {
      reply.view("/static/html/reservation.ejs");
    }
  );

  // login 페이지
  fastify.get("/login",
    async (_, reply) => {
      reply.view("/static/html/login.ejs");
    }
  );

  // amdin 페이지
  fastify.get("/admin",
    { preValidation: fastify.auth }, 
    async (_, reply) => {
      reply.view("/static/html/admin.ejs");
    }
  );

  // device add 페이지
  fastify.get("/device/add",
    { preValidation: fastify.auth }, 
    async (_, reply) => {
      reply.view("/static/html/device-add.ejs");
    }
  );

  // device add 페이지
  fastify.get("/device/edit",
    { preValidation: fastify.auth }, 
    async (_, reply) => {
      reply.view("/static/html/device-edit.ejs");
    }
  );

  done();
}

export default pageRoute;
