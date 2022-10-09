import { MediaSortingStrategy } from '../../enums/MediaSortingStrategy';
import type { Media } from '../../models/Media';
import { MediaDateSorter } from './MediaDateSorter';
import { MediaPopularitySorter } from './MediaPopularitySorter';
import type { MediaSorterInterface } from './MediaSorterInterface';
import { MediaTitleSorter } from './MediaTitleSorter';

export class MediaSorter {
  public constructor(private medias: Media[]) {}

  public sort(sorter: MediaSorterInterface): Media[] {
    return sorter.sort(this.medias);
  }

  public static getSorter(
    sortingStrategy: MediaSortingStrategy
  ): MediaSorterInterface {
    const Sorter: new (...args: any[]) => MediaSorterInterface = {
      [MediaSortingStrategy.TRENDING]: MediaPopularitySorter,
      [MediaSortingStrategy.DATE]: MediaDateSorter,
      [MediaSortingStrategy.TITLE]: MediaTitleSorter,
    }[sortingStrategy];

    return new Sorter();
  }
}
