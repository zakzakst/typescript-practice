/**
 * 要素の設定
 */
const base = {
  elements: {
    tab: document.querySelector('.tabs__container'),
    contents: document.querySelector('.contents'),
    sw: {
      text: document.querySelector('.sw-text'),
      controlStart: document.querySelector('.sw-control__start'),
      controlStop: document.querySelector('.sw-control__stop'),
      controlReset: document.querySelector('.sw-control__reset'),
    },
    timer: {
      text: document.querySelector('.timer-text'),
      form: document.timerForm,
      inputSet: document.querySelector('.timer-input__container'),
      input: document.querySelector('.timer-input'),
      controlStart: document.querySelector('.timer-control__start'),
      controlStop: document.querySelector('.timer-control__stop'),
      controlReset: document.querySelector('.timer-control__reset'),
    },
  },
  contentsList: [
    {id: 'sw', text: 'ストップウォッチ'},
    {id: 'timer', text: 'タイマー'},
  ],
  timerInterval: 40,
};


/**
 * 状態の設定
 */
const state = {
  currentContent: 0,
  sw: {
    isRunning: false,
    startTime: null,
    timeDiff: null,
    timer: null,
  },
  timer: {
    isRunning: false,
    startTime: null,
    remainTime: null,
    timer: null,
  },
};


/**
 * MODEL
 */
class SwModel {
  start() {
    // 1.現在時刻を開始時間にセット
    const startTime = new Date();
    state.sw.startTime = startTime;
  }
  timeText() {
    // 1.現在時間と開始時間の差分を計算
    // ※経過時間が保持されている場合はその値を追加
    const addTime = state.sw.timeDiff ? state.sw.timeDiff : 0;
    const diff = new Date() - state.sw.startTime + addTime;
    // 2.差分を成形
    let diffText = '';
    let m = Math.floor(diff / 60000);
    let s = Math.floor(diff % 60000 / 1000);
    let ms = diff % 1000;
    m = ('0' + m).slice(-2);
    s = ('0' + s).slice(-2);
    ms = ('0' + ms).slice(-3).slice(0, 2);
    diffText = m + ':' + s + ':' + ms;
    // 3.差分と成形した文字列を返す
    return {diff, diffText};
  }
  stateClear() {
    state.sw.startTime = null;
    state.sw.timeDiff = null;
    state.sw.timer = null;
  }
}

class TimerModel {
  constructor() {
    this.form = base.elements.timer.form;
  }
  setTime() {
    // 1.フォームの値を残り時間にセット
    state.timer.remainTime = this.inputTime().time;
  }
  start() {
    // 1.現在時刻を開始時間にセット
    const startTime = new Date();
    state.timer.startTime = startTime;
  }
  timeText() {
    // 1.現在時間と開始時間の差分を計算
    const diff = new Date() - state.timer.startTime;
    // 2.差分から残り時間を計算
    const remain = state.timer.remainTime - diff;
    // 3.残り時間を成形
    let remainText = '';
    let m = Math.floor(remain / 60000);
    let s = Math.floor(remain % 60000 / 1000);
    let ms = remain % 1000;
    m = ('0' + m).slice(-2);
    s = ('0' + s).slice(-2);
    ms = ('0' + ms).slice(-3).slice(0, 2);
    remainText = m + ':' + s + ':' + ms;
    // 3.差分と成形した文字列を返す
    return {remain, remainText};
  }
  inputTime() {
    // 1.入力欄から値を取得
    let m = this.form.min.value ? this.form.min.value : 0;
    let s = this.form.sec.value ? this.form.sec.value : 0;
    let ms = this.form.mSec.value ? this.form.mSec.value : 0;
    // 2.文字列を作成
    m = ('0' + m).slice(-2);
    s = ('0' + s).slice(-2);
    ms = ('0' + ms).slice(-2);
    const text = m + ':' + s + ':' + ms;
    // 3.ミリ秒の合計を計算
    const time = parseInt(m) * 60000 + parseInt(s) * 1000 + parseInt(ms);
    // 4.ミリ秒とテキストを返す
    return {text, time};
  }
  stateClear() {
    state.timer.startTime = null;
    state.timer.remainTime = null;
    state.timer.timer = null;
  }
}


