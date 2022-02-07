import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

export const errorHandler = (error: FastifyError, req: FastifyRequest, res: FastifyReply): void => {
  res.status(404).send();
};
