import { Store } from '../utils/Store';

export class DataLoader {
  public async load(): Promise<void> {
    const data = await (await fetch('/data/data.json')).json();

    Object.entries(data).forEach(([key, value]) => Store.set(key, value));
  }
}
