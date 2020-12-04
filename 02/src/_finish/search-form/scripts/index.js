/**
 * 要素の設定
 */
const base = {
  elements: {
    keyword: document.search.keyword,
    keywordContainer: document.querySelector('.search__keyword-container'),
    reccomend: document.querySelector('.search__keyword-reccomend'),
    prefecture: document.search.prefecture,
    district: document.search.district,
    town: document.search.town,
    purpose: document.search.purpose,
    purposeSelect: document.querySelector('.purpose-select'),
    purposeClose: document.querySelectorAll('.purpose-select__close'),
    purposeList: document.querySelector('.purpose-select__list'),
    purposeBc: document.querySelector('.purpose-select__breadcrumb'),
    submit: document.search.submit,
  },
  keywordUrl: './js/keyword.json',
  placeUrl: './js/place.json',
  purposeUrl: './js/purpose.json',
  recMaxNum: 5,
};


/**
 * 状態の設定
 */
const state = {
  keywordData: null,
  currentRecItems: [],
  placeData: null,
  prefectureSelect: null,
  districtSelect: null,
  purposeData: null,
  categorySelect: null,
  genreSelect: null,
  purposeSelect: null,
  purposeBuffer: null,
};


/**
 * MODEL
 */
class CommonModel {
  getJsonData(url) {
    let data = new Promise((resolve) => {
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          resolve(data)
        })
        .catch(error => {
          console.log(error);
        });
    });
    return data
  }
}

class KeywordModel {
  setCorrentKeyword(keyword) {
    let newRecItem = [];
    for(let i = 0; i < state.keywordData.length; i++) {
      const data = state.keywordData[i];
      if(data.text.indexOf(keyword) !== -1 || data.hiragana.indexOf(keyword) !== -1) {
        newRecItem.push(data);
      }
      // 候補数がrecMaxNumより大きい場合は、候補の追加をやめる
      if(newRecItem.length > base.recMaxNum - 1) {
        break;
      }
    }
    state.currentRecItems = newRecItem;
  }
}


/**
 * VIEW
 */
const keywordView = {
  inputEl: base.elements.keyword,
  reccomendEl: base.elements.reccomend,
  showRec() {
    this.reccomendEl.classList.remove('is-hidden');
  },
  hideRec() {
    this.reccomendEl.classList.add('is-hidden');
    this.reccomendEl.innerHTML = '';
  },
  changeRecItem() {
    const recItems = state.currentRecItems;
    let markup = '';
    recItems.forEach(item => {
      markup += `
        <a class="search__keyword-item panel-block" data-keyword-text="${item.text}">
          <span class="panel-icon">
            <i class="${item.icon}" aria-hidden="true"></i>
          </span>
          ${item.text}
        </a>
      `;
    });
    this.reccomendEl.innerHTML = markup;
  },
  clearRecItem() {
    state.currentRecItems = [];
  }
}

const placeView = {
  prefEl: base.elements.prefecture,
  distEl: base.elements.district,
  townEl: base.elements.town,
  init() {
    this.prefClear();
  },
  prefClear() {
    this.distClear();
    this.prefEl.innerHTML = '';
    this.prefEl.setAttribute('disabled', true);
    state.prefectureSelect = null;
  },
  distClear() {
    this.townClear();
    this.distEl.innerHTML = '';
    this.distEl.setAttribute('disabled', true);
    state.districtSelect = null;
  },
  townClear() {
    this.townEl.innerHTML = '';
    this.townEl.setAttribute('disabled', true);
  },
  prefRender(prefList) {
    let markup = '<option value="">選択してください</option>';
    prefList.forEach(pref => {
      markup += `<option value="${state.placeData[pref].id}">${state.placeData[pref].text}</option>`;
    });
    this.prefEl.insertAdjacentHTML('beforeend', markup);
    this.prefEl.removeAttribute('disabled');
  },
  distRender(distList) {
    const distData = state.placeData[state.prefectureSelect].dists;
    let markup = '<option value="">選択してください</option>';
    distList.forEach(dist => {
      markup += `<option value="${distData[dist].id}">${distData[dist].text}</option>`;
    });
    this.distEl.insertAdjacentHTML('beforeend', markup);
    this.distEl.removeAttribute('disabled');
    this.distEl.focus();
  },
  townRender(townList) {
    let markup = '<option value="">選択してください</option>';
    townList.forEach(town => {
      markup += `<option value="${town.id}">${town.text}</option>`;
    });
    this.townEl.insertAdjacentHTML('beforeend', markup);
    this.townEl.removeAttribute('disabled');
    this.townEl.focus();
  }
}

