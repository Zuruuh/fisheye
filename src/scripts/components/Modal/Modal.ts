import { ModalContainer } from './ModalContainer';

export class Modal {
  private readonly element: HTMLElement;

  public readonly container: ModalContainer;

  public constructor(
    modalSelector: string,
    buttonsSelectors: string[],
    modalContainer: ModalContainer
  ) {
    const element = document.querySelector(modalSelector) as HTMLElement | null;
    if (!element) {
      throw new Error(
        `Could not find an element in the dom with selector "${modalSelector}"`
      );
    }
    this.element = element;
    this.container = modalContainer;
    modalContainer.addModal(this);

    const form = this.element.querySelector('form');
    if (form) {
      form.addEventListener('submit', (event: SubmitEvent) => {
        event.preventDefault();

        console.log('Form submitted!', data);
      });
    }

    this.registerListeners(buttonsSelectors);
  }

  public toggleVisibility(): void {
    this.element.classList.toggle('shown');
    const ariaHidden = this.element.attributes.getNamedItem('aria-hidden');

    if (!ariaHidden) {
      throw new Error(
        `An "aria-hidden" attribute should be set on the modal element ${this.element}`
      );
    }

    ariaHidden.value = (ariaHidden.value === 'false').toString();
    if (this.element.classList.contains('shown')) {
      this.element.focus();
    }

    this.container?.updateContainerVisibility();
  }

  public get isVisible(): boolean {
    return this.element.classList.contains('shown');
  }

  private registerListeners = (buttonsSelectors: string[]): void => {
    const globalClosingButtons = buttonsSelectors
      .map((buttonSelector) =>
        Array.from(document.querySelectorAll(buttonSelector))
      )
      .reduce((previous, current) => [...current, ...previous]);

    const innerClosingButtons = Array.from(
      this.element.querySelectorAll('.modal-close-button')
    );

    const buttons = Array.from(
      new Set([...globalClosingButtons, ...innerClosingButtons])
    );

    buttons.forEach((button) =>
      button.addEventListener('click', () => this.toggleVisibility.bind(this)())
    );
  };
}
