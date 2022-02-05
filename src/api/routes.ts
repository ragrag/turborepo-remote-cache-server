import { Router, helpers } from "https://deno.land/x/oak/mod.ts";

import { StorageInstance } from "../lib/storage.ts";

export const initializeRoutes = (router: Router) => {
  router
    // @todo: req validation
    .put("/v8/artifacts/:hash", async (ctx) => {
      const { request, response, params } = ctx;

      const artifactContent = await request.body({ limit: 0 }).value;
      const hash = params.hash;
      const slug = helpers.getQuery(ctx, { mergeParams: true }).slug;

      await StorageInstance.set({ hash, slug, content: artifactContent });

      response.status = 201;
    })
    // @todo: req validation
    .get("/v8/artifacts/:hash", ({ request, response, params }) => {
      response.body = params.hash;
    });
};
