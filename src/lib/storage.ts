import config from './parse-config';
import { IArtifactStorage, StorageType } from './interfaces/artifact-storage.interface';
import { DiskStorage } from '../connectors/disk-storage.connector';
import { GoogleCloudStorage } from '../connectors/gcs.connector';
import { AWSS3Storage } from '../connectors/aws-s3.connector';

const getStorageInstance = (): IArtifactStorage => {
  const storageType = config.STORAGE_TYPE;

  switch (storageType) {
    case StorageType.Disk:
      return new DiskStorage({ cacheDir: config.DISK_STORAGE_PATH });
    case StorageType.GCS:
      return new GoogleCloudStorage({ serviceAccountPath: config.GOOGLE_CLOUD_SERVICE_ACCOUNT, bucketName: config.GOOGLE_CLOUD_BUCKET_NAME });
    case StorageType.AWS:
      return new AWSS3Storage({ bucketName: config.AWS_BUCKET_NAME, region: config.AWS_REGION });
    default:
      throw new Error(`make sure you set STORAGE_TYPE env variable as one of ${Object.values(StorageType)}`);
  }
};

export const Storage = getStorageInstance();
