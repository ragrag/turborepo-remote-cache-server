import {
  IArtifactStorage,
  IArtifactStorageSetParams,
} from "../lib/interfaces/artifact-storage.interface.ts";

export class DiskStorage implements IArtifactStorage {
  get(hash: string, slug: string): Promise<Uint8Array> {
    return null as any;
  }

  async set({ hash, slug, content }: IArtifactStorageSetParams): Promise<void> {
    await console.log("QQ");
  }
}
