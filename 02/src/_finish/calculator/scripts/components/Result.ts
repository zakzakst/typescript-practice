type config = {
  selector: string,
};

export class Result {
  el: HTMLElement;
  constructor(config: config) {
    this.el = document.querySelector(config.selector);
  }
  /**
   * 初期化
   */
  init() {
    this.el.textContent = '0';
  }
  /**
   * 結果に数値をセット
   * @param num 設定する数値
   */
  set(num: string) {
    this.el.textContent = num;
  }
  /**
   * 現在の結果取得
   * @return 現在の結果
   */
  get() {
    return this.el.textContent;
  }
  /**
   * 既存の結果に入力した数値を追加した数値を取得
   * @param num 入力した数値
   * @return 数値を追加した数値
   */
  getNewResult(num: string): string {
    let newNum = this.el.textContent;
    if (newNum === '0' && num !== '.') {
      newNum = num;
    } else {
      if (newNum.indexOf('.') === -1 || num !== '.') {
        newNum += num;
      }
    }
    return newNum;
  }
  /**
   * 既存の結果から引数の文字数を削除した数値を取得
   * @param num 削除する文字数
   * @return 文字を削除した数値
   */
  getDeleteResult(sliceNum: number): string {
    const num = this.el.textContent;
    let newNum;
    if (num.length > 1) {
      newNum = num.slice(0, -1 * sliceNum);
    } else {
      newNum = '0';
    }
    return newNum;
  }
}
