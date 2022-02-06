// deno-lint-ignore-file require-await
import { path, fs } from "../../deps.ts";

import {
  IArtifactStorage,
  IArtifactStorageSetParams,
} from "../lib/interfaces/artifact-storage.interface.ts";
import config from "../lib/parse-config.ts";

export class DiskStorage implements IArtifactStorage {
  private readonly cacheDir = config.DISK_STORAGE_PATH;
  constructor() {
    fs.ensureDirSync(this.cacheDir);
  }

  async get(hash: string): Promise<Uint8Array> {
    const cachePath = path.resolve(path.join(this.cacheDir, hash));
    return Deno.readFile(cachePath);
  }

  async set({ hash, content }: IArtifactStorageSetParams): Promise<void> {
    const cachePath = path.resolve(path.join(this.cacheDir, hash));
    await Deno.writeFile(cachePath, content);
  }
}
