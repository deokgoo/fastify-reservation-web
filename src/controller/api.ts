import { FastifyInstance } from 'fastify';

const apiRoutes = (fastify: FastifyInstance, opt: any, done: () => void) => {
  fastify.post('/login', async (req, reply) => {
    const { authorization } = req.headers;
    const encryptedAuth = authorization?.split(' ')[1];

    if(encryptedAuth) {
      const decryptedAuth = Buffer.from(encryptedAuth, 'base64').toString('utf8');
      const [id, pw] = decryptedAuth.split(':');
      
      // TODO: login 하는 로직 연결
      if(id === 'admin' && pw === 'admin') {
        const token = await reply.jwtSign({
          name: 'admin',
          role: ['admin']
        })

        reply
          .code(200)
          .send(token);
      }
    }

    reply
      .code(401)
      .send('unauthorization');
  });

  done();
}

export default apiRoutes;
