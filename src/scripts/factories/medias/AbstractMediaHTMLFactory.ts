import type { Media } from '../../models/Media';

export abstract class AbstractMediaHTMLFactory<T extends Media = Media> {
  public constructor(
    protected readonly media: T,
    protected readonly basePath: string
  ) {}

  public abstract thumbnail(): HTMLElement;
  public abstract slideshow(): HTMLElement;
}
