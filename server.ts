import { Application, Router } from "https://deno.land/x/oak/mod.ts";

import env from "./src/lib/parse-env.ts";
import { registerRoutes } from "./src/api/routes.ts";

const app = new Application();
const router = new Router();

registerRoutes(router);

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: env.PORT });
