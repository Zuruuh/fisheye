import type { ImageMedia, Media, VideoMedia } from '../../models/Media';
import { AbstractMediaHTMLFactory } from './AbstractMediaHTMLFactory';
import { ImageMediaHTMLFactory } from './ImageMediaHTMLFactory';
import { VideoMediaHTMLFactory } from './VideoMediaHTMLFactory';

export class MediaFactoryLocator {
  public constructor(
    private readonly media: Media,
    private readonly baseMediaContentPath: string
  ) {}

  public getSupportedFactory(): AbstractMediaHTMLFactory {
    switch (true) {
      case 'video' in this.media:
        return new VideoMediaHTMLFactory(
          this.media as VideoMedia,
          this.baseMediaContentPath
        );
      case 'image' in this.media:
        return new ImageMediaHTMLFactory(
          this.media as ImageMedia,
          this.baseMediaContentPath
        );
      default:
        throw new Error('Invalid media provided!');
    }
  }
}
