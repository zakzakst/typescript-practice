export class Storage {
  /**
   * 読み込み
   * @param key ストレージキー
   * @return オブジェクトに変換したストレージ
   */
  get(key: string) {
    const storage = localStorage.getItem(key);
    const storageObj = JSON.parse(storage);
    return storageObj;
  }
  /**
   * 書き込み
   * @param key ストレージキー
   * @param data 書き込むデータ
   */
  set(key: string, data) {
    const storage = JSON.stringify(data);
    localStorage.setItem(key, storage);
  }
}

export class Params {
  /**
   * 読み込み
   * @return オブジェクトに変換したパラメータ
   */
  get() {
    let paramsObj = {};
    const params = location.search.substring(1).split('&');
    params.forEach(param => {
      const kv = param.split('=');
      paramsObj[kv[0]] = kv[1];
    });
    return paramsObj;
  }
}
