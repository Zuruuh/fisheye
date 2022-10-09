import { MediaSorterInterface } from './MediaSorterInterface';
import type { Media } from '../../models/Media';

export class MediaTitleSorter implements MediaSorterInterface {
  public sort(medias: Media[]): Media[] {
    return medias.sort((a, b): number => a.title.localeCompare(b.title));
  }
}
