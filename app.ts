import { Application, Router } from "./deps.ts";
import config from "./src/lib/parse-config.ts";
import { registerRoutes } from "./src/api/routes.ts";
import { logger } from "./src/api/middlewares/logger.middleware.ts";

const app = new Application();
const router = new Router();

registerRoutes(router);

app.use(logger);
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: config.PORT });
