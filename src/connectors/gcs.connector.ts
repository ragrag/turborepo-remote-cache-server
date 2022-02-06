import { IArtifactStorage, IArtifactStorageSetParams } from '../lib/interfaces/artifact-storage.interface';

export class GoogleCloudStorage implements IArtifactStorage {
  async get(hash: string): Promise<Buffer> {
    throw new Error('Not implemented');
  }

  async set({ hash, content }: IArtifactStorageSetParams): Promise<void> {
    throw new Error('Not implemented');
  }
}
