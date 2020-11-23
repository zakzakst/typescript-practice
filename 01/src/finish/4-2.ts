const defaultTheme = {
  backgroundColor: 'orange' as 'orange',
  borderColor: 'red' as 'red',
};
// defaultTheme.backgroundColor = 'blue'; // error

type User = {
  name: string,
  [k: string]: number | string,
}


type Answer = 'mighty' | 'lot' | 'few' | 'entirely';
type User2 = {
  name: string,
  enquete: { [k: string]: Answer | undefined },
};
const userA: User2 = {
  name: 'Taro',
  enquete: {
    exercise_habits: 'entirely',
    time_of_sleeping: 'few',
  }
};

type Question = 'exercise_habits' | 'time_of_sleeping';
type User3 = {
  name: string,
  enquete: { [K in Question]?: Answer }
}
const userB: User3 = {
  name: 'Taro',
  enquete: {
    exercise_habits: 'entirely',
    time_of_sleeping: 'few',
  },
};
const x = userB.enquete['exercise_habits'];
// const y = userB.enquete['steps_per_day']; // error


interface Functions {
  [k: string]: Function
}

const functions: Functions = {
  // name: 'Taro', // error
  // age: 28, // error
  walk: () => {},
}

export default {
  increment: 'INCREMENT',
  decrement: 'DECREMENT',
  setCount: 'SET_COUNT',
} as const;
