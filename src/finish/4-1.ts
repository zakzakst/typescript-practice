function getFormattedValue(value: number | null) {
  if (value === null) return '-- pt';
  return `${value.toFixed(1)} pt`;
}
console.log(getFormattedValue(0.1));
console.log(getFormattedValue(0));
console.log(getFormattedValue(null));
// console.log(getFormattedValue('test')); // error

function greet(name?: string) {
  if (name === undefined) return 'Hello';
  return `Hello ${name.toUpperCase()}`;
}
console.log(greet());
console.log(greet('Taro'));


function getFormattedValue2(value: number, unit: string | null = null) {
  const _value = value.toFixed(1);
  if (unit === null) return `${_value}`;
  return `${_value} ${unit.toUpperCase()}`;
}


type User = {
  age?: number,
  name?: string,
};

function registerUser(user: User) {}
const maybeUser = {
  age: 26,
  name: 'Taro',
  gender: 'male',
};

const notUser = {
  gender: 'male',
  graduate: 'Tokyo',
};

registerUser(maybeUser);
// registerUser(notUser); // error


type State = {
  readonly id: number,
  name: string,
};
const state: State = {
  id: 1,
  name: 'Taro',
};
state.name = 'Hanako';
// state.id = 2; // error


type State2 = {
  id: number,
  name: string,
};
const state2: Readonly<State> = {
  id: 1,
  name: 'Taro',
}
// state2.name = 'Hanako'; // error
// state2.id = 2; // error


type State3 = {
  id: number,
  name: string,
};
const state3: State3 = {
  id: 1,
  name: 'Taro',
};
const frozenState = Object.freeze(state);
// frozenState.name = 'Hanako'; // error
// frozenState.id = 2; // error
