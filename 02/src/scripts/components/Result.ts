type resultItem = {
  text: string,
};

const resultItems: resultItem[] = [
  {text: 'かち！'},
  {text: 'まけ。。'},
  {text: 'あいこ'},
];

/**
 * 結果
 */
export class Result {
  el: HTMLElement;
  textEl: HTMLElement;
  constructor(selector: string) {
    this.el = document.querySelector(selector);
    this.textEl = Array.from(this.el.getElementsByTagName('p'))[0];
  }
  /**
   * 結果を表示
   * @param index 表示する結果の番号
   */
  show(index: number) {
    this.textEl.textContent = resultItems[index].text;
    this.el.classList.remove('is-hidden');
  }
  /**
   * 結果を非表示
   */
  hide() {
    this.el.classList.add('is-hidden');
    this.textEl.textContent = '';
  }
}
