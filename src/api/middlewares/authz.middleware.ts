import { Context } from "../../../deps.ts";
import env from "../../lib/parse-env.ts";

export const authz = async (ctx: Context, next: () => Promise<unknown>) => {
  const authHeader = ctx.request.headers.get("authorization");
  const requestApiToken = authHeader?.split("Bearer ")?.[1];
  if (requestApiToken === env.TOKEN) {
    await next();
  } else {
    ctx.response.status = 401;
  }
};
