import { Provider } from './Provider';
import { Photographer } from '../models/Photographer';
import { PhotographersLoader } from '../loaders/photograph/PhotographersLoader';

export class PhotographersProvider extends Provider<Photographer> {
  protected getCacheKey() {
    return 'photographers';
  }

  public async load() {
    return new PhotographersLoader().load();
  }
}
