import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { getAllDeviceList, getDeviceById } from '../service/deviceinfoService';

const pageRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
  // device return 페이지
  fastify.get("/return",
    { preValidation: fastify.auth },
    async (_, reply) => {      
      reply.view("/static/html/device-return.ejs");
    }
  );

  // device add 페이지
  fastify.get("/add",
    { preValidation: fastify.auth }, 
    async (_, reply) => {
      reply.view("/static/html/device-add.ejs");
    }
  );

  // device edit 페이지
  fastify.get("/edit",
    { preValidation: fastify.auth }, 
    async (req, reply) => {
      // @ts-ignore
      const { os } = req.query;
      const allDeviceList = await getAllDeviceList(os);

      reply.view("/static/html/device-edit.ejs", {
        allDeviceList
      });
    }
  );

  // device edit detail 페이지
  fastify.get('/edit/:id', async (req, reply) => {
    // @ts-ignore
    const { id } = req.params;
    const deviceInfo = await getDeviceById(id);
    deviceInfo.img_url;
    deviceInfo.isReturn;
    deviceInfo.os_version;
    deviceInfo.os;
    deviceInfo.img_url;

    reply.view("/static/html/device-edit-detail.ejs", {
      deviceInfo
    });
  });

  done();
}

export default pageRoute;
