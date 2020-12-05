type selector = {
  text: string,
  form: HTMLFormElement,
  inputSet: string,
  input: string,
  start: string,
  stop: string,
  reset: string,
};

export class Timer {
  textEl: HTMLElement;
  formEl: HTMLFormElement;
  inputSetEl: HTMLElement;
  inputEl: HTMLElement;
  startEl: HTMLElement;
  stopEl: HTMLElement;
  resetEl: HTMLElement;
  isRunning: boolean;
  startTime: number;
  remainTime: number;
  timer;
  timerInterval: number;
  constructor(selector: selector, timerInterval: number) {
    this.textEl = document.querySelector(selector.text);
    this.formEl = selector.form;
    this.inputSetEl = document.querySelector(selector.inputSet);
    this.inputEl = document.querySelector(selector.input);
    this.startEl = document.querySelector(selector.start);
    this.stopEl = document.querySelector(selector.stop);
    this.resetEl = document.querySelector(selector.reset);
    this.isRunning = false;
    this.startTime = null;
    this.remainTime = null;
    this.timer = null;
    this.timerInterval = timerInterval;
  }
  /**
   * タイマーを開始
   */
  start() {
    // フォームの入力値が「0」の場合は挙動させない
    if(!this.getInput().time) {
      alert('タイマーの時間を設定してください');
      return;
    }
    // 残り時間がセットされていない場合、フォームの値を残り時間にセット
    if(!this.remainTime) {
      this.remainTime = this.getInput().time;
    }
    // 現在時刻を開始時間にセット
    const startTime = new Date();
    this.startTime = startTime.getTime();
    // タイマーを開始
    // TODO: setIntervalの型の設定を調べる
    this.timer = setInterval(() => {
      if(this.getTime().remain > 0) {
        const text = this.getTime().remainText;
        this.textEl.innerHTML = text;
      } else {
        // 残り時間がなくなった場合はタイマーを停止
        this.stop();
        // 初期表示
        this.initView();
        setTimeout(() => {
          alert('時間が経過しました');
        }, this.timerInterval);
      }
    }, this.timerInterval);
    // 実行中表示
    this.runningView();
  }
  /**
   * タイマーを停止
   */
  stop() {
    clearInterval(this.timer);
    this.remainTime = this.getTime().remain;
    this.isRunning = false;
    // 停止中表示
    this.stopView();
  }
  /**
   * 残り時間を取得
   * @return 残り時間
   */
  getTime(): {remain: number, remainText: string} {
    // 現在時間と開始時間の差分を計算
    const date = new Date();
    const diff = date.getTime() - this.startTime;
    // 差分から残り時間を計算
    const remain = this.remainTime - diff;
    // 残り時間を成形
    let m = Math.floor(remain / 60000).toString();
    let s = Math.floor(remain % 60000 / 1000).toString();
    let ms = (remain % 1000).toString();
    m = ('0' + m).slice(-2);
    s = ('0' + s).slice(-2);
    ms = ('0' + ms).slice(-3).slice(0, 2);
    const remainText = m + ':' + s + ':' + ms;

    return {remain, remainText}
  }
  /**
   * 入力時間を取得
   * @return 入力時間
   */
  getInput(): {text: string, time: number} {
    // 入力欄から値を取得
    let m = this.formEl.min.value ? this.formEl.min.value : 0;
    let s = this.formEl.sec.value ? this.formEl.sec.value : 0;
    let ms = this.formEl.mSec.value ? this.formEl.mSec.value : 0;
    // 文字列を作成
    m = ('0' + m).slice(-2);
    s = ('0' + s).slice(-2);
    ms = ('0' + ms).slice(-2);
    const text = m + ':' + s + ':' + ms;
    // ミリ秒の合計を計算
    const time = parseInt(m) * 60000 + parseInt(s) * 1000 + parseInt(ms);

    return {text, time};
  }
  /**
   * 初期表示
   */
  initView() {
    this.textEl.innerHTML = '00:00:00';
    this.startEl.classList.remove('is-hidden');
    this.stopEl.classList.add('is-hidden');
    this.resetEl.classList.remove('is-hidden');
    this.startTime = null;
    this.remainTime = null;
    this.timer = null;
    // 入力フォームの初期化
    this.formEl.reset();
    // 入力フォームを有効
    this.inputSetEl.removeAttribute('disabled');
  }
  /**
   * 実行中表示
   */
  runningView() {
    this.startEl.classList.add('is-hidden');
    this.stopEl.classList.remove('is-hidden');
    this.resetEl.classList.add('is-hidden');
    // 入力フォームを無効
    this.inputSetEl.setAttribute('disabled', 'true');
  }
  /**
   * 停止中表示
   */
  stopView() {
    this.startEl.classList.remove('is-hidden');
    this.stopEl.classList.add('is-hidden');
    this.resetEl.classList.remove('is-hidden');
  }
  /**
   * スタートイベント
   */
  startHandler() {
    this.startEl.addEventListener('click', this.start.bind(this));
  }
  /**
   * ストップイベント
   */
  stopHandler() {
    this.stopEl.addEventListener('click', this.stop.bind(this));
  }
  /**
   * リセットイベント
   */
  resetHandler() {
    this.resetEl.addEventListener('click', this.initView.bind(this));
  }
  /**
   * 初期化
   */
  init() {
    this.initView();
    this.startHandler();
    this.stopHandler();
    this.resetHandler();
  }
}
