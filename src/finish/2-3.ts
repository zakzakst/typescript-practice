// Intersection Types
type Dog = {
  tail: string,
  bark: () => void,
};
type Bird = {
  wing: string,
  fly: () => void,
};
type Kimera = Dog & Bird;


// Union Types
let value: boolean | number | string
value = false;
value = 1;
value = '2';

let numberOrStrings: (number | string)[];
numberOrStrings = [0, '1'];
// numberOrStrings = [0, '1', false]; // error


// Literal Types
let users: 'Taro' | 'Jiro' | 'Hanako';
users = 'Taro';
// users = 'Saburo'; // error

let bit: 8 | 16 | 32 | 64;
bit = 8;
// bit = 12; // error

let truth: true
truth = true;
// truth = false; // error
