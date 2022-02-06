import { cleanEnv, str, num } from 'envalid';
import { StorageType } from './interfaces/artifact-storage.interface';

const config = {
  ...cleanEnv(process.env, {
    TOKEN: str(),
    STORAGE_TYPE: str({
      choices: Object.values(StorageType) as string[],
      default: StorageType.Disk,
    }),
    DISK_STORAGE_PATH: str({ default: './.cache' }),
    GOOGLE_CLOUD_SERVICE_ACCOUNT: str({ default: undefined }),
    PORT: num({ default: 3000 }),
  }),
};

export default config;
