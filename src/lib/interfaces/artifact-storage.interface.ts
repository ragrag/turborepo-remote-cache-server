export interface IArtifactStorageSetParams {
  hash: string;
  slug: string;
  content: Uint8Array;
}

export interface IArtifactStorage {
  get: (hash: string, slug: string) => Promise<Uint8Array>;
  set: ({ hash, slug, content }: IArtifactStorageSetParams) => Promise<void>;
}

export enum StorageType {
  Disk = "Disk",
  AWS = "AWS",
  GCS = "GCS",
  Azure = "Azure",
}
