import { getJson } from '../functions';

type config = {
  selector: {
    input: HTMLInputElement,
    container: string,
    recommend: string,
  },
  dataUrl: string,
  maxNum: number,
};

export class KeywordForm {
  inputEl: HTMLInputElement;
  containerEl: HTMLElement;
  recommendEl: HTMLElement;
  dataUrl: string;
  maxNum: number;
  data;
  recommendItems;
  // TODO: 配列の型指定方法調べる
  // recommendItems: [];
  constructor(config: config) {
    this.inputEl = config.selector.input;
    this.containerEl = document.querySelector(config.selector.container);
    this.recommendEl = document.querySelector(config.selector.recommend);
    this.dataUrl = config.dataUrl;
    this.maxNum = config.maxNum;
    this.data = null;
    this.recommendItems = [];
  }
  /**
   * データの設定
   * @return データ設定のPromiseオブジェクト
   */
  setData() {
    const promise = new Promise(async resolve => {
      const data = await getJson(this.dataUrl);
      this.data = data;
      resolve(data);
    });
    return promise;
  }
  /**
   * おすすめ項目の設定
   * @param input 入力値
   */
  setRecommendItems(input: string) {
    let newItems = [];
    this.data.forEach(item => {
      if (
        item.text.indexOf(input) !== -1 ||
        item.hiragana.indexOf(input) !== -1
      ) {
        newItems.push(item);
      }
    });
    // TODO: 配列の型指定方法調べる
    this.recommendItems = newItems;
  }
  /**
   * おすすめ項目のクリア
   */
  clearRecommendItems() {
    this.recommendItems = [];
  }
  /**
   * おすすめ項目の表示
   */
  showRecommend() {
    let markup = '';
    this.recommendItems.slice(0, this.maxNum).forEach(item => {
      markup += `
        <a class="search__keyword-item panel-block" data-keyword-text="${item.text}">
          <span class="panel-icon">
            <i class="${item.icon}" aria-hidden="true"></i>
          </span>
          ${item.text}
        </a>
      `;
    });
    this.recommendEl.innerHTML = markup;
    this.recommendEl.classList.remove('is-hidden');
  }
  /**
   * おすすめ項目の非表示
   */
  hideRecommend() {
    this.recommendEl.classList.add('is-hidden');
    this.recommendEl.innerHTML = '';
  }
  /**
   * インプットイベント
   */
  inputHandler() {
    this.inputEl.addEventListener('input', () => {
      if (this.inputEl.value === '') {
        this.hideRecommend();
      } else {
        this.setRecommendItems(this.inputEl.value);
        this.showRecommend();
      }
    });
  }
  /**
   * フォーカスが外れたイベント
   */
  blurHandler() {
    this.inputEl.addEventListener('blur', () => {
      // 検索候補クリック時の挙動を有効にするために実行タイミングを送らせる
      setTimeout(() => {
        this.hideRecommend();
      }, 100);
    })
  }
  /**
   * キーワード選択イベント
   */
  selectHandler() {
    this.recommendEl.addEventListener('click', e => {
      const target = e.target as HTMLElement;
      this.inputEl.value = target.dataset.keywordText;
      this.inputEl.focus();
    });
  }
  /**
   * 初期化
   */
  async init() {
    await this.setData();
    this.inputHandler();
    this.blurHandler();
    this.selectHandler();
  }
}
