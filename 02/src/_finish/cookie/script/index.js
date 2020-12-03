/**
 * 要素の設定
 */
const base = {
  elements: {
    form: document.myForm,
    text1: document.myForm.text1,
    text2: document.myForm.text2,
    select1: document.myForm.selectbox1,
    textarea1: document.myForm.textarea1,
    checkbox1: document.myForm.checkbox1,
    checkbox2: document.myForm.checkbox2,
    radio1: document.myForm.radio1,
    radio2: document.myForm.radio2,
    save: document.querySelector('.cookie--save'),
    clear: document.querySelector('.cookie--clear'),
  },
  cookieName: 'testtest'
};


/**
 * 状態の設定
 */
const state = {
  cookie: null
};


/**
 * MODEL
 */
class MyForm {
  cookieRead() {
    let cookieObj = {};
    const allCookies = document.cookie;
    allCookies.split('; ').forEach(cookies => {
      const cookie = cookies.split('=');
      cookieObj[cookie[0]] = cookie[1];
    });
    state.cookie = cookieObj;
  }
  cookieSave() {
    const valueObj = this.getFormValue();
    Object.keys(valueObj).forEach(key => {
      document.cookie = `${key}=${valueObj[key]};`;
    });
  }
  cookieClear() {
    const valueObj = this.getFormValue();
    Object.keys(valueObj).forEach(key => {
      document.cookie = `${key}=; expires=0`;
    });
  }
  getFormValue() {
    const formValue = {
      text1: base.elements.text1.value || '',
      text2: base.elements.text2.value || '',
      select1: base.elements.select1.value || '',
      textarea1: base.elements.textarea1.value || '',
      checkbox1: base.elements.checkbox1.checked || '',
      checkbox2: base.elements.checkbox2.checked || '',
      radio1: base.elements.radio1.value || '',
      radio2: base.elements.radio2.value || '',
    };
    return formValue;
  }
}


/**
 * VIEW
 */
const myFormView = {
  init() {
    base.elements.text1.value = state.cookie.text1 || '';
    base.elements.text2.value = state.cookie.text2 || '';
    base.elements.select1.value = state.cookie.select1 || '';
    base.elements.textarea1.value = state.cookie.textarea1 || '';
    base.elements.checkbox1.checked = state.cookie.checkbox1 === 'true' ? true : false;
    base.elements.checkbox2.checked = state.cookie.checkbox2 === 'true' ? true : false;
    base.elements.radio1.value = state.cookie.radio1 || '';
    base.elements.radio2.value = state.cookie.radio2 || '';
  }
};


/**
 * CONTROLLER
 */
function init() {
  // インスタンスの作成
  state.myFromIns = new MyForm();

  // クッキーの読み込み
  state.myFromIns.cookieRead();

  // クッキーの内容をフォームに反映
  myFormView.init();

  // フォームのデフォルトのsubmittを無効にする
  base.elements.form.addEventListener('submit', e => {
    e.preventDefault();
  });

  // ■ 「保存」ボタンをクリックした時のイベント
  base.elements.save.addEventListener('click', e => {
    e.preventDefault();
    state.myFromIns.cookieSave();
  });

  // ■ 「クッキークリア」ボタンをクリックした時のイベント
  base.elements.clear.addEventListener('click', e => {
    e.preventDefault();
    state.myFromIns.cookieClear();
  });
}


/**
 * 実行
 */
init();
