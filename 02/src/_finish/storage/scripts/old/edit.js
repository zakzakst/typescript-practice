/**
 * モジュールの読み込み
 */
import { CommonModel } from "./base.js";
import '../sass/style.scss'


/**
 * 要素の設定
 */
const editBase = {
  elements: {
    form: document.taskForm,
    formTitle: document.taskForm.taskTitle,
    formTitleHelp: document.querySelector('.task-form__title-help'),
    formDescription: document.taskForm.taskDescription,
    formDescriptionHelp: document.querySelector('.task-form__description-help'),
    formAdd: document.querySelector('.task-form__add'),
    formReset: document.querySelector('.task-form__reset'),
  },
  titleRequireNum: 5,
  descriptionRequireNum: 10,
};


/**
 * 状態の設定
 */
const state = {
};


/**
 * MODEL
 */
class EditModel {
  editTask(id) {
    const item = state.storage[id];
    item.title = editBase.elements.formTitle.value;
    item.description = editBase.elements.formDescription.value;
  }
}


/**
 * VIEW
 */
const editView = {
  init(id) {
    const item = state.storage[id];
    editBase.elements.formTitle.value = item.title;
    editBase.elements.formDescription.value = item.description;
  },
  resetForm() {
    editBase.elements.form.reset();
  },
  checkForm() {
    // タイトル必要文字数の判定
    const validTitle = editBase.elements.formTitle.value.length >= editBase.titleRequireNum;
    // 概要必要文字数の判定
    const validDescription = editBase.elements.formDescription.value.length >= editBase.descriptionRequireNum;
    return {validTitle, validDescription};
  },
  showValid(check) {
    if(!check.validTitle) {
      editBase.elements.formTitle.classList.add('is-danger');
      editBase.elements.formTitleHelp.textContent = `${editBase.titleRequireNum}文字以上のタイトル名を入力してください`;
      editBase.elements.formTitleHelp.classList.remove('is-hidden');
    }
    if(!check.validDescription) {
      editBase.elements.formDescription.classList.add('is-danger');
      editBase.elements.formDescriptionHelp.textContent = `${editBase.descriptionRequireNum}文字以上の概要を入力してください`;
      editBase.elements.formDescriptionHelp.classList.remove('is-hidden');
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
  // 2.パラメータをstateに保持
  const params = CommonModel.getParams();
  state.params = params;
  // 3.パラメータに対応した値がストレージにない場合は、index.htmlへリダイレクト
  if(!state.storage[params.id]) {
    window.location.href = './index.html';
  }
  // 4.インスタンスを作成
  state.editIns = new EditModel();
  // 5.パラメータに対応した内容を描画
  editView.init(params.id);

  // ■ 通常のsubmitを無効にする
  editBase.elements.form.addEventListener('submit', e => {
    e.preventDefault();
  });

  // ■ 「更新」ボタンクリック時のイベント
  editBase.elements.formAdd.addEventListener('click', e => {
    // フォームバリデーションの結果を取得
    const check = editView.checkForm();
    if(check.validTitle && check.validDescription) {
      e.preventDefault();
      // 1.フォームの内容でstateを更新
      state.editIns.editTask(state.params.id);
      // 2.タスクの追加をローカルストレージに登録
      CommonModel.setStorage(state.storage);
      // 3.一覧ページへ戻る
      window.location.href = './index.html';
    } else {
      editView.showValid(check);
    }
  });

  // ■ 「リセット」ボタンクリック時のイベント
  editBase.elements.formReset.addEventListener('click', e => {
    e.preventDefault();
    editView.resetForm();
  });

  // ■ フォームタイトル入力時のイベント
  editBase.elements.formTitle.addEventListener('keydown', e => {
    if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
      e.preventDefault();
    }
    if(e.target.value.length >= editBase.titleRequireNum) {
      editView.clearValid(e.target, editBase.elements.formTitleHelp);
    }
  });

  // ■ フォーム概要入力時のイベント
  editBase.elements.formDescription.addEventListener('keydown', e => {
    if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
      e.preventDefault();
    }
    if(e.target.value.length >= editBase.descriptionRequireNum) {
      editView.clearValid(e.target, editBase.elements.formDescriptionHelp);
    }
  });
}


/**
 * 実行
 */
init();
