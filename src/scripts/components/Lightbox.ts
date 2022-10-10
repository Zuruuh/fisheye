import { HTMLNodeBuilder } from '../composers/HTMLNodeBuilder';
import { RandomStringGenerator } from '../generators/RandomStringGenerator';

interface LightboxElement {
  element: HTMLElement;
  label: string;
}

export class Lightbox {
  private readonly id: string;
  private elements: LightboxElement[] = [];
  private shown: boolean = false;
  private lastIndex: number = 0;
  private triggers: HTMLElement[] = [];

  public constructor(
    private index: number,
    private readonly parent: HTMLElement
  ) {
    this.id = RandomStringGenerator.generate();
  }

  public next(): void {
    let index = this.index + 1;
    if (index === this.elements.length) {
      index = 0;
    }

    this.index = index;
    this.attach();
  }

  public previous(): void {
    let index = this.index - 1;
    if (index < 0) {
      index = this.elements.length - 1;
    }

    this.index = index;
    this.attach();
  }

  public to(to: number) {
    if (to >= this.elements.length || to < 0) {
      throw new Error('Index out of range!');
    }

    this.index = to;
    this.attach();
  }

  public render(): HTMLElement {
    const { element, label } = this.elements[this.index];

    return HTMLNodeBuilder.node({
      tag: 'div',
      attributes: {
        id: `lightbox-${this.id}`,
        class: `lightbox lightbox-${this.id}`,
        tabindex: '-1',
      },
      eventListeners: { keydown: this.onKeyDown.bind(this) },
      children: [
        {
          tag: 'span',
          attributes: {
            tabindex: 0,
            class: 'focus-control',
          },
          eventListeners: {
            focus: () =>
              document
                .querySelector<HTMLElement>(`#lightbox-${this.id} .content *`)!
                .focus(),
          },
        },
        {
          tag: 'div',
          attributes: { class: 'controls' },
          children: [
            {
              tag: 'button',
              attributes: {
                class: 'left',
                'aria-label': 'Move to previous element',
              },
              eventListeners: { click: this.previous.bind(this) },
              children: [
                { tag: 'i', attributes: { class: 'fas fa-chevron-left' } },
              ],
            },
            {
              tag: 'button',
              attributes: {
                class: 'right',
                'aria-label': 'Move to next element',
              },
              eventListeners: { click: this.next.bind(this) },
              children: [
                {
                  tag: 'i',
                  attributes: { class: 'fas fa-chevron-right' },
                },
              ],
            },
            {
              tag: 'button',
              attributes: {
                class: 'close',
                'aria-label': 'Close the lightbox',
              },
              eventListeners: { click: this.hide.bind(this) },
              children: [
                {
                  tag: 'i',
                  attributes: { class: 'fas fa-times' },
                },
              ],
            },
          ],
        },
        {
          tag: 'div',
          attributes: { class: 'content' },
          children: [element, { tag: 'span', text: label }],
        },
        {
          tag: 'span',
          attributes: {
            tabindex: 0,
            class: 'focus-control',
          },
          eventListeners: {
            focus: () =>
              document
                .querySelector<HTMLElement>(
                  `#lightbox-${this.id} .controls button.left`
                )!
                .focus(),
          },
        },
      ],
    });
  }

  private attach(): void {
    const existingLightbox = this.parent.querySelector<HTMLElement>(
      `.lightbox.lightbox-${this.id}`
    );

    if (this.shown) {
      let lightbox = this.render();

      if (existingLightbox) {
        existingLightbox.replaceWith(lightbox);
        lightbox = existingLightbox;
      } else {
        this.parent.appendChild(lightbox);
      }

      lightbox.focus();
    } else {
      if (existingLightbox) {
        existingLightbox.remove();
      }
    }
  }

  private onKeyDown(e: KeyboardEvent): void {
    switch (e.key) {
      case 'ArrowLeft':
        this.previous();
        break;
      case 'ArrowRight':
        this.next();
        break;
      case 'Escape':
        this.hide();
        break;
    }
  }

  public show(): void {
    this.shown = true;
    this.lastIndex = this.index;
    window.scrollTo(0, 0);
    document.body.classList.add('scroll-lock');

    this.attach();
  }

  public hide(): void {
    this.shown = false;
    document.body.classList.remove('scroll-lock');
    this.triggers[this.lastIndex]!.focus();

    this.attach();
  }

  public add(element: HTMLElement, label: string): void {
    this.elements.push({ element, label });
  }

  public addTrigger(element: HTMLElement, index: number): void {
    this.triggers[index] = element;

    const callback = () => {
      this.to(index);
      this.show();
    };

    element.addEventListener('click', callback.bind(this));
    element.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        callback.bind(this)();
      }
    });
  }
}
