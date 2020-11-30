import { Myself } from './components/Myself';
import { Opponent } from './components/Opponent';
import { Result } from './components/Result';
import { Reset } from './components/Reset';

const selector = {
  myself: '.myself',
  opponent: '.opponent',
  result: '.result',
  reset: '.reset',
};

class App {
  // TODO: classの型指定方法調べる
  myself: any;
  opponent: any;
  result: any;
  reset: any;
  constructor() {
    this.myself = new Myself(selector.myself);
    this.opponent = new Opponent(selector.opponent);
    this.result = new Result(selector.result);
    this.reset = new Reset(selector.reset);
  }
  init() {
    this.myself.init();
    this.opponent.init();
    this.result.hide();
    this.reset.hide();
  }
}
