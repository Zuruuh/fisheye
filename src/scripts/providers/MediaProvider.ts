import { Provider } from './Provider';
import { Media } from '../models/Media';
import { MediasLoader } from '../loaders/medias/MediasLoader';
import { Photographer } from '../models/Photographer';

export class MediaProvider extends Provider<Media> {
  protected getCacheKey() {
    return 'medias';
  }

  public async load() {
    return new MediasLoader().load();
  }

  public async getAllMediasForPhotograph(
    photographer: Photographer
  ): Promise<Media[]> {
    return (await this.all()).filter(
      (media) => media.photographer === photographer
    );
  }
}
