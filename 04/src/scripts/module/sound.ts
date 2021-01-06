'use strict';

export class Sound {
  audio: HTMLAudioElement;
  loop: boolean;
  loaded: boolean;
  playing: boolean;
  constructor(src: string, loop: boolean) {
    this.audio = new Audio(src);
    this.loop = loop;
    this.loaded = false;
    this.playing = false;
  }

  /**
   * 再生
   */
  play() {
    // 未ロード／再生中の場合は処理を中止
    if (!this.loaded || this.playing) return;
    this.playing = true;
    this.audio.play();
  }

  /**
   * 読込完了時の処理
   */
  loadHandler() {
    this.audio.addEventListener('loadeddata', () => {
      this.loaded = true;
    });
  }

  /**
   * 再生完了時の処理
   */
  loopHandler() {
    if (this.loop) {
      // ループ設定が true の場合は再生完了後に再度再生
      this.audio.addEventListener('ended', () => {
        this.audio.currentTime = 0;
        this.audio.play();
      });
    } else {
      // ループ設定が false の場合は再生中フラグを変更
      this.audio.addEventListener('ended', () => {
        this.audio.currentTime = 0;
        this.playing = false;
      });
    }
  }

  /**
   * 初期化
   */
  init() {
    this.audio.load();
    this.loadHandler();
    this.loopHandler();
  }
}
