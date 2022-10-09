import { MediaSorterInterface } from './MediaSorterInterface';
import type { Media } from '../../models/Media';

export class MediaDateSorter implements MediaSorterInterface {
  public sort(medias: Media[]): Media[] {
    return medias.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }
}
