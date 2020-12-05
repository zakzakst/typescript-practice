type content = {
  id: string,
  text: string,
};

type selector = {
  tab: string,
  content: string,
};

export class Tabs {
  tabEl: HTMLElement;
  contentEl: HTMLElement;
  contentsList: content[];
  currentContent: number;
  constructor(selector: selector, contentsList: content[]) {
    this.tabEl = document.querySelector(selector.tab);
    this.contentEl = document.querySelector(selector.content);
    this.contentsList = contentsList;
    this.currentContent = 0;
  }
  /**
   * 表示タブの変更
   * @param index 表示するタブ番号
   */
  tabChange(index: number) {
    // 全てのタブの「is-active」クラスを削除
    Array.from(this.tabEl.children).forEach(item => {
      item.classList.remove('is-active');
    });
    // 引数番目のタブに「is-active」クラスを付与
    this.tabEl.children[index].classList.add('is-active');
  }
  /**
   * 表示コンテンツの変更
   * @param index 表示するコンテンツ番号
   */
  contentChange(index: number) {
    // 全てのタブの「is-hidden」クラスを付与
    Array.from(this.contentEl.children).forEach(item => {
      item.classList.add('is-hidden');
    });
    // 引数番目のタブに「is-active」クラスを削除
    this.contentEl.children[index].classList.remove('is-hidden');
  }
  /**
   * 表示タブの変更イベント
   * @return クリックされたタブの番号
   */
  changeHandler() {
    this.tabEl.addEventListener('click', e => {
      const target = e.target as HTMLElement;
      // クリックされたタブのindexを取得
      const tabItems = this.tabEl.getElementsByTagName('li');
      const itemIndex: number = Array.from(tabItems).indexOf(target.closest('li'));
      // 取得したindexに応じた内容を表示
      this.tabChange(itemIndex);
      this.contentChange(itemIndex);
    });
  }
  initVew() {
    // タブを挿入
    let markup = '';
    this.contentsList.forEach(content => {
      markup += `
        <li><a>${content.text}</a></li>
      `;
    });
    this.tabEl.innerHTML = markup;
    // 「currentContent」のタブを表示
    this.tabChange(this.currentContent);
    // 「currentContent」のコンテンツを表示
    this.contentChange(this.currentContent);
  }
  init() {
    this.initVew();
    this.changeHandler();
  }
}