const purposeView = {
  inputEl: base.elements.purpose,
  modalEl: base.elements.purposeSelect,
  closeEl: base.elements.purposeClose,
  listEl: base.elements.purposeList,
  modalOpen() {
    // 現在の選択状態をバッファを取って初期化
    this.setBuffer();
    state.categorySelect = '';
    state.genreSelect = '';
    state.purposeSelect = '';
    // モーダルを表示
    this.modalEl.classList.add('is-active');
    this.showCategory();
  },
  modalClose() {
    this.modalEl.classList.remove('is-active');
  },
  setList(type, keys) {
    let markup = '';
    keys.forEach(key => {
      const item = state.purposeData[type][key];
      markup += `
        <li>
          <a class="panel-block" data-item-type="${type}" data-item-id="${item.id}">${item.text}</a>
        </li>
      `;
    });
    this.listEl.innerHTML = markup;
  },
  showBreadCrumbs(type) {
    // パンくず先頭要素の生成
    const bcIndexEl = document.createElement('li');
    bcIndexEl.innerHTML = `<a data-bc-type="index">目的</a>`;
    // パンくず「category」要素の生成
    const bcCategoryText = state.purposeData['categories'][state.categorySelect] || '';
    const bcCategoryEl = document.createElement('li');
    bcCategoryEl.innerHTML = `<a data-bc-type="category">${bcCategoryText.text}</a>`;
    // パンくず「genre」要素の生成
    const bcGenreText = state.purposeData['genres'][state.genreSelect] || '';
    const bcGenreEl = document.createElement('li');
    bcGenreEl.innerHTML = `<a data-bc-type="genre">${bcGenreText.text}</a>`;

    // 一度パンくずを空にする
    base.elements.purposeBc.innerHTML = '';
    switch (type) {
      case 'init':
        base.elements.purposeBc.appendChild(bcIndexEl);
        bcIndexEl.classList.add('is-active');
        break;
      case 'category':
        base.elements.purposeBc.appendChild(bcIndexEl);
        base.elements.purposeBc.appendChild(bcCategoryEl);
        bcCategoryEl.classList.add('is-active');
        break;
      case 'genre':
        base.elements.purposeBc.appendChild(bcIndexEl);
        base.elements.purposeBc.appendChild(bcCategoryEl);
        base.elements.purposeBc.appendChild(bcGenreEl);
        bcGenreEl.classList.add('is-active');
        break;

      default:
        break;
    }
  },
  showCategory() {
    this.setList('categories', Object.keys(state.purposeData['categories']));
    this.showBreadCrumbs('init');
  },
  showGenre() {
    this.setList('genres', state.purposeData['categories'][state.categorySelect].genres);
    this.showBreadCrumbs('category');
  },
  showPurpose() {
    this.setList('purposes', state.purposeData['genres'][state.genreSelect].purposes);
    this.showBreadCrumbs('genre');
  },
  setPurpose() {
    const catText = state.purposeData['categories'][state.categorySelect].text;
    const genText = state.purposeData['genres'][state.genreSelect].text;
    const purText = state.purposeData['purposes'][state.purposeSelect].text;
    // テキストを入力欄に記載
    this.inputEl.value = `${catText} ／ ${genText} ／ ${purText}`;
    // モーダルを閉じる
    this.modalClose();
  },
  setBuffer() {
    state.purposeBuffer = {
      category: state.categorySelect,
      genre: state.genreSelect,
      purpose: state.purposeSelect,
    };
  },
  returnSelect() {
    state.categorySelect = state.purposeBuffer.category;
    state.genreSelect = state.purposeBuffer.genre;
    state.purposeSelect = state.purposeBuffer.purpose;
    state.purposeBuffer = null;
  }
}


/**
 * CONTROLLER
 */
