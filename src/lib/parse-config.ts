import "https://deno.land/x/dotenv/load.ts";

import { cleanEnv, str, num } from "../../deps.ts";
import { StorageType } from "./interfaces/artifact-storage.interface.ts";

const config = {
  ...cleanEnv(Deno.env.toObject(), {
    TOKEN: str(),
    STORAGE_TYPE: str({
      choices: Object.values(StorageType) as string[],
      default: StorageType.Disk,
    }),
    DISK_STORAGE_PATH: str({ default: "./.cache" }),
    GOOGLE_CLOUD_SERVICE_ACCOUNT: str({ default: undefined }),
    PORT: num({ default: 3000 }),
  }),
};

export default config;
