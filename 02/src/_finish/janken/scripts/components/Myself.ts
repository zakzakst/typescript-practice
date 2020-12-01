import { jankenItems } from '../common';

/**
 * 自分側のじゃんけん選択
 * @param selector 選択内容を挿入するHTML要素のクラス名
 */
export class Myself {
  el: HTMLElement;
  constructor(selector: string) {
    this.el = document.querySelector(selector);
  }
  /**
   * 初期表示
   */
  init() {
    let itemsHtml: string = '';
    jankenItems.forEach((item, index) => {
      const itemHtml = `
        <li class="column" data-index="${index}">
          <p class="myself__btn">
            <img class="myself__img" src="./images/${item.id}.png" alt="${item.text}">
          </p>
        </li>
      `;
      itemsHtml += itemHtml;
    });
    this.el.innerHTML = `
      <ul class="myself__btns columns has-text-centered">
        ${itemsHtml}
      </ul>
    `;
  }
  /**
   * じゃんけんの手を選ぶ
   * @param index 表示するじゃんけんの手の番号
   */
  selectItem(index) {
    const btns = this.el.getElementsByTagName('p');
    const btnArray = Array.from(btns);
    btnArray[index].classList.add('is-selected');
  }
  getEl() {
    return this.el;
  }
}
