import { Overlay } from './components/Overlay';

const config = {
  selectors: {
    overlay: '.my-overlay',
    overlayLoader: '.my-overlay__loader',
  },
  animDelay: .1,
  hideDelay: 3000,
};

const app = new Overlay(config.selectors, config.animDelay, config.hideDelay);

app.init();
