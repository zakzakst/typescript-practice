/**
 * 要素の設定
 */
const base = {
  elements: {
    opponent: document.querySelector('.opponent'),
    myself: document.querySelector('.myself'),
    result: document.querySelector('.result'),
    reset: document.querySelector('.reset'),
  },
  jankenItems: [
    {id: 'guu', text: 'グー'},
    {id: 'choki', text: 'チョキ'},
    {id: 'paa', text: 'パー'},
  ],
  resultItems: [
    {text: 'かち！'},
    {text: 'まけ。。'},
    {text: 'あいこ'},
  ],
  opponentText: 'ボタンを押してね',
};


/**
 * 状態の設定
 */
const state = {
  gamePlaying: false,
  opponentSelect: '',
  myselfSelect: '',
};


/**
 * MODEL
 */
class Result {
  checkResult(my, op) {
    if((my === 0 && op === 1) || (my === 1 && op === 2) || (my === 2 && op === 0)) {
      // 勝ち
      return base.resultItems[0].text;
    } else if((my === 0 && op === 2) || (my === 1 && op === 0) || (my === 2 && op === 1)) {
      // 負け
      return base.resultItems[1].text;
    } else if((my === 0 && op === 0) || (my === 1 && op === 1) || (my === 2 && op === 2)) {
      // あいこ
      return base.resultItems[2].text;
    } else {
      // その他の場合はエラー
      console.log('error');
    }
  }
}


/**
 * VIEW
 */
const opponentView = {
  changeHtml(html) {
    base.elements.opponent.innerHTML = '';
    base.elements.opponent.innerHTML = html;
  },
  init() {
    const markup = `
      <p class="is-size-4">${base.opponentText}</p>
    `;
    this.changeHtml(markup);
  },
  show(index) {
    const markup = `
      <img class="opponent__img" src="./images/${base.jankenItems[index].id}.png" alt="">
    `;
    this.changeHtml(markup);
  }
};

const myselfView = {
  init() {
    let itemsHtml = '';
    for(let i = 0; i < base.jankenItems.length; i++) {
      itemsHtml += `
        <li class="column" data-index="${i}">
          <p class="myself__btn">
            <img class="myself__img" src="./images/${base.jankenItems[i].id}.png" alt="${base.jankenItems[i].text}">
          </p>
        </li>
      `;
    }
    const markup = `
      <ul class="myself__btns columns has-text-centered">
        ${itemsHtml}
      </ul>
    `;
    base.elements.myself.innerHTML = markup;
  },
  selectItem(index) {
    const btns = base.elements.myself.getElementsByTagName('p');
    const btnArray = Array.from(btns);
    btnArray[index].classList.add('is-selected');
  }
}

const resultView = {
  el: base.elements.result,
  show(text) {
    Array.from(this.el.getElementsByTagName('p'))[0].textContent = text;
    this.el.classList.remove('is-hidden');
  },
  hide() {
    this.el.classList.add('is-hidden');
    Array.from(this.el.getElementsByTagName('p'))[0].textContent = '';
  }
}

const resetView = {
  el: base.elements.reset,
  show() {
    this.el.classList.remove('is-hidden');
  },
  hide() {
    this.el.classList.add('is-hidden');
  }
}


/**
 * CONTROLLER
 */
function init() {
  // ■ 初期化
  // 1.初期画面の描画
  initView();
  // 2.「結果」インスタンスの作成
  state.result = new Result;

  // ■ じゃんけんボタンクリック時のイベント設定
  base.elements.myself.addEventListener('click', e => {
    if(!state.gamePlaying) {
      // 1.クリックしたボタンの番号を取得
      const targetBtn = e.target.closest('.column');
      const btnIndex = targetBtn.dataset.index;
      // 2.自分の選択状態の変更
      state.myselfSelect = btnIndex;
      // 3.相手の選択状態の変更（ランダムに決定）
      state.opponentSelect = Math.floor(Math.random() * 3);
      // 4.「自分」部分の選択ボタンスタイル変更
      myselfView.selectItem(state.myselfSelect);
      // 5.「相手」部分の描画
      opponentView.show(state.opponentSelect);
      // 6.「結果」の判定
      const resultText = state.result.checkResult(parseInt(state.myselfSelect), parseInt(state.opponentSelect));
      // 7.「結果」部分の描画
      resultView.show(resultText);
      // 8.「リセット」部分の描画
      resetView.show();
      // 9.ゲーム状態の変更
      state.gamePlaying = true;
    }
  });

  // ■ リセットボタンクリック時のイベント設定
  // 1.初期画面の描画
  base.elements.reset.addEventListener('click', initView);
}

function initView() {
  // 1.「相手」部分の初期描画
  opponentView.init();
  // 2.「自分」部分の初期描画
  myselfView.init();
  // 3.「結果」部分の非表示
  resultView.hide();
  // 4.「リセット」部分の非表示
  resetView.hide();
  // 5.stateの初期化
  state.gamePlaying = false;
  state.opponentSelect = '';
  state.myselfSelect = '';
}


/**
 * 実行
 */
init();
