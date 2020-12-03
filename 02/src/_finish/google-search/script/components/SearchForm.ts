import { GoogleSearch } from '../functions/GoogleSearch';

type elements = {
  form: HTMLFormElement;
  input: HTMLInputElement;
  submit: HTMLInputElement;
}

export class SearchForm {
  formEl: HTMLFormElement;
  inputEl: HTMLInputElement;
  submitEl: HTMLInputElement;
  currentQuery: string;
  googleSearch: GoogleSearch;
  constructor(elements: elements, key: string, cx: string) {
    this.formEl = elements.form;
    this.inputEl = elements.input;
    this.submitEl = elements.submit;
    this.currentQuery = '';
    this.googleSearch = new GoogleSearch(key, cx);
  }
  /**
   * 検索実行イベント
   * @param callback データ取得後の処理
   */
  // TODO: 引数をもった関数の型調べる
  searchHandler(callback) {
    this.formEl.addEventListener('submit', async e => {
      // 通常のsubmitイベントを無効にする
      e.preventDefault();
      // 検索テキストを取得
      const inputValue = this.inputEl.value;
      // 検索テキストがない／既に検索済みのテキストの場合は処理を終了
      if (inputValue === '' || inputValue === this.currentQuery) return;
      // 検索クエリを設定
      this.currentQuery = inputValue;
      // データ取得開始
      const result = await this.googleSearch.getResult(this.currentQuery);
      // データ取得後の処理を実行
      callback(result);
    });
  }
}