function init() {
  // ■ 初期化
  // 1.画面初期化
  placeView.init();
  // 2.インスタンス作成
  state.commonIns = new CommonModel();
  state.keywordIns = new KeywordModel();
  // 3.場所データの読み込み
  const placeDataLoad = state.commonIns.getJsonData(base.placeUrl);
  // 4.場所の初期描画
  placeDataLoad.then((data) => {
    // データをstateに保持
    state.placeData = data;
    // jsonから都道府県のリストを取得
    const prefList = Object.keys(state.placeData);
    // リストから選択項目を描画
    placeView.prefRender(prefList);
  });

  // ■ 場所：都道府県の選択変更時のイベント
  base.elements.prefecture.addEventListener('change', e => {
    // 1.stateの選択都道府県に項目を入れる
    const prefId = e.target.value;
    state.prefectureSelect = prefId;
    // 「選択した項目の配下に区がない場合」「選択してください」かで条件分岐
    if(prefId === '' || state.placeData[prefId].dists.length === 0) {
      placeView.distClear();
    } else {
      // 2.場所：区の選択項目を初期化
      placeView.distClear();
      // 3.選択された都道府県のidから区のリストを取得
      const distList = Object.keys(state.placeData[state.prefectureSelect].dists);
      placeView.distRender(distList);
    }
  });

  // ■ 場所：区の選択変更時のイベント
  base.elements.district.addEventListener('change', e => {
    // 1.stateの選択区に項目を入れる
    const distId = e.target.value;
    state.districtSelect = distId;
    // 2.選択された区のidから町のリストを取得
    const townList = state.placeData[state.prefectureSelect].dists[distId];
    // 「選択した項目の配下に町がない場合」「選択してください」かで条件分岐
    if(distId === '' || townList.towns.length === 0) {
      placeView.townClear();
    } else {
      // 3.場所：町の選択項目を初期化
      placeView.townClear();
      // 4.町の選択項目を描画
      placeView.townRender(townList.towns);
    }
  });

  // ■ キーワードデータを読み終わったタイミングでレコメンド表示のイベントを設定する
  const keywordDataLoad = state.commonIns.getJsonData(base.keywordUrl);
  keywordDataLoad.then((data) => {
    // キーワードデータのデータを設定
    state.keywordData = data;

    // キーワードの入力内容に変化があった時のイベント
    base.elements.keyword.addEventListener('input', () => {
      const el = base.elements.keyword;
      if(el.value === '') {
        keywordView.hideRec();
        keywordView.clearRecItem();
      } else {
        state.keywordIns.setCorrentKeyword(el.value);
        keywordView.changeRecItem();
        keywordView.showRec();
      }
    });

    // キーワードからフォーカスが外れた時のイベント
    base.elements.keyword.addEventListener('blur', e => {
      // 検索候補クリック時の挙動を有効にするために実行タイミングを送らせている
      // タブでの移動時に上手く選択できない
      // （※改善の課題）
      setTimeout(() => {
        keywordView.hideRec();
        keywordView.clearRecItem();
      }, 100);
    });

    // キーワード候補をクリックした時のイベント
    base.elements.reccomend.addEventListener('click', e => {
      base.elements.keyword.value = e.target.dataset.keywordText;
      base.elements.keyword.focus();
    });
  });

  // ■ 目的データを読み終わったタイミングでモーダル表示のイベントを設定する
  const purposeDataLoad = state.commonIns.getJsonData(base.purposeUrl);
  purposeDataLoad.then((data) => {
    // 目的データのデータを設定
    state.purposeData = data;

    // 目的入力欄にフォーカスが当たった時のイベント
    base.elements.purpose.addEventListener('focus', () => {
      purposeView.modalOpen();
    });

    // モーダルの閉じるボタンクリック時のイベント
    Array.from(base.elements.purposeClose).forEach(el => {
      el.addEventListener('click', () => {
        purposeView.returnSelect();
        purposeView.modalClose();
      });
    })

    // 目的リストクリック時のイベント
    base.elements.purposeList.addEventListener('click', e => {
      e.preventDefault();
      const el = e.target;
      switch (el.dataset.itemType) {
        case 'categories':
          state.categorySelect = el.dataset.itemId;
          purposeView.showGenre();
          break;
        case 'genres':
          state.genreSelect = el.dataset.itemId;
          purposeView.showPurpose();
          break;
        case 'purposes':
          state.purposeSelect = el.dataset.itemId;
          purposeView.setPurpose();
          break;
        default:
          break;
      }
    });

    // 目的パンくずクリック時のイベント
    base.elements.purposeBc.addEventListener('click', e => {
      switch (e.target.dataset.bcType) {
        case 'index':
          purposeView.showCategory();
          break;
        case 'category':
          purposeView.showGenre();
          break;
        default:
          break;
      }
    });
  });
}


/**
 * 実行
 */
init();
