export class Cookie {
  /**
   * クッキー取得
   * @return オブジェクト化したクッキー
   */
  read() {
    let cookieObj = {};
    const cookies = document.cookie;
    const cookieArray = cookies.split('; ');
    cookieArray.forEach(cookie => {
      const item = cookie.split('=');
      cookieObj[item[0]] = item[1];
    });
    return cookieObj;
  }
  /**
   * クッキー保存
   * @param obj 保存するデータ
   */
  save(obj) {
    Object.keys(obj).forEach(key => {
      document.cookie = `${key}=${obj[key]};`;
    });
  }
  /**
   * クッキークリア
   * @param obj クリアするデータ
   */
  clear(obj) {
    Object.keys(obj).forEach(key => {
      document.cookie = `${key}=; expires=0`;
    });
  }
}
