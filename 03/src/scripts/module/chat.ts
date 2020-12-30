'use strict';

type chatConfig = {
  messagesElId: string,
  inputElId: string,
  formElId: string,
  chatData,
  firstQuestionId: string,
};

export class Chat {
  messagesEl: HTMLElement;
  // TODO: input要素の型指定が上手くできない
  inputEl;
  formEl;
  // inputEl: HTMLElement;
  // formEl: HTMLElement;
  chatData;
  messengers;
  currentQuestion: string;
  constructor(config: chatConfig) {
    this.messagesEl = document.getElementById(config.messagesElId);
    this.inputEl = document.getElementById(config.inputElId);
    this.formEl = document.getElementById(config.formElId);
    this.currentQuestion = config.firstQuestionId;
    this.messengers = [
      'bot',
      'person'
    ];
    this.chatData = config.chatData;
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
    // TODO: 入力欄を有効にする
    console.log(question.id);
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
   * チャットを終了
   */
  finish() {
    // TODO: チャット記録の実装
    // チャット内容を記録
    // 現在の質問を初期化
    this.currentQuestion = null;
    // 再質問開始ボタンを表示
  }

  /**
   * 選択時の挙動
   */
  selectHandler() {
    this.messagesEl.addEventListener('click', e => {
      // TODO: イベントオブジェクトの型指定
      const el = e.target;
      // クリックした要素がボタン以外の場合、処理を止める
      if (!el.classList.contains('button')) return;
      // 返答を表示
      this.showAnswer(el.textContent);
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
      // 入力欄をクリア
      this.inputEl.value = '';
      // 返答を表示
      this.showAnswer(input);
      // 次の質問に移動
      this.showNextQuestion(this.chatData[this.currentQuestion].nextId);
    });
  }

  /**
   * 最初の質問を表示
   */
  init() {
    this.showQuestion(this.currentQuestion);
    this.selectHandler();
    this.submitHandler();
  }
}
