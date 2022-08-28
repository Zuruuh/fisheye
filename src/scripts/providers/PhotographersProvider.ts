import { Provider } from './Provider';
import { Photographer } from '../models/Photographer';

export class PhotographersProvider extends Provider<Photographer> {
  protected getCacheKey() {
    return 'photographers';
  }

  public async load() {
    return (await (
      await fetch('/data/photographers.json')
    ).json()) as Photographer[];
  }
}
