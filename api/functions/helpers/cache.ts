type CacheValue<T> = {
  createdAt: number;
  ttl: number;
  value: T;
};

export interface CacheStorage {
  get(key: string): Promise<CacheValue<any> | null>;
  set(key: string, value: CacheValue<any>): Promise<void>;
  delete(key: string): Promise<void>;
}

export class D1CacheStorage implements CacheStorage {
  private db: D1Database;
  private namespace: string;

  constructor(db: D1Database, namespace: string) {
    this.db = db;
    this.namespace = namespace;
  }

  async get(key: string): Promise<CacheValue<any> | null> {
    const result = await this.db
      .prepare(
        "SELECT value, created_at, ttl FROM cache WHERE namespace = ?1 AND key = ?2"
      )
      .bind(this.namespace, key)
      .first();

    if (!result) return null;

    return {
      value: JSON.parse(result.value as string),
      createdAt: result.created_at as number,
      ttl: result.ttl as number,
    };
  }

  async set(key: string, value: CacheValue<any>): Promise<void> {
    await this.db
      .prepare(
        "INSERT OR REPLACE INTO cache (namespace, key, value, created_at, ttl) VALUES (?, ?, ?, ?, ?)"
      )
      .bind(
        this.namespace,
        key,
        JSON.stringify(value.value),
        value.createdAt,
        value.ttl
      )
      .run();
  }

  async delete(key: string): Promise<void> {
    await this.db
      .prepare("DELETE FROM cache WHERE namespace = ?1 AND key = ?2")
      .bind(this.namespace, key)
      .run();
  }
}

export class Cache {
  static async get(storage: D1CacheStorage, key: string) {
    const cachedValue = await storage.get(key);

    if (!cachedValue) {
      return null;
    }

    if (cachedValue.createdAt + cachedValue.ttl < Date.now()) {
      await storage.delete(key);
      return null;
    }

    return cachedValue.value;
  }

  static async set(
    storage: D1CacheStorage,
    key: string,
    value: any,
    ttl: number
  ) {
    return await storage.set(key, {
      createdAt: Date.now(),
      ttl,
      value,
    });
  }

  constructor(private storage: D1CacheStorage) {}

  async fetch<T>(
    key: string,
    ttl: number,
    callback: () => Promise<T>
  ): Promise<T> {
    const cachedValue = await Cache.get(this.storage, key);

    if (cachedValue) {
      return cachedValue;
    }

    const value = await callback();

    if (value) {
      await Cache.set(this.storage, key, value, ttl);
    }

    return value;
  }
}
