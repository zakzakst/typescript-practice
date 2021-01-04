export function sampleFunc() {
  console.log('sample');
}

export class SampleClass {
  text: string;

  constructor(text: string) {
    this.text = text;
  }

  console(): void {
    console.log(this.text);
  }
}

type sampleObj = {
  message: string
}

export const sampleObj = (text: string): sampleObj => {
  return {
    message: `this is ${text}`
  }
}
