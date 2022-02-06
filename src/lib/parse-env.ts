import { cleanEnv, str, num } from "../../deps.ts";
import { StorageType } from "./interfaces/artifact-storage.interface.ts";

export default cleanEnv(Deno.env.toObject(), {
  TOKEN: str(),
  STORAGE_TYPE: str({
    choices: Object.values(StorageType) as string[],
    default: StorageType.Disk,
  }),
  PORT: num({ default: 3000 }),
});
