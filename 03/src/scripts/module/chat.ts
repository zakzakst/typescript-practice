'use strict';

type chatConfig = {
  messagesElId: string,
  inputElId: string,
  submitElId: string,
  formElId: string,
  resetElId: string,
  chatData,
  firstQuestionId: string,
};

export class Chat {
  messagesEl: HTMLElement;
  inputEl: HTMLInputElement;
  submitEl: HTMLInputElement;
  formEl: HTMLFormElement;
  resetEl: HTMLElement;
  chatData;
  chatLog;
  messengers;
  firstQuestion: string;
  currentQuestion: string;
  constructor(config: chatConfig) {
    this.messagesEl = document.getElementById(config.messagesElId);
    this.inputEl = <HTMLInputElement>document.getElementById(config.inputElId);
    this.submitEl = <HTMLInputElement>document.getElementById(config.submitElId);
    this.formEl = <HTMLFormElement>document.getElementById(config.formElId);
    this.resetEl = document.getElementById(config.resetElId);
    this.firstQuestion = config.firstQuestionId;
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
      <div class="message__container">
        <div class="message message--${messenger}">${message}</div>
      </div>
    `;
    this.messagesEl.insertAdjacentHTML('beforeend', markup);
    // 追加後にメッセージを一番下にスクロール
    this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
  }

  /**
   * 選択肢を表示
   * @param question 質問データ
   */
  showSelect(question) {
    const listMarkupArr = question.selectItems.map(item => {
      return `
        <li>
          <a class="select-item" data-next-id="${item.nextId}" href="#">${item.label}</a>
        </li>
      `;
    });
    let markup = `
      <div class="content">
        <p>以下から選択してください</p>
        <ul>
        ${ listMarkupArr.join('') }
        </ul>
      </div>
    `;
    this.showMessage(markup, this.messengers[0]);
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
    // 受け付けた内容を表示
    const logMarkupArr = this.chatLog.map(log => {
      return `
        <li class="message-log__item">
          <p class="message-log__question">【${this.chatData[log.id].message}】</p>
          <p class="message-log__answer">${log.answer}</p>
        </li>
      `;
    });
    const markup = `
      <p>以下の内容で質問を受け付けました</p>
      <ul class="message-log">
        ${logMarkupArr.join('')}
      </ul>
    `;
    this.showMessage(markup, this.messengers[0]);
    // NOTE: データベースへの記録が必要な場合はここに処理を記載
    // 現在の質問を初期化
    this.chatLog = [];
    this.currentQuestion = null;
  }

  /**
   * 選択時の挙動
   */
  selectHandler() {
    this.messagesEl.addEventListener('click', e => {
      e.preventDefault();
      const el = <HTMLInputElement>e.target;
      // クリックした要素がボタン以外の場合、処理を止める
      if (!el.classList.contains('select-item')) return;
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
   * 最初からやり直すボタンクリック時の挙動
   */
  resetHandler() {
    this.resetEl.addEventListener('click', () => {
      this.showMessage('最初からやり直す', this.messengers[1]);
      // 入力欄をクリア
      this.formEl.reset();
      this.setInputState(false);
      // 現在の質問を初期化
      this.chatLog = [];
      this.currentQuestion = this.firstQuestion;
      // 最初の質問を表示
      this.showQuestion(this.firstQuestion);
    });
  }

  /**
   * 最初の質問を表示
   */
  init() {
    this.selectHandler();
    this.submitHandler();
    this.resetHandler();
    this.setInputState(false);
    this.showQuestion(this.currentQuestion);
  }
}
