import { Provider } from './Provider';
import { Media } from '../models/Media';
import { Photographer } from '../models/Photographer';

export class MediaProvider extends Provider<Media> {
  public getCacheKey() {
    return 'medias';
  }

  public async getAllMediasForPhotograph(
    photographer: Photographer
  ): Promise<Media[]> {
    return (await this.all()).filter(
      (media) => media.photographerId === photographer.id
    );
  }
}
