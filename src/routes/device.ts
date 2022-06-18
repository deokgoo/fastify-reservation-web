import chalk from 'chalk';
import { FastifyInstance } from 'fastify';
import { 
  createDevice,
  getAllDeviceList,
  getDevicesByName,
  deleteDeviceById,
  updateDevice,
} from '../service/deviceinfoService';

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
    const { no, name, os, os_version, img_url } = req.body;

    console.log(chalk.bgBlue(no, name, os));

    try {
      await createDevice({
        no,
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

  fastify.post('/:id', async (req, reply) => {
    // @ts-ignore
    const { name, os, os_version, img_url } = req.body;
    // @ts-ignore
    const { id } = req.params;

    try {
      await updateDevice({
        id,
        name,
        os,
        os_version,
        img_url,
      });
    } catch(e) {
      console.warn(e);
      reply.status(500).send();
    }

    reply.status(200).send();
  });

  fastify.delete('/:id', async (req, reply) => {
    // @ts-ignore
    const { id } = req.params;
    
    await deleteDeviceById(id);

    reply.status(200).send();
  });

  done();
}

export default deviceRoute;
