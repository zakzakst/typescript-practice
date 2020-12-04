// TODO: 入る文字列が限定された型の指定方法調べる
// type calcType = 'add' | 'subtract' | 'multiple' | 'division';
type calcType = string;

const calcTypes = {
  division: {id: 'division', text: '÷'},
  multiple: {id: 'multiple', text: '×'},
  subtract: {id: 'subtract', text: '-'},
  add: {id: 'add', text: '+'},
};

type config = {
  selector: {
    num: string,
    sign: string,
  },
  maxDigits: number,
  defaultType: calcType,
};

export class Calculator {
  numEl: HTMLElement;
  signEl: HTMLElement;
  maxDigits: number;
  type: calcType;
  defaultType: calcType;
  constructor(config: config) {
    this.numEl = document.querySelector(config.selector.num);
    this.signEl = document.querySelector(config.selector.sign);
    this.maxDigits = config.maxDigits;
    this.type = config.defaultType;
    this.defaultType = config.defaultType;
  }
  /**
   * 計算結果の数値を取得
   * @param currentResult 現在の計算結果
   * @return 計算結果
   */
  getCalcNum(currentResult: string): string {
    // 入力した数値を取得
    const num = Number(this.numEl.textContent);
    let newNum;
    switch (this.type) {
      case 'add':
        newNum = Number(currentResult) + num;
        break;

      case 'subtract':
        newNum = Number(currentResult) - num;
        break;

      case 'multiple':
        newNum = Number(currentResult) * num;
        break;

      case 'division':
        newNum = Number(currentResult) / num;
        break;

      default:
        console.log('error');
        break;
    }
    // 計算結果の桁数がmaxDigits以上の場合はerrorを表示
    if (newNum.toString().length > this.maxDigits) {
      return 'error';
    } else {
      return newNum;
    }
  }
  /**
   * 既存の数値に入力した数値を追加した数値を取得
   * @param num 入力した数値
   * @return 数値を追加した数値
   */
  getNewNum(num: string): string {
    let newNum = this.numEl.textContent;
    if (newNum === '0' && num !== '.') {
      newNum = num;
    } else {
      if (newNum.indexOf('.') === -1 || num !== '.') {
        newNum += num;
      }
    }
    return newNum;
  }
  /**
   * 既存の数値から引数の文字数を削除した数値を取得
   * @param num 削除する文字数
   * @return 文字を削除した数値
   */
  getDeleteNum(sliceNum: number): string {
    const num = this.numEl.textContent;
    let newNum;
    if (num.length > 1) {
      newNum = num.slice(0, -1 * sliceNum);
    } else {
      newNum = '0';
    }
    return newNum;
  }
  /**
   * 初期化
   */
  init() {
    this.numEl.textContent = '0';
    this.clearType();
  }
  /**
   * 数値のセット
   * @param num 数値
   */
  setNum(num: string) {
    this.numEl.textContent = num;
  }
  /**
   * 計算タイプのセット
   * @param type 計算タイプ
   */
  setType(type: calcType) {
    this.type = type;
    this.signEl.textContent = calcTypes[type].text;
  }
  /**
   * 計算タイプのクリア
   */
  clearType() {
    // デフォルトの計算タイプを設定
    this.type = this.defaultType;
    this.signEl.textContent = calcTypes[this.defaultType].text;
  }
}
