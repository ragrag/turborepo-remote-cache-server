import { IArtifactStorage, IArtifactStorageSetParams } from '../lib/interfaces/artifact-storage.interface';
import { Storage } from '@google-cloud/storage';

export class GoogleCloudStorage implements IArtifactStorage {
  private readonly storageClient: Storage;
  private readonly bucketName: string;

  constructor({ serviceAccountPath, bucketName }: { serviceAccountPath: string; bucketName: string }) {
    if (!serviceAccountPath || !bucketName) {
      throw new Error('service account path and bucket name are required for Google Cloud Storage');
    }

    this.storageClient = new Storage({ keyFilename: serviceAccountPath });
    this.bucketName = bucketName;

    this.initBucket();
  }

  async initBucket(): Promise<void> {
    const bucket = this.storageClient.bucket(this.bucketName);
    const [bucketExists] = await bucket.exists();

    if (!bucketExists) {
      await this.storageClient.createBucket(this.bucketName);
    }
  }

  async get(hash: string): Promise<Buffer | undefined> {
    const bucket = this.storageClient.bucket(this.bucketName);
    const artifactFile = bucket.file(hash);
    const artifact = await artifactFile.download();

    return artifact[0];
  }

  async set({ hash, content }: IArtifactStorageSetParams): Promise<void> {
    const bucket = this.storageClient.bucket(this.bucketName);
    const artifactFile = bucket.file(hash);
    await artifactFile.save(content);
  }
}
