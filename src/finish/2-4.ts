// typeof キーワード
let asString: string = '';
let value2: typeof asString;
value2 = 'value';
// value2 = 0; // error

let myObject = { foo: 'foo' };
let anotherObject: typeof myObject = { foo: '' };
anotherObject['foo'] = 'value';
// anotherObject['bar'] = 'value'; // error


// keyof キーワード
const myObject2 = {
  foo: 'FOO',
  bar: 'BAR',
  baz: 'BAZ',
};
let myObjectKey: keyof typeof myObject2;
myObjectKey = 'bar';
// myObjectKey = 'qux'; // error

const indexedObject = {
  0: 0,
  1: 1,
};
let indexedKey: keyof typeof indexedObject;
indexedKey = 1;
// indexedKey = 2; // error
