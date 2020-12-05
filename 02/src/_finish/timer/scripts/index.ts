import { StopWatch } from './components/StopWatch';
import { Timer } from './components/Timer';
import { Tabs } from './components/Tabs';

class App {
  stopWatch: StopWatch;
  timer: Timer;
  tabs: Tabs;
  constructor(stopWatchSelector, timerSelector, interval, tabsConfig) {
    this.stopWatch = new StopWatch(stopWatchSelector, interval);
    this.timer = new Timer(timerSelector, interval);
    this.tabs = new Tabs(tabsConfig.selector, tabsConfig.contentList);
  }
  init() {
    this.stopWatch.init();
    this.timer.init();
    this.tabs.init();
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
    form: document.timerForm,
    inputSet: '.timer-input__container',
    input: '.timer-input',
    start: '.timer-control__start',
    stop: '.timer-control__stop',
    reset: '.timer-control__reset',
  },
  interval: 40,
  tabsConfig: {
    selector: {
      tab: '.tabs__container',
      content: '.contents',
    },
    contentList: [
      {id: 'sw', text: 'ストップウォッチ'},
      {id: 'timer', text: 'タイマー'},
    ]
  }
};

const app = new App(settings.stopWatch, settings.timer, settings.interval, settings.tabsConfig);

app.init();
