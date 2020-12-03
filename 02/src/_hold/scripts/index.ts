import { StopWatch } from './components/StopWatch';
import { Timer } from './components/Timer';

class App {
  stopWatch: StopWatch;
  timer: Timer;
  constructor(stopWatchSelector, timerSelector, interval) {
    this.stopWatch = new StopWatch(stopWatchSelector);
    this.timer = new Timer(timerSelector, interval);
  }
  init() {
    this.stopWatch.init();
    this.timer.init();
  }
}

const settings = {
  stopWatch: {
    text: '.sw-text',
    start: '.sw-control__start',
    stop: '.sw-control__stop',
    reset: '.sw-control__reset',
  },
  timer: {
    text: '.timer-text',
    form: '',
    inputSet: '.timer-input__container',
    input: '.timer-input',
    start: '.timer-control__start',
    stop: '.timer-control__stop',
    reset: '.timer-control__reset',
  },
  interval: 40,
};

const app = new App(settings.stopWatch, settings.timer, settings.interval);

app.init();
