import { Router, helpers } from "https://deno.land/x/oak/mod.ts";

import { StorageInstance } from "../storage.ts";

export const initializeRoutes = (router: Router) => {
  router
    .put("/v8/artifacts/:hash", async (ctx) => {
      const { request, response, params } = ctx;
      console.log(request.headers);
      const artifactContent = await request.body({ limit: 0 }).value;
      const hash = params.hash;
      const slug = helpers.getQuery(ctx, { mergeParams: true }).slug;
      await StorageInstance.set({ hash, slug, content: artifactContent });
      response.status = 201;
    })
    .get("/v8/artifacts/:hash", ({ request, response, params }) => {
      console.log(params?.hash, request, "HELLI");
      response.body = params.hash;
    });
};
