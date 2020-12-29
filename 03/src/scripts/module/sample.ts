export function sampleFunc() {
  console.log('sample');
}

export class SampleClass {
  text: String;

  constructor(text: String) {
    this.text = text;
  }

  console(): void {
    console.log(this.text);
  }
}

type sampleObj = {
  message: String
}

export const sampleObj = (text: String): sampleObj => {
  return {
    message: `this is ${text}`
  }
}
