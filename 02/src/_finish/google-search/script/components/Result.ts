export class Result {
  el: HTMLElement;
  constructor(selector: string) {
    this.el = document.querySelector(selector);
  }
  /**
   * 検索結果表示
   * @param data 検索結果データ
   */
  resultView(data) {
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
  }
  /**
   * データ取得中表示
   */
  loadingView() {
    this.el.innerHTML = '<p class="has-text-centered">読み込み中...</p>';
  }
}
