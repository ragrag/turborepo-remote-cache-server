import { Router } from "../../deps.ts";
import { authz } from "./middlewares/authz.middleware.ts";
import { StorageInstance } from "../lib/storage.ts";

export const registerRoutes = (router: Router) => {
  router
    .get("/healthz", ({ response }) => {
      response.status = 200;
    })
    // @todo: validate with zod
    .put("/v8/artifacts/:hash", authz, async (ctx) => {
      const { request, response, params } = ctx;

      const artifact = await request.body({ limit: 0 }).value;
      const hash = params.hash;

      await StorageInstance.set({ hash, content: artifact });

      response.status = 201;
    })
    // @todo: validate with zod
    .get("/v8/artifacts/:hash", authz, async (ctx) => {
      const { response, params } = ctx;

      const hash = params.hash;

      const artifact = await StorageInstance.get(hash);

      response.body = artifact;
      response.status = 200;
    });
};
