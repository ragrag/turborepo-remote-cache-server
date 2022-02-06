import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';

import config from '../../lib/parse-config';

export const authz = (req: FastifyRequest, res: FastifyReply, done: HookHandlerDoneFunction): void => {
  const authHeader = req.headers.authorization;
  const requestApiToken = authHeader?.split('Bearer ')?.[1];
  if (requestApiToken === config.TOKEN) {
    done();
  } else {
    res.status(401).send();
  }
};
