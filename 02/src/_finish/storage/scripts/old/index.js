/**
 * モジュールの読み込み
 */
import { CommonModel } from "./base.js";
import '../sass/style.scss'


/**
 * 要素の設定
 */
const indexBase = {
  elements: {
    form: document.taskForm,
    formTitle: document.taskForm.taskTitle,
    formTitleHelp: document.querySelector('.task-form__title-help'),
    formDescription: document.taskForm.taskDescription,
    formDescriptionHelp: document.querySelector('.task-form__description-help'),
    formAdd: document.querySelector('.task-form__add'),
    formReset: document.querySelector('.task-form__reset'),
    taskList: document.querySelector('.task-list'),
    taskItemClass: 'task-list__item',
    taskBtnClass: 'task-list__btn',
  },
  titleRequireNum: 5,
  descriptionRequireNum: 10,
};


/**
 * 状態の設定
 */
const state = {};


/**
 * MODEL
 */
class TasksModel {
  constructor() {
    this.form = indexBase.elements.form;
    this.formTtl = indexBase.elements.formTitle;
    this.formDes = indexBase.elements.formDescription;
  }
  addTask() {
    const itemId = this.getDateStr()
    const task = {
      id: itemId,
      title: this.formTtl.value,
      description: this.formDes.value,
      done: false,
    };
    state.storage[itemId] = task;
    return task;
  }
  removeTask(id) {
    delete state.storage[id];
    CommonModel.setStorage(state.storage);
  }
  doneTask(id) {
    state.storage[id].done = !state.storage[id].done;
    CommonModel.setStorage(state.storage);
  }
  getDateStr() {
    const date = new Date(Date.now());
    const str = Date.parse(date);
    return str;
  }
}


/**
 * VIEW
 */
const taskView = {
  listEl: indexBase.elements.taskList,
  renderTasks() {
    const tasks = Object.values(state.storage);
    tasks.forEach(task => {
      this.addTask(task);
    });
  },
  addTask(task) {
    const markup = `
      <div class="${indexBase.elements.taskItemClass} ${task.done ? 'is-done' : ''} column" id="${task.id}">
        <div class="card">
          <div class="card-content">
            <p class="title is-4">${task.title}</p>
            <p class="">${task.description}</p>
          </div>
          <footer class="card-footer">
            <a href="#" class="${indexBase.elements.taskBtnClass} card-footer-item" data-btn-type="done">${task.done ? '再開' : '完了'}</a>
            <a href="#" class="${indexBase.elements.taskBtnClass} card-footer-item" data-btn-type="edit">編集</a>
            <a href="#" class="${indexBase.elements.taskBtnClass} card-footer-item" data-btn-type="delete">削除</a>
          </footer>
        </div>
      </div>
    `;
    this.listEl.insertAdjacentHTML('beforeend', markup);
  },
  removeTask(id) {
    const targetEl = document.getElementById(id);
    targetEl.parentNode.removeChild(targetEl);
  },
  doneTask(id, btnEl) {
    const targetEl = document.getElementById(id);
    const doneState = targetEl.classList.toggle('is-done');
    if(doneState) {
      btnEl.textContent = '再開';
    } else {
      btnEl.textContent = '完了';
    }
  },
  resetForm() {
    indexBase.elements.form.reset();
  },
  checkForm() {
    // タイトル必要文字数の判定
    const validTitle = indexBase.elements.formTitle.value.length >= indexBase.titleRequireNum;
    // 概要必要文字数の判定
    const validDescription = indexBase.elements.formDescription.value.length >= indexBase.descriptionRequireNum;
    return {validTitle, validDescription};
  },
  showValid(check) {
    if(!check.validTitle) {
      indexBase.elements.formTitle.classList.add('is-danger');
      indexBase.elements.formTitleHelp.textContent = `${indexBase.titleRequireNum}文字以上のタイトル名を入力してください`;
      indexBase.elements.formTitleHelp.classList.remove('is-hidden');
    }
    if(!check.validDescription) {
      indexBase.elements.formDescription.classList.add('is-danger');
      indexBase.elements.formDescriptionHelp.textContent = `${indexBase.descriptionRequireNum}文字以上の概要を入力してください`;
      indexBase.elements.formDescriptionHelp.classList.remove('is-hidden');
    }
  },
  clearValid(formEl, helpEl) {
    formEl.classList.remove('is-danger');
    helpEl.classList.add('is-hidden');
    helpEl.textContent = '';
  }
}


/**
 * CONTROLLER
 */
function init() {
  // ■ 初期化
  // 1.ストレージを変数に設定
  state.storage = CommonModel.getStorage() || {};
  // 2.ストレージの内容を元に登録済のタスクを表示
  taskView.renderTasks();
  // 3.インスタンスの作成
  state.taskIns = new TasksModel();

  // ■ 通常のsubmitを無効にする
  indexBase.elements.form.addEventListener('submit', e => {
    e.preventDefault();
  });

  // ■ 「追加」ボタンクリック時のイベント
  indexBase.elements.formAdd.addEventListener('click', e => {
    // フォームバリデーションの結果を取得
    const check = taskView.checkForm();
    if(check.validTitle && check.validDescription) {
      e.preventDefault();
      // 1.フォームの内容をstateに登録
      const task = state.taskIns.addTask();
      // 2.登録したタスクを描画
      taskView.addTask(task);
      // 3.タスクの追加をローカルストレージに登録
      CommonModel.setStorage(state.storage);
      // 4.フォームをリセット
      taskView.resetForm();
    } else {
      taskView.showValid(check);
    }
  });

  // ■ 「リセット」ボタンクリック時のイベント
  indexBase.elements.formReset.addEventListener('click', e => {
    e.preventDefault();
    taskView.resetForm();
  });

  // ■ カードのボタンをクリックした時のイベント
  indexBase.elements.taskList.addEventListener('click', e => {
    e.preventDefault();
    if(e.target.classList.contains(indexBase.elements.taskBtnClass)) {
      const targetId = e.target.closest(`.${indexBase.elements.taskItemClass}`).id;
      switch (e.target.dataset.btnType) {
        // 「完了」ボタンの場合
        case 'done':
          taskView.doneTask(targetId, e.target);
          state.taskIns.doneTask(targetId);
          break;

        // 「編集」ボタンの場合
        case 'edit':
          window.location.href = `./edit.html?id=${targetId}`;
          break;

        // 「削除」ボタンの場合
        case 'delete':
          const msg = `タスク「${state.storage[targetId].title}」を削除してよろしいですか？`;
          const confirm = window.confirm(msg);
          if(confirm) {
            taskView.removeTask(targetId);
            state.taskIns.removeTask(targetId);
          }
          break;

        default:
          break;
      }
    }
  });

  // ■ フォームタイトル入力時のイベント
  indexBase.elements.formTitle.addEventListener('keydown', e => {
    if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
      e.preventDefault();
    }
    if(e.target.value.length >= indexBase.titleRequireNum) {
      taskView.clearValid(e.target, indexBase.elements.formTitleHelp);
    }
  });

  // ■ フォーム概要入力時のイベント
  indexBase.elements.formDescription.addEventListener('keydown', e => {
    if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
      e.preventDefault();
    }
    if(e.target.value.length >= indexBase.descriptionRequireNum) {
      taskView.clearValid(e.target, indexBase.elements.formDescriptionHelp);
    }
  });
}


/**
 * 実行
 */
init();
