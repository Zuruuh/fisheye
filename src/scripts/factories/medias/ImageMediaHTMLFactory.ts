import { HTMLNodeBuilder } from '../../composers/HTMLNodeBuilder';
import { AbstractMediaHTMLFactory } from './AbstractMediaHTMLFactory';
import type { ImageMedia } from '../../models/Media';

export class ImageMediaHTMLFactory extends AbstractMediaHTMLFactory<ImageMedia> {
  public thumbnail(): HTMLElement {
    return HTMLNodeBuilder.node({
      tag: 'article',
      attributes: {
        class: 'photograph-media image',
        'data-id': this.media.id,
      },
      children: [
        {
          tag: 'img',
          attributes: {
            alt: this.media.title,
            class: 'lightbox-trigger',
            src: `${this.basePath}/${this.media.image}`,
            tabindex: 0,
          },
        },
      ],
    });
  }

  public slideshow(): HTMLElement {
    return HTMLNodeBuilder.node({
      tag: 'img',
      attributes: {
        alt: this.media.title,
        src: `${this.basePath}/${this.media.image}`,
        tabindex: 0,
      },
    });
  }
}
