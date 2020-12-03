import { FileUploader } from './components/FileUploader';

const config = {
  selectors: {
    upload: 'js-file-upload',
    output: 'js-file-output',
    input: 'js-file-input',
  }
};

const app = new FileUploader(config.selectors);

app.init();
