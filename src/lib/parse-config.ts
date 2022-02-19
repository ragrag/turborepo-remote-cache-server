import { cleanEnv, str, num } from 'envalid';
import { StorageType } from './interfaces/artifact-storage.interface';

const config = {
  ...cleanEnv(process.env, {
    TOKEN: str(),
    STORAGE_TYPE: str({
      choices: Object.values(StorageType) as string[],
      default: StorageType.Disk,
    }),
    PORT: num({ default: 3000 }),

    DISK_STORAGE_PATH: str({ default: './.cache' }),

    GOOGLE_CLOUD_SERVICE_ACCOUNT: str({ default: undefined }),
    GOOGLE_CLOUD_BUCKET_NAME: str({ default: undefined }),

    AWS_ACCESS_KEY_ID: str({ default: undefined }),
    AWS_SECRET_ACCESS_KEY: str({ default: undefined }),
    AWS_REGION: str({ default: undefined }),
    AWS_BUCKET_NAME: str({ default: undefined }),
  }),
};

export default config;
