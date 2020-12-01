import { Myself } from './components/Myself';
import { Opponent } from './components/Opponent';
import { Result } from './components/Result';
import { Reset } from './components/Reset';

type selector = {
  myself: string,
  opponent: string,
  result: string,
  reset: string,
};

class App {
  myself: Myself;
  opponent: Opponent;
  result: Result;
  reset: Reset;
  playing: boolean;
  myselfSelect: number;
  opponentSelect: number;
  constructor(selector: selector) {
    this.myself = new Myself(selector.myself);
    this.opponent = new Opponent(selector.opponent);
    this.result = new Result(selector.result);
    this.reset = new Reset(selector.reset);
  }
  /**
   * 画面を初期化
   */
  initView() {
    this.myself.init();
    this.opponent.init();
    this.result.hide();
    this.reset.hide();
    this.playing = false;
    this.myselfSelect = null;
    this.opponentSelect = null;
  }
  /**
   * じゃんけんで遊ぶイベント
   */
  playHandler() {
    const myselfEl: HTMLElement = this.myself.getEl();
    myselfEl.addEventListener('click', e => {
      if (!this.playing) {
        // 1.クリックしたボタンの番号を取得
        const targetBtn = e.target as HTMLElement;
        targetBtn.closest('.column');
        const btnIndex: number = Number(targetBtn.dataset.index);
        // 2.自分の選択状態の変更
        this.myselfSelect = btnIndex;
        // 3.相手の選択状態の変更（ランダムに決定）
        this.opponentSelect = Math.floor(Math.random() * 3);
        // 4.「自分」部分の選択ボタンスタイル変更
        this.myself.selectItem(this.myselfSelect);
        // 5.「相手」部分の描画
        this.opponent.show(this.opponentSelect);
        // 6.「結果」の判定
        const resultIndex: number = this.result.checkResult(this.myselfSelect, this.opponentSelect);
        // 7.「結果」部分の描画
        this.result.show(resultIndex);
        // 8.「リセット」部分の描画
        this.reset.show();
        // 9.ゲーム状態の変更
        this.playing = true;
      }
    });
  }
  /**
   * リセットイベント
   */
  resetHandler() {
    const resetEl: HTMLElement = this.reset.getEl();
    resetEl.addEventListener('click', this.initView);
  }
  /**
   * 初期表示
   */
  init() {
    this.initView();
    this.playHandler();
    this.resetHandler();
  }
}

const selector = {
  myself: '.myself',
  opponent: '.opponent',
  result: '.result',
  reset: '.reset',
};

const app = new App(selector);
app.init();
