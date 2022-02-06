import { FastifyInstance } from 'fastify';
import { authz } from './middlewares/authz.middleware';
import { StorageInstance } from '../lib/storage';

export const registerRoutes = (router: FastifyInstance): void => {
  router
    .get('/healthz', (req, res) => {
      res.status(200).send();
    })
    .put<{ Params: { hash: string }; Body: Buffer }>('/v8/artifacts/:hash', { preHandler: authz }, async (req, res) => {
      await StorageInstance.set({ hash: req.params.hash, content: req.body });
      res.status(200).send();
    })
    .get<{ Params: { hash: string } }>('/v8/artifacts/:hash', { preHandler: authz }, async (req, res) => {
      const artifact = await StorageInstance.get(req.params.hash);
      res.status(200).send(artifact);
    });
};
