import { Store } from '../utils/Store';
import { DataLoader } from '../loaders/DataLoader';

export abstract class Provider<T extends { id: number }> {
  public abstract getCacheKey(): string;

  public async all() {
    await this.ensureCacheIsLoaded();

    return Store.get<T[]>(this.getCacheKey());
  }

  public async get(id: number): Promise<T | null> {
    return (await this.all()).find((entity) => entity.id === id) ?? null;
  }

  protected cacheLoaded(): boolean {
    return Store.has(this.getCacheKey());
  }

  protected async ensureCacheIsLoaded(): Promise<void> {
    if (Store.has(this.getCacheKey())) {
      return;
    }

    await new DataLoader().load();
  }
}
