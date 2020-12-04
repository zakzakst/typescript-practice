import { Calculator } from './components/Calculator';
import { Result } from './components/Result';

(() => {
  // 各種設定
  const appConfig = {
    selector: {
      btns: '.calculator-btn',
    }
  };
  const calcConfig = {
    selector: {
      num: '.calculator-calc__num',
      sign: '.calculator-calc__sign',
    },
    maxDigits: 10,
    defaultType: 'add',
  };
  const resultConfig = {
    selector: '.calculator-result__num',
  };

  // インスタンス作成
  const calculator = new Calculator(calcConfig);
  const result = new Result(resultConfig);

  // 初期化
  let resultInput = true;
  calculator.init();
  result.init();
  btnHandler();

  function btnHandler() {
    const btns = document.querySelector(appConfig.selector.btns);
    btns.addEventListener('click', e => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('calculator-btn__num')) {
        // 数字の場合
        actionNum(target);
      } else if (target.classList.contains('calculator-btn__sign')) {
        // 記号の場合
        actionSign(target);
      } else if (target.classList.contains('calculator-btn__result')) {
        // 結果の場合
        actionResult();
      } else if (target.classList.contains('calculator-btn__delete')) {
        // 削除の場合
        actionDelete();
      } else if (target.classList.contains('calculator-btn__clear')) {
        // クリアの場合
        calculator.init();
        result.init();
        resultInput = true;
      }
    });
  }

  function actionNum(target: HTMLElement) {
    const num = target.dataset['num'];
    if (resultInput) {
      const newNum = result.getNewResult(num);
      result.set(newNum);
    } else {
      const newNum = calculator.getNewNum(num);
      calculator.setNum(newNum);
    }
  }

  function actionSign(target: HTMLElement) {
    const type = target.dataset['calcType'];
    calculator.setType(type);
    resultInput = false;
  }

  function actionResult() {
    const currentResult = result.get();
    result.set(calculator.getCalcNum(currentResult));
    calculator.init();
  }

  function actionDelete() {
    if (resultInput) {
      const newNum = result.getDeleteResult(1);
      result.set(newNum);
    } else {
      const newNum = calculator.getDeleteNum(1);
      calculator.setNum(newNum);
    }
  }
})();
