import { FastifyInstance } from 'fastify';
import { createAuth, getUser } from '../service/authService';

const authRoutes = (fastify: FastifyInstance, opt: any, done: () => void) => {
  fastify.post('/register', async (req, reply) => {
    // @ts-ignore
    const { email, password, name, department } = req.body;
    await createAuth({
      name,
      department,
      email,
      password
    });

    reply.status(201).send();
  })

  fastify.post('/login', async (req, reply) => {
    const { authorization } = req.headers;
    const encryptedAuth = authorization?.split(' ')[1];

    if(encryptedAuth) {
      const decryptedAuth = Buffer.from(encryptedAuth, 'base64').toString('utf8');
      const [email, password] = decryptedAuth.split(':');

      const { name, department } = await getUser({ email, password });

      const accessToken = await reply.jwtSign({
        name,
        department,
        role: ['admin']
      })

      if(!accessToken) {
        reply
            .code(401)
            .send('unauthorization');
      }
      
      reply
          .code(200)
          .send(accessToken);
    }

    reply
      .code(401)
      .send('unauthorization');
  });

  done();
}

export default authRoutes;
