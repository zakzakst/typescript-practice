export class GoogleSearch {
  baseUrl: string;
  constructor(key: string, cx: string) {
    this.baseUrl = `https://www.googleapis.com/customsearch/v1?key=${key}cx=${cx}&pws=0`;
  }
  /**
   * 検索結果を取得
   * @param query 検索クエリ
   * @return 検索結果データ取得のPromiseオブジェクト
   */
  getResult(query: string) {
    const url = `${this.baseUrl}&q=${encodeURI(query)}`;
    const promise = new Promise(resolve => {
      fetch(url)
        .then(res => {
          return res.json();
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          console.log(error);
        });
    });
    return promise;
  }
}