/**
 * VIEW
 */
const tabsView = {
  el: base.elements.tab,
  init() {
    // 1.タブを挿入
    let markup = '';
    for(let i = 0; i < base.contentsList.length; i++) {
      markup += `
        <li><a>${base.contentsList[i].text}</a></li>
      `;
    }
    this.el.innerHTML = markup;
    // 2.「currentContent」のタブをアクティブにする
    this.tabChange(state.currentContent);
  },
  tabChange(index) {
    // 1.全てのタブの「is-active」クラスを削除
    Array.from(this.el.children).forEach(item => {
      item.classList.remove('is-active');
    });
    // 2.引数番目のタブに「is-active」クラスを付与
    this.el.children[index].classList.add('is-active');
  }
};

const contentsView = {
  el: base.elements.contents,
  init() {
    this.contentChange(state.currentContent);
  },
  contentChange(index) {
    // 1.全てのタブの「is-hidden」クラスを付与
    Array.from(this.el.children).forEach(item => {
      item.classList.add('is-hidden');
    });
    // 2.引数番目のタブに「is-active」クラスを削除
    this.el.children[index].classList.remove('is-hidden');
  }
};

const swView = {
  el: base.elements.sw.text,
  startEl: base.elements.sw.controlStart,
  stopEl: base.elements.sw.controlStop,
  resetEl: base.elements.sw.controlReset,
  init() {
    this.textChange('00:00:00');
    // 1.「開始」を表示
    this.startEl.classList.remove('is-hidden');
    // 2.「停止」「リセット」を非表示
    this.stopEl.classList.add('is-hidden');
    this.resetEl.classList.add('is-hidden');
  },
  textChange(text) {
    this.el.innerHTML = text;
  },
  swRunning() {
    // 1.「停止」を表示
    this.stopEl.classList.remove('is-hidden');
    // 2.「開始」「リセット」を非表示
    this.startEl.classList.add('is-hidden');
    this.resetEl.classList.add('is-hidden');
  },
  swStop() {
    // 1.「開始」「リセット」を表示
    this.startEl.classList.remove('is-hidden');
    this.resetEl.classList.remove('is-hidden');
    // 2.「停止」を非表示
    this.stopEl.classList.add('is-hidden');
  }
}

const timerView = {
  el: base.elements.timer.text,
  inputSetEl: base.elements.timer.inputSet,
  startEl: base.elements.timer.controlStart,
  stopEl: base.elements.timer.controlStop,
  resetEl: base.elements.timer.controlReset,
  init() {
    this.textChange('00:00:00');
    // 1.「開始」「リセット」を表示
    this.startEl.classList.remove('is-hidden');
    this.resetEl.classList.remove('is-hidden');
    // 2.「停止」を非表示
    this.stopEl.classList.add('is-hidden');
    // 3.入力部分の値を初期化
    base.elements.timer.form.reset();
  },
  textChange(text) {
    this.el.innerHTML = text;
  },
  timerRunning() {
    // 1.「停止」を表示
    this.stopEl.classList.remove('is-hidden');
    // 2.「開始」「リセット」を非表示
    this.startEl.classList.add('is-hidden');
    this.resetEl.classList.add('is-hidden');
    // 3.入力フォームを無効
    this.inputSetEl.setAttribute('disabled', 'true');
  },
  timerStop() {
    // 1.「開始」「リセット」を表示
    this.startEl.classList.remove('is-hidden');
    this.resetEl.classList.remove('is-hidden');
    // 2.「停止」を非表示
    this.stopEl.classList.add('is-hidden');
    // 3.入力フォームを有効
    this.inputSetEl.removeAttribute('disabled');
  }
}


/**
 * CONTROLLER
 */
