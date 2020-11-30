import { jankenItems } from '../common';

/**
 * 相手側のじゃんけん表示
 * @param selector 表示内容を挿入するHTML要素のクラス名
 */
export class Opponent {
  startText: string;
  el: HTMLElement;
  constructor(selector: string) {
    this.startText = 'ボタンを押してね';
    this.el = document.querySelector(selector);
  }
  /**
   * 相手側の表示HTMLを変更
   * @param html 表示するHTML
   */
  changeHtml(html: string) {
    this.el.innerHTML = html;
  }
  /**
   * 初期表示
   */
  init() {
    const markup: string = `<p class="is-size-4">${this.startText}</p>`;
    this.changeHtml(markup);
  }
  /**
   * じゃんけんの手を表示
   * @param index 表示するじゃんけんの手の番号
   */
  show(index: number) {
    const markup = `<img class="opponent__img" src="./images/${jankenItems[index].id}.png" alt="">`;
    this.changeHtml(markup);
  }
}
