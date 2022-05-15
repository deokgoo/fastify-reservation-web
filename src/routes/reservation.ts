import { FastifyInstance } from 'fastify';
import { 
  createReservation,
  getReservationListBydeviceId,
  deleteReservationById,
  deviceReturnById,
} from '../service/resetvationService';

const deviceRoute = (fastify: FastifyInstance, opt: any, done: () => void) => {
  fastify.post('', async (req, reply) => {
    // @ts-ignore
    const { deviceInfoId, name, department, startDate, endDate } = req.body;
    await createReservation({
      deviceInfoId,
      name,
      department,
      startDate,
      endDate
    });

    reply.status(201).send();
  });

  fastify.post('/:deviceInfoId', async (req, reply) => {
    // @ts-ignore
    const { deviceInfoId } = req.params;
    // @ts-ignore
    const { name, department, startDate, endDate } = req.body;
    await createReservation({
      deviceInfoId,
      name,
      department,
      startDate,
      endDate
    });

    reply.status(201).send();
  });

  fastify.get('', async (req, reply) => {
    // @ts-ignore
    const { deviceInfoId } = req.params;
    
    const reservationList = await getReservationListBydeviceId(deviceInfoId);

    reply.send(reservationList);
  });

  fastify.delete(':id', async (req, reply) => {
    // @ts-ignore
    const { id } = req.params;
    
    await deleteReservationById(id);

    reply.status(200).send();
  })

  fastify.post('/return/:deviceInfoId', async (req, reply) => {
    // @ts-ignore
    const { deviceInfoId } = req.params;
    
    try {
      await deviceReturnById(deviceInfoId);
    } catch {
      reply.status(500).send();
    }
    
    reply.status(201).send();
  });

  done();
}

export default deviceRoute;
