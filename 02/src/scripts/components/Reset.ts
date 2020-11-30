/**
 * リセットボタン
 */
export class Reset {
  el: HTMLElement;
  constructor(selector: string) {
    this.el = document.querySelector(selector);
  }
  show() {
    this.el.classList.remove('is-hidden');
  }
  hide() {
    this.el.classList.add('is-hidden');
  }
}
