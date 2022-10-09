import { MediaSorterInterface } from './MediaSorterInterface';
import type { Media } from '../../models/Media';

export class MediaPopularitySorter implements MediaSorterInterface {
  public sort(medias: Media[]): Media[] {
    return medias.sort((a, b) => b.likes - a.likes);
  }
}
