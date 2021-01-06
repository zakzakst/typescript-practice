'use strict';

// import * as sample from './module/sample';
// sample.sampleFunc();
// const mySample = new sample.SampleClass('my sample');
// mySample.console();
// console.log(sample.sampleObj('sample').message);

import { Start } from './module/start';
const startConfig = {
  pagesClass: 'page',
  gamePageId: 'js-page-game',
  startBtnsClass: 'js-start-btn',
}
const start = new Start(startConfig);
start.init();
