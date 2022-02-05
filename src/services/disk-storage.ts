import {
  IArtifactStorage,
  IArtifactStorageSetParams,
} from "../interfaces/artifact-storage.interface.ts";

export class DiskStorage implements IArtifactStorage {
  get(hash: string, slug: string): Promise<Uint8Array> {
    console.log("SAVING TO LOCAL DISK", hash, slug);
    return null as any;
  }

  async set({ hash, slug, content }: IArtifactStorageSetParams): Promise<void> {
    console.log("AA", hash, slug, content);
    await console.log("QQ");
  }
}
