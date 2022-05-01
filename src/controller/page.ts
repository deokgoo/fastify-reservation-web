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
