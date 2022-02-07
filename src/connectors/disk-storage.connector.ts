import fsSync from 'fs';
import fs from 'fs/promises';
import path from 'path';

import { IArtifactStorage, IArtifactStorageSetParams } from '../lib/interfaces/artifact-storage.interface';

export class DiskStorage implements IArtifactStorage {
  private readonly cacheDir: string;
  constructor({ cacheDir }: { cacheDir: string }) {
    this.cacheDir = cacheDir;
    if (!fsSync.existsSync(this.cacheDir)) {
      fsSync.mkdirSync(this.cacheDir, { recursive: true });
    }
  }

  async get(hash: string): Promise<Buffer> {
    const artifactPath = path.resolve(path.join(this.cacheDir, hash));
    return fs.readFile(artifactPath);
  }

  async set({ hash, content }: IArtifactStorageSetParams): Promise<void> {
    const cachePath = path.resolve(path.join(this.cacheDir, hash));
    await fs.writeFile(cachePath, content);
  }
}
