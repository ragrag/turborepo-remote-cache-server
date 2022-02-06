import { Router, helpers } from "../../deps.ts";
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
      const slug = helpers.getQuery(ctx, { mergeParams: true }).slug;

      await StorageInstance.set({ hash, slug, content: artifact });

      response.status = 201;
    })
    // @todo: validate with zod
    .get("/v8/artifacts/:hash", authz, async (ctx) => {
      const { response, params } = ctx;

      const hash = params.hash;
      const slug = helpers.getQuery(ctx, { mergeParams: true }).slug;

      const artifact = await StorageInstance.get(hash, slug);

      response.body = artifact;
      response.status = 200;
    });
};
