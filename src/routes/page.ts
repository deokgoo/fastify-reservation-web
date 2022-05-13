import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { getAllDeviceList } from '../service/deviceinfoService';
import chalk from 'chalk';

const pageRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  // 대여 페이지
  fastify.get("/" ,
    async (req, reply) => {
      // @ts-ignore
      const { os } = req.query;
      const allDeviceList = await getAllDeviceList(os);
      
      reply.view("/static/html/landing.ejs", { allDeviceList });
    }
  );

  // reservation 페이지
  fastify.get("/reservation",
    async (_, reply) => {
      const deviceList = await getAllDeviceList();

      reply.view("/static/html/reservation.ejs", { deviceList });
    }
  );

  // login 페이지
  fastify.get("/login",
    async (_, reply) => {
      reply.view("/static/html/login.ejs");
    }
  );

  // device return 페이지
  fastify.get("/device/return",
    { preValidation: fastify.auth },
    async (_, reply) => {      
      reply.view("/static/html/device-return.ejs");
    }
  );

  // device add 페이지
  fastify.get("/device/add",
    { preValidation: fastify.auth }, 
    async (_, reply) => {
      reply.view("/static/html/device-add.ejs");
    }
  );

  // device edit 페이지
  fastify.get("/device/edit",
    { preValidation: fastify.auth }, 
    async (_, reply) => {

      reply.view("/static/html/device-edit.ejs");
    }
  );

  done();
}

export default pageRoute;
