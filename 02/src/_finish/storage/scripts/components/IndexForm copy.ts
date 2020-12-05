import { Tasks } from './Tasks';

type config = {
  selector: {
    form: HTMLFormElement,
    ttlForm: HTMLInputElement,
    ttlHelp: string,
    desForm: HTMLInputElement,
    desHelp: string,
    add: string,
    reset: string,
    list: string,
  },
  class: {
    item: string,
    btn: string,
  },
  ttlNum: number,
  desNum: number,
  storageKey: string,
}

export class IndexForm {
  formEl: HTMLFormElement;
  ttlFormEl: HTMLInputElement;
  ttlHelpEl: HTMLElement;
  desFormEl: HTMLInputElement;
  desHelpEl: HTMLElement;
  addEl: HTMLElement;
  resetEl: HTMLElement;
  listEl: HTMLElement;
  itemClass: string;
  btnClass: string;
  ttlNum: number;
  desNum: number;
  tasks: Tasks;
  constructor(config: config) {
    this.formEl = config.selector.form;
    this.ttlFormEl = config.selector.ttlForm;
    this.ttlHelpEl = document.querySelector(config.selector.ttlHelp);
    this.desFormEl = config.selector.desForm;
    this.desHelpEl = document.querySelector(config.selector.desHelp);
    this.addEl = document.querySelector(config.selector.add);
    this.resetEl = document.querySelector(config.selector.reset);
    this.listEl = document.querySelector(config.selector.list);
    this.itemClass = config.class.item;
    this.btnClass = config.class.btn;
    this.ttlNum = config.ttlNum;
    this.desNum = config.desNum;
    this.tasks = new Tasks(config.storageKey);
  }
  /**
   * 全タスクを表示
   */
  showTaskAll() {
    const tasks = this.tasks.getTaskAll();
    // タスクが登録されていない場合は処理を終了
    if (!tasks) return;
    Object.values(tasks).forEach(task => {
      this.addTask(task);
    });
  }
  /**
   * 追加タスクを表示
   * @param task タスクデータ
   */
  addTask(task) {
    const markup = `
      <div class="${this.itemClass} ${task.done ? 'is-done' : ''} column" id="${task.id}">
        <div class="card">
          <div class="card-content">
            <p class="title is-4">${task.title}</p>
            <p class="">${task.description}</p>
          </div>
          <footer class="card-footer">
            <a href="#" class="${this.btnClass} card-footer-item" data-btn-type="done">${task.done ? '再開' : '完了'}</a>
            <a href="#" class="${this.btnClass} card-footer-item" data-btn-type="edit">編集</a>
            <a href="#" class="${this.btnClass} card-footer-item" data-btn-type="delete">削除</a>
          </footer>
        </div>
      </div>
    `;
    this.listEl.insertAdjacentHTML('beforeend', markup);
  }
  /**
   * 表示タスクを削除
   * @param id タスクID
   */
  removeTask(id: string) {
    const targetEl = document.getElementById(id);
    targetEl.parentNode.removeChild(targetEl);
  }
  /**
   * 完了ステータスを変更
   * @param id タスクID
   * @param btnEl ボタン要素
   */
  updateDone(id: string, btnEl: HTMLElement) {
    const target = document.getElementById(id);
    const doneState = target.classList.toggle('is-done');
    if (doneState) {
      btnEl.textContent = '再開';
    } else {
      btnEl.textContent = '完了';
    }
  }
  /**
   * フォームをリセット
   */
  resetForm() {
    this.formEl.reset();
  }
  /**
   * 追加イベント
   */
  addHandler() {
    this.addEl.addEventListener('click', e => {
      e.preventDefault();
      // 追加するタスクのオブジェクト作成
      const date = Date.now().toString();
      const task = {
        id: date,
        title: this.ttlFormEl.value,
        description: this.desFormEl.value,
        done: false,
      };
      // 追加タスクを表示
      this.addTask(task);
      // ストレージにタスクを追加
      this.tasks.addTask(task);
      // フォームをリセット
      this.resetForm();
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
   * タスク操作イベント
   */
  listHandler() {
    this.listEl.addEventListener('click', e => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      // クリックした要素がボタンでない場合は処理を終了
      if (!target.classList.contains(this.btnClass)) return;
      // 対象タスクのIDを取得
      const taskId = target.closest(`.${this.itemClass}`).id;
      // ボタンの種類に対応した処理を実行
      switch (target.dataset.btnType) {
        // 「完了」ボタンの場合
        case 'done':
          this.updateDone(taskId, target);
          this.tasks.updateDone(taskId);
          break;

        // 「編集」ボタンの場合
        case 'edit':
          window.location.href = `./edit.html?id=${taskId}`;
          break;

        // 「削除」ボタンの場合
        case 'delete':
          const msg = `タスク「${this.tasks.getTaskAll()[taskId].title}」を削除してよろしいですか？`;
          const confirm = window.confirm(msg);
          if(confirm) {
            this.removeTask(taskId);
            this.tasks.removeTask(taskId);
          }
          break;

        default:
          break;
      }
    });
  }
  /**
   * 初期化
   */
  init() {
    // ストレージからタスクを読み込み
    this.tasks.getStorageTasks();
    // 全タスクの表示
    this.showTaskAll();
    // イベントの登録
    this.addHandler();
    this.resetHandler();
    this.listHandler();
  }
}
