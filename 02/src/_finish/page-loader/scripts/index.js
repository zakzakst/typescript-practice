/**
 * 要素の設定
 */
const base = {
  elements: {
    overlay: document.querySelector('.my-overlay'),
    overlayLoader: document.querySelector('.my-overlay__loader'),
  }
};


/**
 * 状態の設定
 */
const state = {
};


/**
 * MODEL
 */


/**
 * VIEW
 */
const overlayView = {
  overlayEl: base.elements.overlay,
  loaderEl: base.elements.overlayLoader,
  loaderAnimDelay: 0.1,
  loaderAnim() {
    // 1.ローダーに記載されている文字列を取得して、1文字ずつの配列にする
    const str = base.elements.overlayLoader.textContent;
    const strArray = str.split('');
    // 2.ローダー要素を空にする
    this.loaderEl.innerHTML = '';
    // 3.各文字をspanタグでくくってローダー要素に追加する
    strArray.forEach((letter, index) => {
      const spanEl = document.createElement('span');
      spanEl.textContent = letter;
      spanEl.style.animationDelay = `${this.loaderAnimDelay * index}s`;
      this.loaderEl.appendChild(spanEl);
    });
  },
  loaderHide() {
    this.loaderEl.classList.add('my-is-hidden');
    // this.loaderEl.removeEventListener('transitionend', this.overlayHide);
  },
  overlayHide() {
    console.log('test');
    overlayView.overlayEl.classList.add('my-is-hidden');
  },
  init() {
    this.loaderEl.addEventListener('transitionend', this.overlayHide);
    this.overlayEl.addEventListener('transitionend', this.overlayDelete);
    this.loaderAnim();
  },
  overlayDelete() {
    // console.log(overlayView.overlayEl);
    overlayView.overlayEl.style.display = 'none';
    overlayView.overlayEl.removeEventListener('transitionend', overlayView.overlayDelete);
  }
}


/**
 * CONTROLLER
 */
function init() {
  overlayView.init();
  setTimeout(() => {
    overlayView.loaderHide();
    // setTimeout(() => {
    //   overlayView.overlayHide();
    // }, 1000);
  }, 3000);
}


/**
 * 実行
 */
init();
