export interface IArtifactStorageSetParams {
  hash: string;
  slug?: string;
  content: Buffer;
}

export interface IArtifactStorage {
  get: (hash: string, slug?: string) => Promise<Buffer | ReadableStream | undefined>;
  set: ({ hash, slug, content }: IArtifactStorageSetParams) => Promise<void>;
}

export enum StorageType {
  Disk = 'Disk',
  AWS = 'AWS',
  GCS = 'GCS',
  Azure = 'Azure',
}
