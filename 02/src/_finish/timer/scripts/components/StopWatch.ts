type selector = {
  text: string,
  start: string,
  stop: string,
  reset: string,
};

export class StopWatch {
  textEl: HTMLElement;
  startEl: HTMLElement;
  stopEl: HTMLElement;
  resetEl: HTMLElement;
  isRunning: boolean;
  startTime: number;
  timeDiff: number;
  timer;
  timerInterval: number;
  constructor(selector: selector, timerInterval: number) {
    this.textEl = document.querySelector(selector.text);
    this.startEl = document.querySelector(selector.start);
    this.stopEl = document.querySelector(selector.stop);
    this.resetEl = document.querySelector(selector.reset);
    this.isRunning = false;
    this.startTime = null;
    this.timeDiff = null;
    this.timer = null;
    this.timerInterval = timerInterval;
  }
  /**
   * タイマーをスタート
   */
  start() {
    // 開始時間を設定
    const startTime = new Date();
    this.startTime = startTime.getTime();
    // 実行状態を設定
    this.isRunning = true;
    // 実行中表示に変更
    this.runningView();
    // タイマーを開始
    this.timer = setInterval(() => {
      const text = this.getTime().diffText;
      this.textEl.innerHTML = text;
    }, this.timerInterval);
  }
  /**
   * タイマーをストップ
   */
  stop() {
    // タイマーを停止
    clearInterval(this.timer);
    // 経過時間を設定
    this.timeDiff = this.getTime().diff;
    // 実行状態を設定
    this.isRunning = false;
    // 停止中表示に変更
    this.stopView();
  }
  /**
   * 経過時間を取得
   * @return 経過時間の文字列
   */
  getTime(): {diff: number, diffText: string} {
    const addTime = this.timeDiff ? this.timeDiff : 0;
    const date = new Date();
    const diff = date.getTime() - this.startTime + addTime;

    let m: string = Math.floor(diff / 60000).toString();
    let s: string = Math.floor(diff % 60000 / 1000).toString();
    let ms: string = (diff % 1000).toString();
    m = ('0' + m).slice(-2);
    s = ('0' + s).slice(-2);
    ms = ('0' + ms).slice(-3).slice(0, 2);
    const diffText: string = m + ':' + s + ':' + ms;

    return {diff, diffText};
  }
  /**
   * 初期表示
   */
  initView() {
    this.textEl.innerHTML = '00:00:00';
    this.startEl.classList.remove('is-hidden');
    this.stopEl.classList.add('is-hidden');
    this.resetEl.classList.add('is-hidden');
    this.startTime = null;
    this.timeDiff = null;
    this.timer = null;
  }
  /**
   * 実行中表示
   */
  runningView() {
    this.startEl.classList.add('is-hidden');
    this.stopEl.classList.remove('is-hidden');
    this.resetEl.classList.add('is-hidden');
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
    this.startEl.addEventListener('click', () => {
      this.start();
    });
  }
  /**
   * ストップイベント
   */
  stopHandler() {
    this.stopEl.addEventListener('click', () => {
      this.stop();
    });
  }
  /**
   * リセットイベント
   */
  resetHandler() {
    this.resetEl.addEventListener('click', () => {
      this.initView();
    });
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
