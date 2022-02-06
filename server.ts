import { Application, Router } from "https://deno.land/x/oak/mod.ts";

import env from "./src/lib/parse-env.ts";
import { initializeRoutes } from "./src/api/routes.ts";

const app = new Application();
const router = new Router();

initializeRoutes(router);

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: env.PORT });
