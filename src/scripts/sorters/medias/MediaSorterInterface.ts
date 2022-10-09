import type { Media } from '../../models/Media';

export interface MediaSorterInterface {
  sort(medias: Media[]): Media[];
}
