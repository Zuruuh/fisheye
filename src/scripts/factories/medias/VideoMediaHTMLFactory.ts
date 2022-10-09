import { HTMLNodeBuilder } from '../../composers/HTMLNodeBuilder';
import { AbstractMediaHTMLFactory } from './AbstractMediaHTMLFactory';
import type { VideoMedia } from '../../models/Media';

export class VideoMediaHTMLFactory extends AbstractMediaHTMLFactory<VideoMedia> {
  public thumbnail(): HTMLElement {
    return HTMLNodeBuilder.node({
      tag: 'article',
      attributes: {
        class: 'photograph-media video',
        'data-id': this.media.id,
      },
      children: [
        {
          tag: 'video',
          attributes: {
            class: 'lightbox-trigger',
            disablePictureInPicture: true,
            alt: this.media.title,
            tabindex: 0,
          },
          children: [
            {
              tag: 'source',
              attributes: { src: `${this.basePath}/${this.media.video}` },
            },
          ],
        },
      ],
    });
  }

  public slideshow(): HTMLElement {
    return HTMLNodeBuilder.node({
      tag: 'video',
      attributes: {
        disablePictureInPicture: true,
        alt: this.media.title,
        autoplay: true,
        loop: true,
        tabindex: 0,
      },
      children: [
        {
          tag: 'source',
          attributes: { src: `${this.basePath}/${this.media.video}` },
        },
      ],
    });
  }
}
