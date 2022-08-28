import { Provider } from './Provider';
import { Media } from '../models/Media';
import { Photographer } from '../models/Photographer';

export class MediaProvider extends Provider<Media> {
  protected getCacheKey() {
    return 'medias';
  }

  public async load() {
    return (await (await fetch('/data/medias.json')).json()) as Media[];
  }

  public async getAllMediasForPhotograph(
    photographer: Photographer
  ): Promise<Media[]> {
    return (await this.all()).filter(
      (media) => media.photographerId === photographer.id
    );
  }
}
