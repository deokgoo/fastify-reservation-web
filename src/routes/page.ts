import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { getAllDeviceList, getDeviceById } from '../service/deviceinfoService';
import { getReservationListBydeviceId } from '../service/resetvationService';

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

  // reservation id 페이지
  fastify.get("/reservation/:id",
    async (req, reply) => {
      // @ts-ignore
      const { id } = req.params;
      const deviceInfo = await getDeviceById(id);
      const reservationList = await getReservationListBydeviceId(id);

      reply.view("/static/html/reservation.ejs", {
        deviceInfo,
        reservationList
      });
    }
  );

  // login 페이지
  fastify.get("/login",
    async (_, reply) => {
      reply.view("/static/html/login.ejs");
    }
  );

  done();
}

export default pageRoute;
