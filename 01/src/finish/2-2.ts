// number型
let decimal: number = 256;
let hex: number = 0xfff;
let binary: number = 0b0000;
let octal: number = 0o123;

// string型
let color: string = "white";
color = 'black';
let myColor: string = `my color is ${color}`;

// array型
let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];

// tuple型
let x: [string, number];
x = ['hello', 10];
// x = [10, 'hello']; // error
console.log(x[0].substr(1));
// console.log(x[1].substr(1)); // error

// any型
let whatever: any = 0;
whatever = 'something';
whatever = false;

// unknown型
const probablyNumbers: unknown[] = ['0'];
// probablyNumbers[0].toFixed(1); // error

// void型
function logger(message: string): void {
  console.log(message);
}

// null型 undefined型
let u: undefined = undefined;
let n: null = null;

// never型
function error(message: string): never {
  throw new Error(message);
}
function infiniteLoop(): never {
  while (true) {
  }
}

// object型
let objectType: object;
// objectType = false; // error
objectType = {
  test: false,
};
