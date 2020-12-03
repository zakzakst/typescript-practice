type selectors = {
  overlay: string,
  overlayLoader: string,
};

export class Overlay {
  overlayEl: HTMLElement;
  overlayLoaderEl: HTMLElement;
  loaderAnimDelay: number;
  hideDelay: number;
  constructor(selectors: selectors, animDelay: number, hideDelay: number) {
    this.overlayEl = document.querySelector(selectors.overlay);
    this.overlayLoaderEl = document.querySelector(selectors.overlayLoader);
    this.loaderAnimDelay = animDelay;
    this.hideDelay = hideDelay;
  }

  /**
   * アニメーション設定
   */
  setAnim() {
    // ローダーに記載されている文字列を取得して、1文字ずつの配列にする
    const str = this.overlayLoaderEl.textContent;
    const strArray = str.split('');
    // ローダー要素を空にする
    this.overlayLoaderEl.innerHTML = '';
    // 各文字をspanタグでくくってローダー要素に追加する
    strArray.forEach((letter, index) => {
      const spanEl = document.createElement('span');
      spanEl.textContent = letter;
      spanEl.style.animationDelay = `${this.loaderAnimDelay * index}s`;
      this.overlayLoaderEl.appendChild(spanEl);
    });
  }

  /**
   * ローダーを非表示
   */
  hideOverlayLoader() {
    this.overlayLoaderEl.classList.add('my-is-hidden');
  }

  /**
   * オーバーレイを非表示
   */
  hideOverlay() {
    this.overlayEl.classList.add('my-is-hidden');
  }

  /**
   * オーバーレイを削除
   */
  deleteOverlay() {
    this.overlayEl.style.display = 'none';
  }

  /**
   * 非表示イベント
   */
  hideHandler() {
    // ページ読み込みが完了したら、ローダーを非表示
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.hideOverlayLoader();
      }, this.hideDelay);
    });
    // ローダー非表示が完了したら、オーバーレイを非表示
    this.overlayLoaderEl.addEventListener('transitionend', this.hideOverlay.bind(this));
    // オーバーレイ非表示が完了したら、オーバーレイ削除
    this.overlayEl.addEventListener('transitionend', this.deleteOverlay.bind(this));
  }

  /**
   * 初期化
   */
  init() {
    this.setAnim();
    this.hideHandler();
  }
}
