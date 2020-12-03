type selectors = {
  upload: string,
  output: string,
  input: string,
};

export class FileUploader {
  uploadEl: HTMLElement;
  outputEl: HTMLElement;
  inputEl: HTMLElement;
  constructor(selectors: selectors) {
    this.uploadEl = document.getElementById(selectors.upload);
    this.outputEl = document.getElementById(selectors.output);
    this.inputEl = document.getElementById(selectors.input);
  }

  /**
   * ファイルの出力
   * @param file 出力するファイル
   */
  output(file: File) {
    const image = new Image();
    const blobURL = URL.createObjectURL(file);
    image.src = blobURL;
    image.addEventListener('load', () => {
      URL.revokeObjectURL(blobURL);
      this.outputEl.appendChild(image);
    });
  }

  /**
   * ファイルのドラッグイベント
   */
  fileOverHandler() {
    // 入った時
    this.uploadEl.addEventListener('dragover', e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
      this.uploadEl.classList.add('is-dragover');
    });
    // 出た時
    this.uploadEl.addEventListener('dragleave', () => {
      this.uploadEl.classList.remove('is-dragover');
    });
  }

  /**
   * ファイルのドロップイベント
   */
  fileDropHandler() {
    this.uploadEl.addEventListener('drop', e => {
      e.preventDefault();
      this.uploadEl.classList.remove('is-dragover');
      this.output(e.dataTransfer.files[0]);
    });
  }

  /**
   * ファイルの選択イベント
   */
  fileSelectHandler() {
    this.inputEl.addEventListener('change', (e: Event) => {
      const target = (<HTMLInputElement>e.target);
      this.output(target.files[0]);
    });
  }

  /**
   * 初期化
   */
  init() {
    this.fileOverHandler();
    this.fileDropHandler();
    this.fileSelectHandler();
  }
}
