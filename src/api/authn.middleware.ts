import "https://deno.land/x/dotenv/load.ts";
import { Context } from "https://deno.land/x/oak/mod.ts";

const API_TOKEN = Deno.env.get("TOKEN");

export const authn = async (ctx: Context, next: () => Promise<unknown>) => {
  const authHeader = ctx.request.headers.get("authorization");
  const requestApiToken = authHeader?.split("Bearer ")?.[1];

  if (requestApiToken === API_TOKEN) {
    await next();
  } else {
    ctx.response.status = 401;
  }
};
