export class HTMLElementTreeBuilder {
  public constructor(private readonly parent: HTMLElement | null = null) {}

  public node(
    tag: keyof HTMLElementTagNameMap,
    attributes: Record<string, string | boolean | number> = {},
    eventListeners: {
      [T in keyof HTMLElementEventMap]?: (
        event: HTMLElementEventMap[T]
      ) => any | Promise<any>;
    } = {},
    childrenCallback: (factory: HTMLElementTreeBuilder) => any = () => null
  ): HTMLElement {
    const element = document.createElement(tag);

    Object.entries(attributes).forEach(([attribute, value]) =>
      element.setAttribute(attribute, String(value))
    );

    Object.entries(eventListeners).forEach(([event, value]) =>
      // @ts-ignore
      element.addEventListener(event, value)
    );

    childrenCallback(new HTMLElementTreeBuilder(element));

    if (this.parent) {
      this.parent.appendChild(element);
    }

    return element;
  }

  public baseNode(
    tag: keyof HTMLElementTagNameMap,
    childrenCallback: (factory: HTMLElementTreeBuilder) => any = () => null
  ): HTMLElement {
    return this.node(tag, {}, {}, childrenCallback);
  }

  public textNode(
    tag: keyof HTMLElementTagNameMap,
    text: string,
    attributes: Record<string, string | boolean | number> = {}
  ): HTMLElement {
    return this.node(tag, attributes, {}, (factory) => factory.text(text));
  }

  public text(text: string): void {
    if (!this.parent) {
      throw new Error('Cannot create text content if node was not created yet');
    }

    this.parent.textContent = text;
  }
}
