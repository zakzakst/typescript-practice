'use strict';

import { Sound } from './sound';

type startConfig = {
  pagesClass: string,
  gamePageId: string,
  startBtnsClass: string,
  bgmSrc: string,
}

export class Start {
  pagesEl;
  gamePageEl: HTMLElement;
  startBtnsEl;
  bgm: Sound;
  constructor(config: startConfig) {
    this.pagesEl = document.querySelectorAll(`.${config.pagesClass}`);
    this.gamePageEl = document.getElementById(config.gamePageId);
    this.startBtnsEl = document.querySelectorAll(`.${config.startBtnsClass}`);
    this.bgm = new Sound(config.bgmSrc, true);
  }

  /**
   * BGMを開始
   */
  startBgm(): void {
    console.log('BGMを開始');
    this.bgm.play();
  }

  /**
   * ゲームを開始
   */
  startGame(): void {
    [...this.pagesEl].forEach((el: HTMLElement) => {
      el.classList.remove('is-active');
    });
    this.gamePageEl.classList.add('is-active');
  }

  /**
   * ゲーム開始ボタンクリック時の挙動
   */
  startHandler(): void {
    [...this.startBtnsEl].forEach((el: HTMLElement) => {
      el.addEventListener('click', e => {
        e.preventDefault();
        // 音声がonの場合、BGMを開始
        const target = <HTMLElement>e.target;
        if (target.dataset.sound) {
          this.startBgm();
        }
        // ゲームを開始
        this.startGame();
      });
    });
  }

  /**
   * 初期化
   */
  init(): void {
    console.log('スタート画面初期化');
    this.bgm.init();
    this.startHandler();
  }
}
