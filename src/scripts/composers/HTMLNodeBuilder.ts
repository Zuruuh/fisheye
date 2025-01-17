import { InsertionStrategy } from '../enums/InsertionStrategies';

export type HTMLNode<HasParent extends boolean = true> = (HasParent extends true
  ? { insertionStrategy?: InsertionStrategy }
  : {}) & {
  tag: keyof HTMLElementTagNameMap;
  attributes?: Record<string, string | boolean | number>;
  eventListeners?: {
    [T in keyof HTMLElementEventMap]?: (
      event: HTMLElementEventMap[T] | never
    ) => any | Promise<any>;
  };
  text?: string;
  children?: (HTMLNode | HTMLElement)[];
};

type InsertionOperation = 'append' | 'prepend';

export class HTMLNodeBuilder {
  public static node(
    node: HTMLNode<typeof parent extends null ? false : true>,
    parent: HTMLElement | null = null
  ): HTMLElement {
    const element = document.createElement(node.tag);

    Object.entries(node.attributes ?? {}).forEach(([attribute, value]) =>
      element.setAttribute(attribute, String(value))
    );

    Object.entries(node.eventListeners ?? {}).forEach(([event, callback]) =>
      // @ts-ignore
      element.addEventListener(event, callback)
    );

    if (node.text) {
      element.textContent = node.text;
    }

    (node.children ?? []).forEach((child) =>
      element.appendChild(
        child instanceof HTMLElement ? child : HTMLNodeBuilder.node(child)
      )
    );

    if (parent) {
      const method: InsertionOperation = (
        {
          [InsertionStrategy.APPEND]: 'append',
          [InsertionStrategy.PREPEND]: 'prepend',
        } as Record<InsertionStrategy, InsertionOperation>
      )[node.insertionStrategy ?? InsertionStrategy.APPEND];

      parent[method](element);
    }

    return element;
  }
}
