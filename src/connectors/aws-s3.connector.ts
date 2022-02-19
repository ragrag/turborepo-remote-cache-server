import { IArtifactStorage, IArtifactStorageSetParams } from '../lib/interfaces/artifact-storage.interface';
import { S3Client, CreateBucketCommand, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

export class AWSS3Storage implements IArtifactStorage {
  private readonly storageClient: S3Client;
  private readonly bucketName: string;

  constructor({ bucketName, region }: { bucketName: string; region: string }) {
    if (!bucketName || !region) {
      throw new Error('bucket name and region are required for AWS S3');
    }

    this.storageClient = new S3Client({ region });
    this.bucketName = bucketName;

    this.initBucket();
  }

  async initBucket(): Promise<void> {
    const createBucketCommand = new CreateBucketCommand({ Bucket: this.bucketName });
    await this.storageClient.send(createBucketCommand);
  }

  async get(hash: string): Promise<ReadableStream | undefined> {
    const getObjectCommand = new GetObjectCommand({ Bucket: this.bucketName, Key: hash });
    const artifact = await this.storageClient.send(getObjectCommand);

    return artifact.Body as ReadableStream;
  }

  async set({ hash, content }: IArtifactStorageSetParams): Promise<void> {
    const putObjectCommand = new PutObjectCommand({ Bucket: this.bucketName, Key: hash, Body: content });
    await this.storageClient.send(putObjectCommand);
  }
}
