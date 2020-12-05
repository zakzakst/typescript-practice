/**
 * 要素の設定
 */
const base = {
  storageKey: 'storage'
};


/**
 * 共通の処理
 */
export const CommonModel = {
  // ストレージの読み込み
  getStorage() {
    const getjson = localStorage.getItem(base.storageKey);
    const obj = JSON.parse(getjson);
    return obj;
  },
  // ストレージの書き込み
  setStorage(obj) {
    const setjson = JSON.stringify(obj);
    localStorage.setItem(base.storageKey, setjson);
  },
  // URLパラメータの取得
  getParams() {
    let paramsObj = {};
    const params = location.search.substring(1).split('&');
    params.forEach(param => {
      const kv = param.split('=');
      paramsObj[kv[0]] = kv[1];
    });
    return paramsObj;
  }
}
