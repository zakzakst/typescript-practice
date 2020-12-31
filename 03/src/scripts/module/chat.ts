'use strict';

type chatConfig = {
  messagesElId: string,
  inputElId: string,
  submitElId: string,
  formElId: string,
  chatData,
  firstQuestionId: string,
};

export class Chat {
  messagesEl: HTMLElement;
  inputEl: HTMLInputElement;
  submitEl: HTMLInputElement;
  formEl: HTMLFormElement;
  chatData;
  chatLog;
  messengers;
  currentQuestion: string;
  constructor(config: chatConfig) {
    this.messagesEl = document.getElementById(config.messagesElId);
    this.inputEl = <HTMLInputElement>document.getElementById(config.inputElId);
    this.submitEl = <HTMLInputElement>document.getElementById(config.submitElId);
    this.formEl = <HTMLFormElement>document.getElementById(config.formElId);
    this.currentQuestion = config.firstQuestionId;
    this.messengers = [
      'bot',
      'person'
    ];
    this.chatData = config.chatData;
    this.chatLog = [];
  }

  /**
   * 質問を表示
   * @param id 質問ID
   */
  showQuestion(id: string) {
    // 質問IDから質問データを取得
    const question = this.chatData[id];
    // 質問メッセージを表示
    this.showMessage(question.message, this.messengers[0]);
    // 質問タイプによって処理を変更
    switch (question.type) {
      case 'select':
        this.showSelect(question);
        break;

      case 'input':
        this.showInput(question);
        break;

      case 'finish':
        this.finish();
        break;

      default:
        break;
    }
  }

  /**
   * メッセージを表示
   * @param message メッセージ
   * @param messenger 送信者
   */
  showMessage(message: string, messenger: string): void {
    const markup = `
      <p class="message--${messenger}">${message}</p>
    `;
    this.messagesEl.insertAdjacentHTML('beforeend', markup);
  }

  /**
   * 選択肢を表示
   * @param question 質問データ
   */
  showSelect(question) {
    let buttonMarkupArr = question.selectItems.map(item => {
      return `<button class="button" data-next-id="${item.nextId}">${item.label}</button>`;
    });
    let markup = `
      <div>
        ${buttonMarkupArr.join('')}
      </div>
    `;
    this.messagesEl.insertAdjacentHTML('beforeend', markup);
  }

  /**
   * 入力欄を表示
   * @param question 質問データ
   */
  showInput(question) {
    // 入力欄を有効にする
    this.setInputState(true);
  }

  /**
   * 入力欄を有効／無効にする
   * @param isActive true:有効 / false:無効
   */
  setInputState(isActive: boolean) {
    this.inputEl.disabled = !isActive;
    this.submitEl.disabled = !isActive;
  }

  /**
   * 返答を表示
   * @param answer 返答
   */
  showAnswer(answer: string) {
    this.showMessage(answer, this.messengers[1]);
  }

  /**
   * 次の質問に移動
   */
  showNextQuestion(id: string) {
    this.currentQuestion = id;
    this.showQuestion(id);
  }

  /**
   * チャットの内容を記録
   * @param id 質問ID
   * @param answer 返答の内容
   */
  log(id, answer) {
    this.chatLog.push({
      id,
      answer,
    });
  }

  /**
   * チャットを終了
   */
  finish() {
    // TODO: チャット記録の実装
    // 受け付けた内容を表示
    console.log(this.chatLog);
    // 現在の質問を初期化
    this.chatLog = [];
    this.currentQuestion = null;
    // 再質問開始ボタンを表示
  }

  /**
   * 選択時の挙動
   */
  selectHandler() {
    this.messagesEl.addEventListener('click', e => {
      const el = <HTMLInputElement>e.target;
      // クリックした要素がボタン以外の場合、処理を止める
      if (!el.classList.contains('button')) return;
      // 返答を表示
      this.showAnswer(el.textContent);
      // 返答を記録
      this.log(this.currentQuestion, el.textContent);
      // 次の質問に移動
      this.showNextQuestion(el.dataset.nextId);
    });
  }

  /**
   * 入力欄決定時の挙動
   */
  submitHandler() {
    this.formEl.addEventListener('submit', e => {
      // 通常の処理を止める
      e.stopPropagation();
      e.preventDefault();
      // 入力内容を取得
      const input = this.inputEl.value;
      // 入力内容が空欄の場合、処理を止める
      if (!input) return false;
      // 入力欄をクリアして無効にする
      this.inputEl.value = '';
      this.setInputState(false);
      // 返答を表示
      this.showAnswer(input);
      // 返答を記録
      this.log(this.currentQuestion, input);
      // 次の質問に移動
      this.showNextQuestion(this.chatData[this.currentQuestion].nextId);
    });
  }

  /**
   * 最初の質問を表示
   */
  init() {
    this.selectHandler();
    this.submitHandler();
    this.setInputState(false);
    this.showQuestion(this.currentQuestion);
  }
}
