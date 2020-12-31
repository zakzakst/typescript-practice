'use strict';

// import * as sample from './module/sample';
// sample.sampleFunc();
// const mySample = new sample.SampleClass('my sample');
// mySample.console();
// console.log(sample.sampleObj('sample').message);

import { Chat } from './module/chat';
import chatData from './data/chat-data.json';

const chat = new Chat({
  messagesElId: 'messages',
  inputElId: 'input',
  submitElId: 'submit',
  formElId: 'form',
  chatData,
  firstQuestionId: 'q1',
});
chat.init();
