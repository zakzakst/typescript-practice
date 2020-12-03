import { Cookie } from '../functions/Cookie';

type elements = {
  form: HTMLFormElement,
  text1: HTMLInputElement,
  text2: HTMLInputElement,
  select1: HTMLSelectElement,
  textarea1: HTMLTextAreaElement,
  checkbox1: HTMLInputElement,
  checkbox2: HTMLInputElement,
  radio1: HTMLInputElement,
  radio2: HTMLInputElement,
  save: HTMLElement,
  clear: HTMLElement,
}

type formValues = {
  text1: string,
  text2: string,
  select1: string,
  textarea1: string,
  checkbox1: string,
  checkbox2: string,
  radio1: string,
  radio2: string,
}

export class MyForm {
  cookieFunc: Cookie;
  cookie: formValues;
  elements: elements;
  constructor(elements: elements) {
    this.cookieFunc = new Cookie;
    this.cookie = null;
    this.elements = elements;
  }
  /**
   * クッキーの初期化
   */
  initCookie() {
    // TODO: 共通関数から返ってくる値の型指定方法調べる
    this.cookie = this.cookieFunc.read();
  }
  /**
   * 画面の初期化
   */
  initView() {
    this.elements.text1.value = this.cookie.text1 || '';
    this.elements.text2.value = this.cookie.text2 || '';
    this.elements.select1.value = this.cookie.select1 || '';
    this.elements.textarea1.value = this.cookie.textarea1 || '';
    this.elements.checkbox1.checked = this.cookie.checkbox1 === 'true' ? true : false;
    this.elements.checkbox2.checked = this.cookie.checkbox2 === 'true' ? true : false;
    this.elements.radio1.value = this.cookie.radio1 || '';
    this.elements.radio2.value = this.cookie.radio2 || '';
  }
  /**
   * フォームの入力値取得
   * @return フォームの入力値
   */
  getFormValues(): formValues {
    const formValues = {
      text1: this.elements.text1.value || '',
      text2: this.elements.text2.value || '',
      select1: this.elements.select1.value || '',
      textarea1: this.elements.textarea1.value || '',
      checkbox1: this.elements.checkbox1.checked.toString() || 'false',
      checkbox2: this.elements.checkbox2.checked.toString() || 'false',
      radio1: this.elements.radio1.value || '',
      radio2: this.elements.radio2.value || '',
    }
    console.log(formValues);
    return formValues;
  }
  /**
   * デフォルトのsubmitの無効化
   */
  submitHandler() {
    this.elements.form.addEventListener('submit', e => {
      e.preventDefault();
    });
  }
  /**
   * 保存ボタンのイベント
   */
  saveHandler() {
    this.elements.save.addEventListener('click', e => {
      e.preventDefault();
      const cookieObj = this.getFormValues();
      this.cookieFunc.save(cookieObj);
    });
  }
  /**
   * クリアボタンのイベント
   */
  clearHandler() {
    this.elements.clear.addEventListener('click', e => {
      e.preventDefault();
      const cookieObj = this.getFormValues();
      this.cookieFunc.clear(cookieObj);
    });
  }
  /**
   * 初期化
   */
  init() {
    this.initCookie();
    this.initView();
    this.submitHandler();
    this.saveHandler();
    this.clearHandler();
  }
}
