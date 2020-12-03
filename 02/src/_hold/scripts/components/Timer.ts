type selector = {
  text: string,
  form: string,
  inputSet: string,
  input: string,
  start: string,
  stop: string,
  reset: string,
};

export class Timer {
  textEl: HTMLElement;
  formEl: HTMLElement;
  inputSetEl: HTMLElement;
  inputEl: HTMLElement;
  startEl: HTMLElement;
  stopEl: HTMLElement;
  resetEl: HTMLElement;
  isRunning: boolean;
  startTime: Date;
  remainTime: Date;
  timer: number;
  timerInterval: number;
  constructor(selector: selector, timerInterval: number) {
    this.textEl = document.querySelector(selector.text);
    // TODO:フォーム要素の確認
    this.formEl = document.querySelector(selector.form);
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
    this.startTime = startTime;
    // タイマーを開始
    this.timer = setInterval(() => {
      // TODO: 日付計算の型の設定を調べる
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
  }
  /**
   * タイマーを停止
   */
  stop() {
    clearInterval(this.timer);
    this.remainTime = this.getTime().remain;
    this.isRunning = false;
    this.stopView();
  }
  /**
   * 残り時間を取得
   * @return 残り時間
   */
  getTime(): {remain: Date, remainText: string} {
    // TODO: 日付計算の型の設定を調べる
    // 現在時間と開始時間の差分を計算
    const diff = new Date() - state.timer.startTime;
    // 差分から残り時間を計算
    const remain = state.timer.remainTime - diff;
    // 残り時間を成形
    let m = Math.floor(remain / 60000);
    let s = Math.floor(remain % 60000 / 1000);
    let ms = remain % 1000;
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
  getInput(): {text: string, time: Date} {
    // TODO:フォーム要素の確認
    // 入力欄から値を取得
    let m = this.form.min.value ? this.form.min.value : 0;
    let s = this.form.sec.value ? this.form.sec.value : 0;
    let ms = this.form.mSec.value ? this.form.mSec.value : 0;
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
    // TODO:フォーム要素の確認
    this.formEl.reset();
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
    // 入力フォームを有効
    this.inputSetEl.setAttribute('disabled', null);
  }
  /**
   * スタートイベント
   */
  startHandler() {
    this.startEl.addEventListener('click', this.start);
  }
  /**
   * ストップイベント
   */
  stopHandler() {
    this.stopEl.addEventListener('click', this.stop);
  }
  /**
   * リセットイベント
   */
  resetHandler() {
    this.resetEl.addEventListener('click', this.initView);
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
