import { Provider } from './Provider';
import { Photographer } from '../models/Photographer';

export class PhotographersProvider extends Provider<Photographer> {
  public getCacheKey() {
    return 'photographers';
  }
}
