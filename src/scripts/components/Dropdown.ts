import { Observable } from '../utils/Observable';
import { HTMLNodeBuilder } from '../composers/HTMLNodeBuilder';
import { InsertionStrategy } from '../enums/InsertionStrategies';
import { RandomStringGenerator } from '../generators/RandomStringGenerator';
import type { HTMLNode } from '../composers/HTMLNodeBuilder';

type Options<V extends PropertyKey> = Record<V, string | HTMLElement>;

export class Dropdown<
  V extends PropertyKey = PropertyKey
> extends Observable<V> {
  private readonly id: string;
  private expanded: boolean = false;

  public constructor(
    private readonly parent: HTMLElement,
    private readonly options: Options<V>,
    defaultValue: keyof typeof options,
    private readonly labelledBy: string = ''
  ) {
    super(defaultValue);

    this.id = RandomStringGenerator.generate();

    if (Object.keys(options).length < 2) {
      throw new Error('Please provide at least two dropdown options!');
    }

    this.attach();
  }

  public render(): HTMLElement {
    return HTMLNodeBuilder.node({
      tag: 'div',
      attributes: {
        class: `dropdown dropdown-${this.id} ${
          this.expanded ? 'expanded' : ''
        }`,
      },
      children: this.generateOptions(),
    });
  }

  private attach(): void {
    const dropdown = this.render();
    const existingDropdown = this.parent.querySelector(
      `.dropdown.dropdown-${this.id}`
    );

    if (existingDropdown) {
      existingDropdown.replaceWith(dropdown);

      return;
    }

    this.parent.appendChild(dropdown);
  }

  private generateOptions(): HTMLNode[] {
    if (!this.expanded) {
      return [this.generateSelectHeader()];
    }

    const options = { ...this.options };
    delete options[this.current];

    const headerOptionElement = this.generateSelectHeader();

    const optionsElements = Object.entries<string | HTMLElement>(
      options
    ).map<HTMLNode>(([key, value]) => ({
      ...{
        tag: 'button',
        eventListeners: {
          click: () => this.onClick.bind(this)(key as V),
        },
      },
      ...(typeof value === 'string' ? { text: value } : { children: [value] }),
    }));

    return [headerOptionElement, ...optionsElements];
  }

  private generateSelectHeader(): HTMLNode {
    return {
      tag: 'button',
      insertionStrategy: InsertionStrategy.PREPEND,
      attributes: { class: 'selected', 'aria-labelledby': this.labelledBy },
      eventListeners: {
        click: () => this.onClick.bind(this)(this.current as V),
      },
      children: [
        { tag: 'span', text: this.options[this.current] },
        {
          tag: 'i',
          attributes: {
            class: `fas ${this.expanded ? 'fa-chevron-up' : 'fa-chevron-down'}`,
          },
        },
      ],
    } as HTMLNode;
  }

  private onClick(key: keyof Options<V>): void {
    if (this.expanded && this.current !== key) {
      this.next(key);
    }

    this.toggle();
  }

  private toggle(): void {
    this.expanded = !this.expanded;
    this.attach();
  }
}
