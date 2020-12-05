import { Form } from './Form';
import { Params } from '../functions';

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

type editConfig = {
  selector: {
    update: string,
  }
}

export class EditForm extends Form {
  updateEl: HTMLElement;
  id: string;
  constructor(config: config, editConfig: editConfig) {
    super(config);
    this.updateEl = document.querySelector(editConfig.selector.update);
    this.id = '';
  }
  /**
   * 編集タスクを表示
   * @param id タスクID
   */
  showTask(id: string) {
    const task = this.tasks.getTaskAll()[id];
    this.ttlFormEl.value = task.title;
    this.desFormEl.value = task.description;
  }
  /**
   * タスクを更新
   */
  updateTask() {
    this.tasks.updateTask(
      this.id,
      this.ttlFormEl.value,
      this.desFormEl.value
    );
  }
  /**
   * 更新イベント
   */
  updateHandler() {
    this.updateEl.addEventListener('click', e => {
      e.preventDefault();
      // フォームバリデーションの結果を取得
      const check = this.checkForm();
      if (check.ttlValid && check.desValid) {
        // タスクの更新をローカルストレージに登録
        this.updateTask();
        // 一覧ページへ戻る
        window.location.href = '/index.html';
      } else {
        this.showValid(check);
      }
    });
  }
  /**
   * 初期化
   */
  init() {
    // ストレージからタスクを読み込み
    this.tasks.getStorageTasks();
    // URLのパラメータを取得
    const params = new Params();
    this.id = params.get().id;
    // パラメータに対応した値がストレージにない場合は、index.htmlへリダイレクト
    if (!this.tasks.getTaskAll()[this.id]) {
      window.location.href = '/index.html';
    }
    // パラメータに対応した内容を描画
    this.showTask(this.id);
    // イベントの登録
    this.updateHandler();
    this.resetHandler();
    this.ttlInputHandler();
    this.desInputHandler();
    this.submitHandler();
  }
}
