import { Application, Router } from "https://deno.land/x/oak/mod.ts";

import { validateEnv } from "./src/lib/validate-env.ts";
import { initializeRoutes } from "./src/api/routes.ts";

validateEnv();

const app = new Application();
const router = new Router();

initializeRoutes(router);

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 3000 });
