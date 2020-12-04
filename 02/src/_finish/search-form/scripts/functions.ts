/**
 * JSONデータの取得
 * @param url JSONファイルのURL
 * @return データ取得のPromiseオブジェクト
 */
export function getJson(url: string) {
  // TODO: Promiseの型調べる
  let promise = new Promise(resolve => {
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        console.log('error');
        resolve(error);
      });
  });
  return promise;
}
