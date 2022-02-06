import { Context } from "../../../deps.ts";
import config from "../../lib/parse-config.ts";

export const authz = async (ctx: Context, next: () => Promise<unknown>) => {
  const authHeader = ctx.request.headers.get("authorization");
  const requestApiToken = authHeader?.split("Bearer ")?.[1];
  if (requestApiToken === config.TOKEN) {
    await next();
  } else {
    ctx.response.status = 401;
  }
};
