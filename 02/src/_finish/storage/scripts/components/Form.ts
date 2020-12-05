import { Tasks } from './Tasks';

type config = {
  selector: {
    form: HTMLFormElement,
    ttlForm: HTMLInputElement,
    ttlHelp: string,
    desForm: HTMLInputElement,
    desHelp: string,
    reset: string,
  },
  ttlNum: number,
  desNum: number,
  storageKey: string,
};

export class Form {
  formEl: HTMLFormElement;
  ttlFormEl: HTMLInputElement;
  ttlHelpEl: HTMLElement;
  desFormEl: HTMLInputElement;
  desHelpEl: HTMLElement;
  resetEl: HTMLElement;
  ttlNum: number;
  desNum: number;
  tasks: Tasks;
  constructor(config: config) {
    this.formEl = config.selector.form;
    this.ttlFormEl = config.selector.ttlForm;
    this.ttlHelpEl = document.querySelector(config.selector.ttlHelp);
    this.desFormEl = config.selector.desForm;
    this.desHelpEl = document.querySelector(config.selector.desHelp);
    this.resetEl = document.querySelector(config.selector.reset);
    this.ttlNum = config.ttlNum;
    this.desNum = config.desNum;
    this.tasks = new Tasks(config.storageKey);
  }
  /**
   * フォームをリセット
   */
  resetForm() {
    this.formEl.reset();
  }
  /**
   * フォームをチェック
   * @return {ttlValid, desValid} タイトルと概要のチェック結果
   */
  checkForm() {
    // タイトル必要文字数の判定
    const ttlValid: boolean = this.ttlFormEl.value.length >= this.ttlNum;
    // 概要必要文字数の判定
    const desValid: boolean = this.desFormEl.value.length >= this.desNum;
    return {ttlValid, desValid};
  }
  /**
   * バリデーションを表示
   * @param check フォームチェックの結果
   */
  showValid(check) {
    if(!check.ttlValid) {
      this.ttlFormEl.classList.add('is-danger');
      this.ttlHelpEl.textContent = `${this.ttlNum}文字以上のタイトル名を入力してください`;
      this.ttlHelpEl.classList.remove('is-hidden');
    }
    if(!check.validDescription) {
      this.desFormEl.classList.add('is-danger');
      this.desHelpEl.textContent = `${this.desNum}文字以上の概要を入力してください`;
      this.desHelpEl.classList.remove('is-hidden');
    }
  }
  /**
   * バリデーションをクリア
   * @param formEl フォーム要素
   * @param helpEl 文言要素
   */
  clearValid(formEl, helpEl) {
    formEl.classList.remove('is-danger');
    helpEl.classList.add('is-hidden');
    helpEl.textContent = '';
  }
  /**
   * サブミットイベント
   */
  submitHandler() {
    // 通常のsubmitを無効にする
    this.formEl.addEventListener('submit', e => {
      e.preventDefault();
    });
  }
  /**
   * リセットイベント
   */
  resetHandler() {
    this.resetEl.addEventListener('click', e => {
      e.preventDefault();
      this.resetForm();
    });
  }
  /**
   * タイトル入力イベント
   */
  ttlInputHandler() {
    this.ttlFormEl.addEventListener('keydown', e => {
      if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
        e.preventDefault();
      }
      if(this.ttlFormEl.value.length >= this.ttlNum) {
        this.clearValid(this.ttlFormEl, this.ttlHelpEl);
      }
    });
  }
  /**
   * 概要入力イベント
   */
  desInputHandler() {
    this.desFormEl.addEventListener('keydown', e => {
      if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
        e.preventDefault();
      }
      if(this.desFormEl.value.length >= this.desNum) {
        this.clearValid(this.desFormEl, this.desHelpEl);
      }
    });
  }
}
