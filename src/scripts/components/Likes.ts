import { HTMLNodeBuilder } from '../composers/HTMLNodeBuilder';
import { Media } from '../models/Media';
import { Observable } from '../utils/Observable';

export class Likes {
  private isLiked: boolean = false;

  public constructor(
    private readonly media: Media,
    private readonly likesStore: Observable<number>
  ) {}

  public async toggleLiked(): Promise<void> {
    this.isLiked = !this.isLiked;
    const modifier = this.isLiked ? 1 : -1;

    this.likesStore.next(this.likesStore.current + modifier);
  }

  public getLikesCount(): number {
    return this.media.likes + Number(this.isLiked);
  }

  public onLikeButtonPress(event: MouseEvent): void {
    this.toggleLiked();

    const display = (event.currentTarget as Element).querySelector('span')!;

    display.textContent = String(this.getLikesCount());
  }

  public render(): HTMLElement {
    return HTMLNodeBuilder.node({
      tag: 'div',
      children: [
        {
          tag: 'span',
          text: this.media.title,
        },
        {
          tag: 'button',
          attributes: { class: 'likes-button' },
          eventListeners: { click: this.onLikeButtonPress.bind(this) },
          children: [
            { tag: 'span', text: String(this.getLikesCount()) },
            { tag: 'i', attributes: { class: 'fas fa-heart' } },
          ],
        },
      ],
    });
  }
}
