import { RedisClientType, createClient } from "redis";

import { env } from "../../config";
import { CacheProvider } from "../../application/providers/cache-provider";

export class RedisCacheProviderAdapter implements CacheProvider {
  private readonly redisClient: RedisClientType;
  constructor() {
    this.redisClient = createClient({
      url: env.redis.connectionUrl,
    });
  }

  public async connect() {
    await this.redisClient.connect();
  }

  public async save<T>(key: string, value: T) {
    await this.redisClient.set(key, JSON.stringify(value));
  }

  public async getByKey<T>(key: string) {
    const data = await this.redisClient.get(key);

    if (!data) return null;

    return JSON.parse(data) as T;
  }

  public async invalidate(key: string) {
    await this.redisClient.del(key);
  }
}
