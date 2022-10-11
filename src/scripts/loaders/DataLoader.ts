import { Store } from '../utils/Store';

export class DataLoader {
  public async load(): Promise<void> {
    const data = import.meta.env.DEV
      ? await (await fetch('/data/data.json')).json()
      : await (await fetch('./data/data.json')).json();

    Object.entries(data).forEach(([key, value]) => Store.set(key, value));
  }
}
