/* eslint-disable @typescript-eslint/no-var-requires */
import 'dotenv/config';

import fastify from 'fastify';
import config from './lib/parse-config';
import { registerRoutes } from './api/routes';

const app = fastify({ logger: true });

app.addContentTypeParser('application/octet-stream', { parseAs: 'buffer', bodyLimit: 209715200 }, function (_, body, done) {
  done(null, body);
});

app.register(require('fastify-multipart'));
app.register(require('fastify-formbody'));
registerRoutes(app);

const init = async () => {
  try {
    await app.listen(config.PORT);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

init();
