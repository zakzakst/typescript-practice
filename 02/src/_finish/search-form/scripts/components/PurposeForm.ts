import { getJson } from '../functions';

type config = {
  selector: {
    input: HTMLInputElement,
    select: string,
    close: string,
    list: string,
    breadcrumb: string,
  },
  dataUrl: string,
};

type buffer = {
  category: string,
  genre: string,
  purpose: string,
}

export class PurposeForm {
  inputEl: HTMLInputElement;
  selectEl: HTMLElement;
  // TODO: querySelectorAllで取得する内容の型調べる
  closeEl;
  listEl: HTMLElement;
  breadcrumbEl: HTMLElement;
  dataUrl: string;
  data;
  catSelect: string;
  genSelect: string;
  purSelect: string;
  buffer: buffer;
  constructor(config: config) {
    this.inputEl = config.selector.input;
    this.selectEl = document.querySelector(config.selector.select);
    this.closeEl = document.querySelectorAll(config.selector.close);
    this.listEl = document.querySelector(config.selector.list);
    this.breadcrumbEl = document.querySelector(config.selector.breadcrumb);
    this.dataUrl = config.dataUrl;
    this.data = null;
    this.catSelect = '';
    this.genSelect = '';
    this.purSelect = '';
    this.buffer = {
      category: '',
      genre: '',
      purpose: '',
    };
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
   * 選択データを一時保存
   */
  setBuffer() {
    this.buffer = {
      category: this.catSelect,
      genre: this.genSelect,
      purpose: this.purSelect,
    };
  }
  /**
   * 一時保存している選択データを保存
   */
  saveBuffer() {
    this.catSelect = this.buffer.category;
    this.genSelect = this.buffer.genre;
    this.purSelect = this.buffer.purpose;
    this.buffer = null;
  }
  /**
   * 選択モーダルを開く
   */
  open() {
    // 現在の選択状態をバッファを取って初期化
    this.setBuffer();
    this.catSelect = '';
    this.genSelect = '';
    this.purSelect = '';
    // 選択モーダルを表示
    this.showCategory();
    this.selectEl.classList.add('is-active');
  }
  /**
   * 選択モーダルを閉じる
   */
  close() {
    this.selectEl.classList.remove('is-active');
  }
  /**
   * 選択項目を設定
   */
  setList(type: string, keys) {
    let markup = '';
    keys.forEach(key => {
      const item = this.data[type][key];
      markup += `
        <li>
          <a class="panel-block" data-item-type="${type}" data-item-id="${item.id}">${item.text}</a>
        </li>
      `;
    });
    this.listEl.innerHTML = markup;
  }
  /**
   * パンくずの表示
   */
  showBreadCrumbs(type: string) {
    // パンくず先頭要素の生成
    const bcIndexEl = document.createElement('li');
    bcIndexEl.innerHTML = `<a data-bc-type="index">目的</a>`;
    // パンくず「category」要素の生成
    const bcCategoryText = this.data['categories'][this.catSelect] || '';
    const bcCategoryEl = document.createElement('li');
    bcCategoryEl.innerHTML = `<a data-bc-type="category">${bcCategoryText.text}</a>`;
    // パンくず「genre」要素の生成
    const bcGenreText = this.data['genres'][this.genSelect] || '';
    const bcGenreEl = document.createElement('li');
    bcGenreEl.innerHTML = `<a data-bc-type="genre">${bcGenreText.text}</a>`;

    // 一度パンくずを空にする
    this.breadcrumbEl.innerHTML = '';
    switch (type) {
      case 'init':
        this.breadcrumbEl.appendChild(bcIndexEl);
        bcIndexEl.classList.add('is-active');
        break;
      case 'category':
        this.breadcrumbEl.appendChild(bcIndexEl);
        this.breadcrumbEl.appendChild(bcCategoryEl);
        bcCategoryEl.classList.add('is-active');
        break;
      case 'genre':
        this.breadcrumbEl.appendChild(bcIndexEl);
        this.breadcrumbEl.appendChild(bcCategoryEl);
        this.breadcrumbEl.appendChild(bcGenreEl);
        bcGenreEl.classList.add('is-active');
        break;

      default:
        break;
    }
  }
  /**
   * カテゴリー選択を表示
   */
  showCategory() {
    this.setList('categories', Object.keys(this.data['categories']));
    this.showBreadCrumbs('init');
  }
  /**
   * ジャンル選択を表示
   */
  showGenre() {
    this.setList('genres', this.data['categories'][this.catSelect].genres);
    this.showBreadCrumbs('category');
  }
  /**
   * 目的選択を表示
   */
  showPurpose() {
    this.setList('purposes', this.data['genres'][this.genSelect].purposes);
    this.showBreadCrumbs('genre');
  }
  /**
   * 選択内容を入力欄に反映
   */
  input() {
    const catText = this.data['categories'][this.catSelect].text;
    const genText = this.data['genres'][this.genSelect].text;
    const purText = this.data['purposes'][this.purSelect].text;
    // テキストを入力
    this.inputEl.value = `${catText} ／ ${genText} ／ ${purText}`;
    // 選択モーダルを閉じる
    this.close();
  }
  /**
   * 選択モーダルを開くイベント
   */
  openHandler() {
    this.inputEl.addEventListener('focus', this.open.bind(this));
  }
  /**
   * 選択モーダルを閉じるイベント
   */
  closeHandler() {
    [...this.closeEl].forEach(el => {
      el.addEventListener('click', () => {
        this.saveBuffer();
        this.close();
      });
    });
  }
  /**
   * 項目の選択イベント
   */
  selectHandler() {
    this.listEl.addEventListener('click', e => {
      const target = e.target as HTMLElement;
      switch (target.dataset.itemType) {
        case 'categories':
          this.catSelect = target.dataset.itemId;
          this.showGenre();
          break;
        case 'genres':
          this.genSelect = target.dataset.itemId;
          this.showPurpose();
          break;
        case 'purposes':
          this.purSelect = target.dataset.itemId;
          this.input();
          break;
        default:
          break;
      }
    });
  }
  /**
   * パンくず選択イベント
   */
  breadcrumbHandler() {
    this.breadcrumbEl.addEventListener('click', e => {
      const target = e.target as HTMLElement;
      switch (target.dataset.bcType) {
        case 'index':
          this.showCategory();
          break;
        case 'category':
          this.showGenre();
          break;
        default:
          break;
      }
    });
  }
  /**
   * 初期化
   */
  async init() {
    await this.setData();
    this.openHandler();
    this.closeHandler();
    this.selectHandler();
    this.breadcrumbHandler();
  }
}
