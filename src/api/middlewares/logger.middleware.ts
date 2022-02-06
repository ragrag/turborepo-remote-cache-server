import { Context, log } from "../../../deps.ts";

export const logger = async (ctx: Context, next: () => Promise<unknown>) => {
  const t0 = performance.now();
  await next();
  const t1 = performance.now();
  const ms = t1 - t0;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
  log.info(`${ctx.request.method} ${ctx.request.url} - ${ms}ms`);
};
