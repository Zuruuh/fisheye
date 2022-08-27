import { Model } from '../models/Model';

export abstract class Provider<T extends Model> {
  protected abstract getCacheKey(): string;
  protected abstract load(): Promise<T[]>;

  public async all() {
    await this.ensureCacheIsLoaded();

    return JSON.parse(String(localStorage.getItem(this.getCacheKey()))) as T[];
  }

  public async get(id: number): Promise<T | null> {
    return (await this.all()).find((entity) => entity.id === id) ?? null;
  }

  protected cacheLoaded(): boolean {
    return Boolean(localStorage.getItem(this.getCacheKey()));
  }

  protected async ensureCacheIsLoaded(): Promise<void> {
    if (localStorage.getItem(this.getCacheKey())) {
      return;
    }

    const data = await this.load();
    localStorage.setItem(this.getCacheKey(), JSON.stringify(data));
  }
}
