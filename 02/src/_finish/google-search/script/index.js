/**
 * 要素の設定
 */
const base = {
  elements: {
    search: document.search,
    searchInput: this.search.searchInput,
    searchSubmit: this.search.searchSubmit,
    result: document.querySelector('.result'),
  },
  searchUrlBase: 'https://www.googleapis.com/customsearch/v1?key=[key]cx=[cx]&pws=0&tbm=nws',
};


/**
 * 状態の設定
 */
const state = {
  currentQuery: ''
};


/**
 * MODEL
 */
class ResultModel {
  constructor() {
    this.el = base.elements.result;
  }
  getSearchResult(query) {
    const searchUrl = `${base.searchUrlBase}&q=${encodeURI(query)}`;
    return new Promise(function(resolve) {
      fetch(searchUrl)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          resolve(data);
        })
        .catch(error => {
          console.log(error);
        });
    });
  }
}

/**
 * VIEW
 */
const resultView = {
  el: base.elements.result,
  init() {
    this.el.innerHTML = '';
  },
  renderResult(data) {
    this.el.innerHTML = '';
    data.forEach(item => {
      const markup = `
        <div class="column">
          <a href="${item.link}" class="card">
            <div class="card-content">
              <p class="title is-4">${item.title}</p>
              <p class="subtitle is-6">${item.snippet}</p>
            </div>
          </a>
        </div>
      `;
      this.el.insertAdjacentHTML('beforeend', markup);
    });
  },
  loadStart() {
    this.el.innerHTML = '<p class="has-text-centered">読み込み中...</p>';
    // this.el.innerHTML = '<progress class="progress is-small is-primary" max="100">読み込み中...</progress>';
  },
}


/**
 * CONTROLLER
 */
function init() {
  // 初期描画
  resultView.init();
  // インスタンスの生成
  state.resultIns = new ResultModel();

  // ■フォーム実行時のイベント
  base.elements.search.addEventListener('submit', (event) => {
    // 1.通常のsubmitイベントを無効にする
    event.preventDefault();
    // 2.検索テキストを設定
    const inputValue = base.elements.searchInput.value;
    if(inputValue === '' || inputValue === state.currentQuery) {
      return;
    } else {
      state.currentQuery = inputValue;
    }
    // 3.検索結果を取得
    const searchResult = state.resultIns.getSearchResult(state.currentQuery);
    // 4.検索結果を画面に描画
    resultView.loadStart();
    searchResult.then((data) => {
      resultView.renderResult(data.items);
    });
  });
}


/**
 * 実行
 */
init();
