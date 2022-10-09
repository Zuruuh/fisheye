import { Modal } from './Modal';

export class ModalContainer {
  private modals: Modal[] = [];

  private readonly element: HTMLElement;

  private readonly htmlBody: HTMLBodyElement;

  constructor(containerSelector: string) {
    const element = document.querySelector(
      containerSelector
    ) as HTMLElement | null;
    if (!element) {
      throw new Error(
        `Could not find an element in the dom with selector "${containerSelector}"`
      );
    }

    this.element = element;
    this.htmlBody = this.htmlBody = document.body as HTMLBodyElement;
  }

  public updateContainerVisibility(): void {
    if (this.modals.some((modal) => modal.isVisible)) {
      return this.show();
    }

    this.hide();
  }

  public addModal(modal: Modal): void {
    this.modals.push(modal);
  }

  public removeModal(modal: Modal): void {
    this.modals = this.modals.filter((m) => m !== modal);
  }

  public show(): void {
    this.htmlBody.classList.add('scroll-lock');
    this.element.classList.add('shown');
  }

  public hide(): void {
    this.htmlBody.classList.remove('scroll-lock');
    this.element.classList.remove('shown');
  }
}
