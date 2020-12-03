/**
 * 要素の設定
 */
const elements = {
  uploadArea: document.getElementById('js-file-upload'),
  outputArea: document.getElementById('js-file-output'),
  fileInput: document.getElementById('js-file-input'),
};


/**
 * ファイルオーバー関連の関数
 */
function fileOverInit() {
  elements.uploadArea.addEventListener('dragover', e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    elements.uploadArea.classList.add('is-dragover');
  });
  elements.uploadArea.addEventListener('dragleave', () => {
    elements.uploadArea.classList.remove('is-dragover');
  });
}

/**
 * ファイルドロップ関連の関数
 */
function fileDropInit() {
  elements.uploadArea.addEventListener('drop', e => {
    e.preventDefault();
    elements.uploadArea.classList.remove('is-dragover');
    fileOutput(e.dataTransfer.files[0]);
  });
}

/**
 * ファイル参照関連の関数
 */
function fileSelectInit() {
  elements.fileInput.addEventListener('change', e => {
    fileOutput(e.target.files[0]);
  });
}

/**
 * ファイル出力関連の関数
 */
function fileOutput(file) {
  console.log(file);
  const image = new Image();
  const blobURL = URL.createObjectURL(file);
  image.src = blobURL;
  image.addEventListener('load', () => {
    URL.revokeObjectURL(blobURL);
    elements.outputArea.appendChild(image);
  });
}

/**
 * 初期化関連の関数
 */
function init() {
  fileOverInit();
  fileDropInit();
  fileSelectInit();
}


/**
 * 実行
 */
init();
