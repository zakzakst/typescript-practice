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
  /**
   * チェック
   * @param my 自分のじゃんけん選択番号
   * @param op 相手のじゃんけん選択番号
   * @return 勝敗の番号
   */
  checkResult(my: number, op: number): number {
    if((my === 0 && op === 1) || (my === 1 && op === 2) || (my === 2 && op === 0)) {
      // 勝ち
      return 0;
    } else if((my === 0 && op === 2) || (my === 1 && op === 0) || (my === 2 && op === 1)) {
      // 負け
      return 1;
    } else if((my === 0 && op === 0) || (my === 1 && op === 1) || (my === 2 && op === 2)) {
      // あいこ
      return 2;
    } else {
      console.log('error');
    }
  }
}
