import { FastifyInstance } from 'fastify';
import { 
  createDevice,
  getAllDeviceList,
  getDevicesByName,
  deleteDeviceById,
} from '../service/deviceinfoService';
import chalk from 'chalk';

const deviceRoute = (fastify: FastifyInstance, opt: any, done: () => void) => {
  fastify.get('', async (req, reply) => {
    // @ts-ignore
    const { name } = req.query;
    let deviceList;

    if(name) {
      deviceList = await getDevicesByName(name);
    } else {
      deviceList = await getAllDeviceList();
    }

    reply.send(deviceList);
  });

  fastify.post('', async (req, reply) => {
    // @ts-ignore
    const { name, os, os_version, img_url } = req.body;

    try {
      await createDevice({
        name,
        os,
        os_version,
        img_url,
      });
    } catch(e) {
      console.warn(e);
      reply.status(500).send();
    }

    reply.status(201).send();
  });

  fastify.delete(':id', async (req, reply) => {
    // @ts-ignore
    const { id } = req.params;
    
    await deleteDeviceById(id);

    reply.status(200).send();
  });

  done();
}

export default deviceRoute;
