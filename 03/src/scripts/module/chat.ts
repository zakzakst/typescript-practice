'use strict';

type chatConfig = {
  messagesElId: string,
  inputElId: string,
  submitElId: string,
  chatData,
  firstQuestionId: string,
};

export class Chat {
  messagesEl: HTMLElement;
  // TODO: input要素の型指定が上手くできない
  inputEl: HTMLElement;
  submitEl: HTMLElement;
  chatData;
  messengers;
  currentQuestion: string;
  constructor(config: chatConfig) {
    this.messagesEl = document.getElementById(config.messagesElId);
    this.inputEl = document.getElementById(config.inputElId);
    this.submitEl = document.getElementById(config.submitElId);
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
    console.log(question.id);
  }

  /**
   * 返答を表示
   * @param answer 返答
   */
  showAnswer(answer: string) {
    console.log(answer);
  }

  /**
   * 次の質問に移動
   */
  showNextQuestion() {}

  /**
   * 選択時の挙動
   */
  selectHandler() {
    this.messagesEl.addEventListener('click', e => {
      console.log(e.target);
    });
  }

  /**
   * 入力欄決定時の挙動
   */
  submitHandler() {
    this.submitEl.addEventListener('submit', e => {
      e.preventDefault();
      // const input = this.inputEl.value;
      // console.log(input);
    });
  }

  /**
   * 最初の質問を表示
   */
  init() {
    this.showQuestion(this.currentQuestion);
  }
}
