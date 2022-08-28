import { Media } from '../models/Media';
import { Photographer } from '../models/Photographer';
import { Store } from '../utils/Store';

interface Data {
  photographers: Photographer[];
  medias: Media[];
}

export class DataLoader {
  public async load(): Promise<void> {
    const data: Data = await (await fetch('/data/data.json')).json();

    Object.entries(data).forEach(([key, value]) => Store.set(key, value));
  }
}
