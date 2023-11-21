export interface CacheProvider {
  connect: () => Promise<void>;
  save: <T>(key: string, value: T) => Promise<void>;
  getByKey: <T>(key: string) => Promise<T | null>;
  invalidate: (key: string) => Promise<void>;
}
