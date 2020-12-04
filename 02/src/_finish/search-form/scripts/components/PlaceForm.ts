import { getJson } from '../functions';

type config = {
  selector: {
    prefecture: HTMLSelectElement,
    district: HTMLSelectElement,
    town: HTMLSelectElement,
  },
  dataUrl: string,
};

export class PlaceForm {
  prefEl: HTMLSelectElement;
  distEl: HTMLSelectElement;
  townEl: HTMLSelectElement;
  dataUrl: string;
  data;
  prefSelect: string;
  distSelect: string;
  constructor(config: config) {
    this.prefEl = config.selector.prefecture;
    this.distEl = config.selector.district;
    this.townEl = config.selector.town;
    this.dataUrl = config.dataUrl;
    this.data = null;
    this.prefSelect = '';
    this.distSelect = '';
  }
  /**
   * データの設定
   * @return データ設定のPromiseオブジェクト
   */
  setData() {
    const promise = new Promise(async resolve => {
      const data = await getJson(this.dataUrl);
      this.data = data;
      resolve(data);
    });
    return promise;
  }
  /**
   * 都道府県項目設定
   */
  setPref() {
    const keys = Object.keys(this.data);
    let markup = '<option value="">選択してください</option>';
    keys.forEach(key => {
      markup += `<option value="${this.data[key].id}">${this.data[key].text}</option>`;
    });
    this.prefEl.innerHTML = markup;
  }
  /**
   * 区項目設定
   */
  setDist() {
    const items = this.data[this.prefSelect].dists;
    const keys = Object.keys(items);
    let markup = '<option value="">選択してください</option>';
    keys.forEach(key => {
      markup += `<option value="${items[key].id}">${items[key].text}</option>`;
    });
    this.distEl.innerHTML = markup;
    this.distEl.removeAttribute('disabled');
  }
  /**
   * 町項目設定
   */
  setTown() {
    const items = this.data[this.prefSelect].dists[this.distSelect].towns;
    const keys = Object.keys(items);
    let markup = '<option value="">選択してください</option>';
    keys.forEach(key => {
      markup += `<option value="${items[key].id}">${items[key].text}</option>`;
    });
    this.townEl.innerHTML = markup;
    this.townEl.removeAttribute('disabled');
  }
  /**
   * 都道府県クリア
   */
  clearPref() {
    this.clearDist();
    this.prefSelect = '';
  }
  /**
   * 区クリア
   */
  clearDist() {
    this.clearTown();
    this.distSelect = '';
    this.distEl.innerHTML = '';
    this.distEl.setAttribute('disabled', 'true');
  }
  /**
   * 町クリア
   */
  clearTown() {
    this.townEl.innerHTML = '';
    this.townEl.setAttribute('disabled', 'true');
  }
  /**
   * 都道府県選択イベント
   */
  selectPrefHandler() {
    this.prefEl.addEventListener('change', e => {
      const target = e.target as HTMLSelectElement;
      const prefId = target.value;
      this.prefSelect = prefId;
      this.clearDist();
      if(prefId !== '' && this.data[prefId].dists.length !== 0) {
        this.setDist();
      }
    });
  }
  /**
   * 区選択イベント
   */
  selectDistHandler() {
    this.distEl.addEventListener('change', e => {
      const target = e.target as HTMLSelectElement;
      const distId = target.value;
      this.distSelect = distId;
      this.clearTown();
      if(distId !== '' && this.data[this.prefSelect].dists[distId].towns.length !== 0) {
        this.setTown();
      }
    })
  }
  /**
   * 初期化
   */
  async init() {
    await this.setData();
    this.setPref();
    this.selectPrefHandler();
    this.selectDistHandler();
  }
}