function init() {
  // ■初期化
  tabsView.init();
  contentsView.init();
  swView.init();
  timerView.init();

  // ■インスタンスの作成
  state.sw.ins = new SwModel();
  state.timer.ins = new TimerModel();

  // ■タブクリック時のイベント
  base.elements.tab.addEventListener('click', e => {
    // 1.実行中のコンテンツを停止
    funcSwStop();
    funcTimerStop();
    // 2.クリックされたタブのindexを取得
    const tabItems = base.elements.tab.getElementsByTagName('li');
    const itemIndex = Array.from(tabItems).indexOf(e.target.closest('li'));
    // 3.取得したindexに応じた内容を表示
    tabsView.tabChange(itemIndex);
    contentsView.contentChange(itemIndex);
  });

  // ■ストップウォッチ：「開始」ボタンクリック時のイベント
  base.elements.sw.controlStart.addEventListener('click', () => {
    // 1.タイマーを開始
    state.sw.ins.start();
    state.sw.timer = setInterval(() => {
      const text = state.sw.ins.timeText().diffText;
      swView.textChange(text);
    }, base.timerInterval);
    // 2.実行状態を変更
    state.sw.isRunning = true;
    // 3.ボタンの表示変更
    swView.swRunning();
  });

  // ■ストップウォッチ：「停止」ボタンクリック時のイベント
  base.elements.sw.controlStop.addEventListener('click', () => {
    funcSwStop();
  });

  // ■ストップウォッチ：「リセット」ボタンクリック時のイベント
  base.elements.sw.controlReset.addEventListener('click', () => {
    // 1.各種状態をクリア
    state.sw.ins.stateClear();
    // 2.表示を初期化
    swView.init();
  });

  // ■ストップウォッチ：関数
  const funcSwStop = () => {
    if(state.sw.isRunning) {
      // 1.タイマーを停止
      clearTimeout(state.sw.timer);
      // 2.経過時間をセット
      state.sw.timeDiff = state.sw.ins.timeText().diff;
      // 3.実行状態を変更
      state.sw.isRunning = false;
      // 4.ボタンの表示変更
      swView.swStop();
    }
  }

  // ■タイマー：「開始」ボタンクリック時のイベント
  base.elements.timer.controlStart.addEventListener('click', () => {
    // フォームの入力値が「0」の場合は挙動させない
    if(!state.timer.ins.inputTime().time) {
      alert('タイマーの時間を設定してください')
      return;
    }
    // 残り時間がセットされていない場合
    if(!state.timer.remainTime) {
      state.timer.ins.setTime();
    }
    // 1.タイマーを開始
    state.timer.ins.start();
    state.timer.timer = setInterval(() => {
      if(state.timer.ins.timeText().remain > 0) {
        let text = state.timer.ins.timeText().remainText;
        timerView.textChange(text);
      } else {
        // 残り時間がなくなった場合はタイマーを停止
        funcTimerStop();
        timerView.textChange('00:00:00');
        state.timer.ins.stateClear();
        setTimeout(() => {
          alert('時間が経過しました');
        }, base.timerInterval);
      }
    }, base.timerInterval);
    // 2.実行状態を変更
    state.timer.isRunning = true;
    // 3.ボタンの表示変更
    timerView.timerRunning();
  });

  // ■タイマー：「停止」ボタンクリック時のイベント
  base.elements.timer.controlStop.addEventListener('click', () => {
    funcTimerStop();
  });

  // ■タイマー：「リセット」ボタンクリック時のイベント
  base.elements.timer.controlReset.addEventListener('click', () => {
    // 1.各種状態をクリア
    state.timer.ins.stateClear();
    // 2.表示を初期化
    timerView.init();
  });

  // ■タイマー：関数
  const funcTimerStop = () => {
    if(state.timer.isRunning) {
      // 1.タイマーを停止
      clearTimeout(state.timer.timer);
      // 2.経過時間をセット
      state.timer.remainTime = state.timer.ins.timeText().remain;
      // 3.実行状態を変更
      state.timer.isRunning = false;
      // 4.ボタンの表示変更
      timerView.timerStop();
    }
  }
}


/**
 * 実行
 */
init();
