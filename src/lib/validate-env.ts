import "https://deno.land/x/dotenv/load.ts";
import { cleanEnv, str } from "https://deno.land/x/envalid/mod.ts";

import { StorageType } from "./storage.ts";

export const validateEnv = () =>
  cleanEnv(Deno.env.toObject(), {
    TOKEN: str(),
    STORAGE_TYPE: str({
      choices: Object.values(StorageType) as string[],
    }),
  });
