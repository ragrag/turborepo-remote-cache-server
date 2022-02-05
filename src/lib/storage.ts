import "https://deno.land/x/dotenv/load.ts";

import { IArtifactStorage } from "./interfaces/artifact-storage.interface.ts";
import { DiskStorage } from "../services/disk-storage.ts";

export enum StorageType {
  Disk = "Disk",
  AWS = "AWS",
  GCS = "GCS",
  Azure = "Azure",
}

const getStorageInstance = (): IArtifactStorage => {
  const storageType = Deno.env.get("STORAGE_TYPE");

  switch (storageType) {
    case StorageType.Disk:
      return new DiskStorage();
    case StorageType.GCS:
    case StorageType.AWS:
      throw new Error(`Storage type: ${storageType} is not implemented yet`);
    default:
      throw new Error(
        `make sure you set STORAGE_TYPE env variable as one of ${Object.values(
          StorageType
        )}`
      );
  }
};

export const StorageInstance = getStorageInstance();
