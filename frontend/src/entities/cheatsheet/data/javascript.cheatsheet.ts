import type { CheatsheetData } from "../model/types";

export const javascriptCheatsheet: CheatsheetData = {
  category: "JavaScript",
  title: "JavaScript Cheat Sheet",
  subtitle:
    "A comprehensive JavaScript quick reference including ES6+ syntax, common patterns, and built-in methods.",
  sections: [
    // ── Getting Started ──────────────────────────────────────────────────
    {
      id: "getting-started",
      title: "Getting Started",
      cards: [
        {
          id: "console",
          title: "Console",
          lang: "js",
          code: `// -> Hello world!
console.log('Hello world!');

// -> Hello QuickRef.Me
console.warn('hello %s', 'QuickRef.Me');

// Prints error message to stderr
console.error(new Error('Oops!'));`,
        },
        {
          id: "numbers",
          title: "Numbers",
          lang: "js",
          code: `let amount = 6;
let price = 4.99;
let billion = 1_000_000_000;
let hex = 0xff;
let float = 1.5e3; // 1500`,
        },
        {
          id: "variables",
          title: "Variables",
          lang: "js",
          code: `let x = null;
let name = "Tammy";
const found = false;

// -> Tammy, false, null
console.log(name, found, x);

var a;
console.log(a); // -> undefined`,
        },
        {
          id: "strings",
          title: "Strings",
          lang: "js",
          code: `let single = 'Wheres my bandit hat?';
let double = "Wheres my bandit hat?";

// -> 21
console.log(single.length);`,
        },
        {
          id: "arithmetic",
          title: "Arithmetic Operators",
          lang: "js",
          code: `5 + 5 = 10     // Addition
10 - 5 = 5    // Subtraction
5 * 10 = 50   // Multiplication
10 / 5 = 2    // Division
10 % 5 = 0    // Modulo`,
        },
        {
          id: "comments",
          title: "Comments",
          lang: "js",
          code: `// This line will denote a comment

/*
The below configuration must be
changed before deployment.
*/`,
        },
        {
          id: "string-interpolation",
          title: "String Interpolation",
          lang: "js",
          code: `let age = 7;

// String concatenation
'Tommy is ' + age + ' years old.';

// String interpolation
\`Tommy is \${age} years old.\`;`,
        },
        {
          id: "assignment",
          title: "Assignment Operators",
          lang: "js",
          code: `let number = 100;

// Both statements will add 10
number = number + 10;
number += 10;

console.log(number); // -> 120`,
        },
      ],
    },

    // ── Conditionals ─────────────────────────────────────────────────────
    {
      id: "conditionals",
      title: "Conditionals",
      cards: [
        {
          id: "if-else",
          title: "if / else if / else",
          lang: "js",
          code: `const isMailSent = true;

if (isMailSent) {
  console.log('Mail sent to recipient');
}

const x = 0;
if (x < 0) {
  console.log('Negative');
} else if (x === 0) {
  console.log('Zero');
} else {
  console.log('Positive');
}`,
        },
        {
          id: "ternary",
          title: "Ternary Operator",
          lang: "js",
          code: `const age = 18;
const status = age >= 18
  ? 'Adult'
  : 'Minor';

console.log(status); // -> Adult`,
        },
        {
          id: "switch",
          title: "Switch Statement",
          lang: "js",
          code: `const food = 'salad';

switch (food) {
  case 'oyster':
    console.log('The taste of the sea');
    break;
  case 'pizza':
    console.log('A delicious pie');
    break;
  default:
    console.log('Enjoy your meal');
}`,
        },
        {
          id: "logical-ops",
          title: "Logical Operators",
          lang: "js",
          code: `true && false  // false  (AND)
true || false  // true   (OR)
!true          // false  (NOT)

// Nullish coalescing
null ?? 'default'     // 'default'
undefined ?? 'value'  // 'value'
0 ?? 'nope'           // 0

// Optional chaining
user?.profile?.avatar`,
        },
      ],
    },

    // ── Functions ────────────────────────────────────────────────────────
    {
      id: "functions",
      title: "Functions",
      cards: [
        {
          id: "function-decl",
          title: "Function Declaration",
          lang: "js",
          code: `function add(x, y) {
  return x + y;
}
console.log(add(5, 2)); // 7`,
        },
        {
          id: "arrow-function",
          title: "Arrow Functions",
          lang: "js",
          code: `// Regular arrow function
const add = (x, y) => x + y;

// With body
const greet = (name) => {
  return \`Hello, \${name}!\`;
};

// No params
const sayHi = () => 'Hi!';`,
        },
        {
          id: "default-params",
          title: "Default Parameters",
          lang: "js",
          code: `function greet(name = 'stranger') {
  return \`Hello, \${name}!\`;
}

greet();         // Hello, stranger!
greet('Alice');  // Hello, Alice!`,
        },
        {
          id: "rest-spread",
          title: "Rest & Spread",
          lang: "js",
          code: `// Rest params
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3); // 6

// Spread operator
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];
// [1, 2, 3, 4, 5]`,
        },
        {
          id: "regular-vs-arrow",
          title: "Regular vs Arrow Functions",
          lang: "js",
          code: `// 1. 'this' Binding:
// Regular functions dynamically bind 'this' based on how they are called.
// Arrow functions lexically bind 'this' (inherit it from surrounding scope).

// 2. Constructors (using 'new'):
// Regular functions can be constructor functions.
function Person(name) { this.name = name; }
const p = new Person('Alice'); // Works!

// Arrow functions cannot be used with 'new'.
const Animal = (name) => { this.name = name; };
// new Animal('Dog'); // TypeError: Animal is not a constructor

// 3. 'arguments' Object:
// Regular functions have access to 'arguments' array-like object.
// Arrow functions do not (use ...args rest parameter instead).`,
        },
      ],
    },

    // ── Arrays ───────────────────────────────────────────────────────────
    {
      id: "arrays",
      title: "Arrays",
      cards: [
        {
          id: "array-basics",
          title: "Array Basics",
          lang: "js",
          code: `const fruits = ['apple', 'banana'];

fruits.push('orange');  // add to end
fruits.pop();           // remove from end
fruits.unshift('mango');// add to front
fruits.shift();         // remove from front

console.log(fruits.length); // 2`,
        },
        {
          id: "array-methods",
          title: "Array Methods",
          lang: "js",
          code: `const nums = [1, 2, 3, 4, 5];

// map — transform each element
nums.map(n => n * 2); // [2,4,6,8,10]

// filter — keep matching elements
nums.filter(n => n > 2); // [3,4,5]

// reduce — accumulate
nums.reduce((sum, n) => sum + n, 0); // 15

// find — first match
nums.find(n => n > 3); // 4

// includes — check existence
nums.includes(3); // true`,
        },
        {
          id: "destructuring-arr",
          title: "Array Destructuring",
          lang: "js",
          code: `const [first, second, ...rest] = [1, 2, 3, 4];
// first = 1, second = 2, rest = [3, 4]

// Swap variables
let a = 1, b = 2;
[a, b] = [b, a];
// a = 2, b = 1`,
        },
        {
          id: "for-loops",
          title: "Loops",
          lang: "js",
          code: `const arr = ['a', 'b', 'c'];

// for...of
for (const item of arr) {
  console.log(item);
}

// forEach
arr.forEach((item, index) => {
  console.log(index, item);
});

// for...in (objects)
const obj = { x: 1, y: 2 };
for (const key in obj) {
  console.log(key, obj[key]);
}`,
        },
        {
          id: "remove-duplicates",
          title: "Remove Array Duplicates",
          lang: "js",
          code: `const arr = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];

// 1. Using Set (ES6 - Recommended)
const unique1 = [...new Set(arr)];

// 2. Using filter & indexOf
const unique2 = arr.filter((item, idx) => arr.indexOf(item) === idx);

// 3. Manual approach without built-in functions
function removeDuplicates(input) {
  const unique = [];
  for (let i = 0; i < input.length; i++) {
    let exists = false;
    for (let j = 0; j < unique.length; j++) {
      if (input[i] === unique[j]) {
        exists = true;
        break;
      }
    }
    if (!exists) unique.push(input[i]);
  }
  return unique;
}
console.log(removeDuplicates(arr));
// -> ['apple', 'banana', 'orange']`,
        },
      ],
    },

    // ── Objects ──────────────────────────────────────────────────────────
    {
      id: "objects",
      title: "Objects",
      cards: [
        {
          id: "object-basics",
          title: "Object Basics",
          lang: "js",
          code: `const person = {
  name: 'Alice',
  age: 30,
  greet() {
    return \`Hi, I'm \${this.name}\`;
  }
};

person.name;        // 'Alice'
person['age'];      // 30
person.greet();     // 'Hi, I'm Alice'`,
        },
        {
          id: "destructuring-obj",
          title: "Object Destructuring",
          lang: "js",
          code: `const { name, age, job = 'unknown' } = person;

// Rename while destructuring
const { name: fullName } = person;

// Nested
const { address: { city } } = user;`,
        },
        {
          id: "spread-obj",
          title: "Object Spread",
          lang: "js",
          code: `const defaults = { color: 'red', size: 'md' };
const custom = { size: 'lg', font: 'bold' };

// Merge (custom overrides defaults)
const config = { ...defaults, ...custom };
// { color: 'red', size: 'lg', font: 'bold' }`,
        },
        {
          id: "object-methods",
          title: "Object Methods",
          lang: "js",
          code: `const obj = { a: 1, b: 2, c: 3 };

Object.keys(obj);   // ['a', 'b', 'c']
Object.values(obj); // [1, 2, 3]
Object.entries(obj);// [['a',1],['b',2],['c',3]]

// Convert entries back to object
Object.fromEntries([['a', 1], ['b', 2]]);
// { a: 1, b: 2 }`,
        },
      ],
    },

    // ── Promises & Async ─────────────────────────────────────────────────
    {
      id: "async",
      title: "Promises & Async",
      cards: [
        {
          id: "promise",
          title: "Promises",
          lang: "js",
          code: `const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('done!'), 1000);
});

promise
  .then(result => console.log(result))
  .catch(err => console.error(err))
  .finally(() => console.log('finished'));`,
        },
        {
          id: "async-await",
          title: "Async / Await",
          lang: "js",
          code: `async function fetchUser(id) {
  try {
    const res = await fetch(\`/api/users/\${id}\`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Arrow function version
const getUser = async (id) => {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json();
};`,
        },
        {
          id: "promise-all",
          title: "Promise.all",
          lang: "js",
          code: `// Run all in parallel, wait for all
const [users, posts] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
]);

// First to resolve/reject wins
const fastest = await Promise.race([p1, p2]);

// First to resolve (ignores rejections)
const first = await Promise.any([p1, p2]);`,
        },
      ],
    },
    // ── Advanced JS ──────────────────────────────────────────────────────
    {
      id: "advanced-js",
      title: "Advanced Concepts",
      cards: [
        {
          id: "closures-scope",
          title: "Closures & Scope",
          lang: "js",
          code: `// Encapsulation / Private variables
function createCounter() {
  let count = 0; // Private state
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}
const counter = createCounter();
counter.increment(); // 1
console.log(counter.getCount()); // 1`,
        },
        {
          id: "event-loop-flow",
          title: "Event Loop & Queues",
          lang: "js",
          code: `console.log('1. Call Stack');

setTimeout(() => console.log('4. Macrotask Queue'), 0);

Promise.resolve().then(() => console.log('3. Microtask Queue'));

process.nextTick(() => console.log('2. process.nextTick'));

// Order: Call Stack -> nextTick -> Microtask -> Macrotask`,
        },
        {
          id: "debounce-throttle",
          title: "Debounce & Throttle",
          lang: "js",
          code: `// Debounce: delay until pause
const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

// Throttle: execute at most once per window
const throttle = (fn, limit) => {
  let inThrottle = false;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};`,
        },
        {
          id: "shallow-deep-copy",
          title: "Shallow vs Deep Copy",
          lang: "js",
          code: `const original = { a: 1, b: { c: 2 } };

// Shallow copy (spread)
const shallow = { ...original };
shallow.b.c = 99; // Mutates original!

// Deep copy (structuredClone)
const originalClean = { a: 1, b: { c: 2 } };
const deep = structuredClone(originalClean);
deep.b.c = 99; // originalClean remains safe`,
        },
      ],
    },
  ],
};
