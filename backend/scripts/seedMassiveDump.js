import mongoose from 'mongoose';
import dotenv from 'dotenv';
import InterviewQuestion from '../models/InterviewQuestion.js';
import connectDB from '../config/db.js';

dotenv.config();

const run = async () => {
  await connectDB();
  
  const questions = [
    // --- CORE JAVASCRIPT ---
    {
      question: "What is hoisting in JavaScript?",
      answer: "Hoisting is a JavaScript mechanism where variable and function declarations are moved to the top of their scope before code execution.\n\n- **var**: Variables declared with `var` are hoisted and initialized with `undefined`. Accessing them before declaration returns `undefined`.\n- **let/const**: They are hoisted but *not* initialized. Accessing them before declaration results in a `ReferenceError` because they are in the **Temporal Dead Zone (TDZ)**.\n- **Function Declarations**: Fully hoisted. You can call the function before it is defined in the code.\n\n```javascript\nconsole.log(myVar); // undefined\nvar myVar = 10;\n\nmyFunc(); // Works fine!\nfunction myFunc() { console.log('Hello'); }\n```",
      difficulty: "easy",
      category: "JavaScript"
    },
    {
      question: "What is the Temporal Dead Zone (TDZ)?",
      answer: "The Temporal Dead Zone (TDZ) is the period of time during execution where a `let` or `const` variable is hoisted and exists in memory, but is not yet initialized with a value.\n\nIf you try to access the variable during this period, JavaScript will throw a `ReferenceError`. The TDZ ends the moment the variable declaration line is executed.\n\n```javascript\n// TDZ starts at the beginning of the block\nconsole.log(age); // ReferenceError: Cannot access 'age' before initialization\nlet age = 25; // TDZ ends here\n```",
      difficulty: "medium",
      category: "JavaScript"
    },
    {
      question: "What is a Closure in JavaScript? Give a practical example.",
      answer: "A closure is a function that remembers and has access to its outer lexical scope, even after the outer function has finished executing.\n\nClosures are commonly used for data privacy (encapsulation), function currying, and maintaining state in asynchronous callbacks.\n\n```javascript\n// Practical Example: Data Privacy\nfunction createCounter() {\n  let count = 0; // Private variable\n  return function() {\n    count++;\n    return count;\n  };\n}\n\nconst counter = createCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2\n// We cannot access `count` directly from outside!\n```",
      difficulty: "hard",
      category: "JavaScript"
    },
    {
      question: "What is event bubbling and event capturing?",
      answer: "When an event (like a click) happens on a deeply nested HTML element, the browser handles it in two phases:\n\n1. **Capturing Phase**: The event starts at the top of the DOM tree (`window`/`document`) and trickles down to the target element.\n2. **Bubbling Phase**: The event starts at the target element and bubbles back up to the top of the DOM tree.\n\nBy default, JavaScript event listeners trigger during the **bubbling** phase. You can stop an event from bubbling up using `event.stopPropagation()`.",
      difficulty: "medium",
      category: "JavaScript"
    },

    // --- ADVANCED JAVASCRIPT ---
    {
      question: "What is the difference between a microtask queue and a macrotask queue in the Event Loop?",
      answer: "The Event Loop manages asynchronous operations using two queues:\n\n1. **Microtask Queue**: Holds callbacks from Promises (`.then`, `.catch`), `process.nextTick` (Node.js), and `MutationObserver`. It has the **highest priority**.\n2. **Macrotask Queue (Callback Queue)**: Holds callbacks from `setTimeout`, `setInterval`, I/O operations, and UI rendering.\n\nAfter executing the current synchronous code (Call Stack), the Event Loop will empty the *entire* Microtask Queue before it moves on to execute even a single task from the Macrotask Queue.",
      difficulty: "hard",
      category: "JavaScript Advanced"
    },
    {
      question: "How do you implement a Debounce function?",
      answer: "Debouncing ensures that a function is not called too frequently. It delays the execution of the function until a certain amount of time has passed since the *last* time it was invoked.\n\nIt is perfect for search input fields to avoid firing an API request on every single keystroke.\n\n```javascript\nfunction debounce(func, delay) {\n  let timer;\n  return function(...args) {\n    clearTimeout(timer); // Reset the timer on every keystroke\n    timer = setTimeout(() => {\n      func.apply(this, args); // Execute after delay\n    }, delay);\n  };\n}\n\nconst searchAPI = debounce(() => console.log('Fetching...'), 500);\n```",
      difficulty: "hard",
      category: "JavaScript Advanced"
    },
    {
      question: "What is the difference between shallow copy and deep copy? How do you achieve them?",
      answer: "When copying objects or arrays in JavaScript:\n\n- **Shallow Copy**: Copies the top-level properties. If the object contains nested objects, only their *memory references* are copied. Changing the nested object in the copy will mutate the original. \n  *Methods*: Spread operator `...`, `Object.assign()`.\n- **Deep Copy**: Creates a completely independent clone, including all nested objects.\n  *Methods*: `JSON.parse(JSON.stringify(obj))` (fails on functions and undefined) or `structuredClone(obj)` (modern and robust).\n\n```javascript\nconst original = { name: 'John', address: { city: 'NY' } };\n\n// Deep copy using structuredClone\nconst deepCopy = structuredClone(original);\ndeepCopy.address.city = 'LA';\nconsole.log(original.address.city); // Still 'NY'\n```",
      difficulty: "medium",
      category: "JavaScript"
    },

    // --- REACT & NEXT.JS ---
    {
      question: "What is the difference between SSR, CSR, and SSG in Next.js?",
      answer: "These are three different rendering strategies:\n\n1. **CSR (Client-Side Rendering)**: Traditional React. The browser downloads a bare HTML file and a massive JS bundle, then renders the UI entirely in the browser. Slow initial load, bad for SEO.\n2. **SSR (Server-Side Rendering)**: Next.js generates the HTML on the server *on every single request*. Great for SEO and highly dynamic data, but puts load on the server.\n3. **SSG (Static Site Generation)**: Next.js generates the HTML at *build time*. The HTML is cached on a CDN and served instantly to all users. Blazing fast, great for SEO, perfect for blogs or docs that rarely change.",
      difficulty: "hard",
      category: "React & Next.js"
    },
    {
      question: "What is React Suspense and Concurrent Rendering?",
      answer: "**React Suspense** allows you to declaratively \"suspend\" rendering of a component while it waits for some asynchronous operation to finish (like lazy-loading a component or fetching data), displaying a fallback UI (like a spinner) in the meantime.\n\n**Concurrent Rendering** (introduced in React 18) allows React to prepare multiple versions of the UI at the same time in the background without blocking the main thread. It enables features like `useTransition`, which lets you mark a state update as non-urgent, keeping the app highly responsive during heavy rendering.",
      difficulty: "hard",
      category: "React Advanced"
    },
    {
      question: "What is a Higher-Order Component (HOC)?",
      answer: "A Higher-Order Component (HOC) is an advanced React pattern for reusing component logic. \n\nAn HOC is a function that takes a component and returns a *new*, enhanced component. It's essentially the decorator pattern applied to React components. Common use cases include checking authentication before rendering a page.\n\n```jsx\n// HOC that checks if user is authenticated\nfunction withAuth(WrappedComponent) {\n  return function(props) {\n    const isAuthenticated = checkAuth();\n    if (!isAuthenticated) return <Login />;\n    return <WrappedComponent {...props} />;\n  };\n}\n\nexport default withAuth(Dashboard);\n```",
      difficulty: "medium",
      category: "React Architecture"
    },

    // --- NODE.JS CORE ---
    {
      question: "If Node.js is single-threaded, how does it handle multiple concurrent requests?",
      answer: "While the main JavaScript execution runs on a single thread, Node.js offloads heavy I/O operations (like database queries, file reading, and network requests) to the system kernel and a thread pool managed by the **libuv** library.\n\nBecause these operations are **non-blocking**, the main thread simply registers a callback and immediately moves on to serve the next user's request. When the I/O operation finishes in the background, libuv places the callback in the Event Loop queue to be executed. This architecture allows Node to handle tens of thousands of concurrent connections effortlessly.",
      difficulty: "hard",
      category: "Node.js Deep Dive"
    },
    {
      question: "What is an EventEmitter in Node.js? How do you create custom events?",
      answer: "The `EventEmitter` class is a core Node.js module that facilitates event-driven programming. It allows objects to emit named events that cause previously registered listeners (callbacks) to be called.\n\nMany core Node modules (like HTTP server and Streams) inherit from EventEmitter.\n\n```javascript\nconst EventEmitter = require('events');\nconst myEmitter = new EventEmitter();\n\n// Register a listener for the 'userSignup' event\nmyEmitter.on('userSignup', (username) => {\n  console.log(`Welcome email sent to ${username}`);\n});\n\n// Trigger the event\nmyEmitter.emit('userSignup', 'john_doe');\n```",
      difficulty: "medium",
      category: "Node.js Deep Dive"
    },
    {
      question: "What is Clustering in Node.js and why is it used?",
      answer: "Because Node.js is single-threaded, it normally only utilizes one CPU core. If you run a Node app on a 16-core server, 15 cores sit completely idle.\n\n**Clustering** allows you to spawn multiple Node.js processes (workers) that run simultaneously and share the same server port. This multiplies your application's throughput. In production, developers typically use process managers like **PM2** to handle clustering automatically rather than writing cluster logic manually.",
      difficulty: "hard",
      category: "System Design & Architecture"
    },

    // --- DATABASES & MYSQL ---
    {
      question: "What is the difference between INNER JOIN, LEFT JOIN, and RIGHT JOIN in SQL?",
      answer: "In relational databases (like MySQL or PostgreSQL), JOINs are used to combine rows from two or more tables based on a related column.\n\n- **INNER JOIN**: Returns only the records that have matching values in *both* tables. If there is no match, the row is dropped.\n- **LEFT JOIN (Left Outer)**: Returns *all* records from the left table, and the matched records from the right table. If there's no match, the right side returns NULL.\n- **RIGHT JOIN (Right Outer)**: Returns *all* records from the right table, and the matched records from the left table. If there's no match, the left side returns NULL.",
      difficulty: "medium",
      category: "SQL & Databases"
    },
    {
      question: "What are ACID properties in database transactions?",
      answer: "ACID is a set of properties that guarantee database transactions are processed reliably, critical for financial systems.\n\n1. **Atomicity**: The transaction is \"all or nothing.\" If one step fails, the entire transaction is rolled back (e.g., deducting money from A, but failing to add to B).\n2. **Consistency**: The database must remain in a valid state before and after the transaction, adhering to all constraints.\n3. **Isolation**: Concurrent transactions execute as if they were running sequentially. One transaction cannot read intermediate, uncommitted data of another.\n4. **Durability**: Once a transaction is committed, it is permanently saved to disk, surviving system crashes.",
      difficulty: "hard",
      category: "SQL & Databases"
    },
    {
      question: "How do you optimize a slow database query?",
      answer: "As an experienced developer, I approach slow queries by:\n\n1. **Using Indexes**: Creating an index (like a B-Tree) on frequently searched columns (e.g., `email`) prevents full-table/collection scans.\n2. **Analyzing the Query Execution Plan**: Using `EXPLAIN` in SQL or `.explain()` in MongoDB to see if indexes are actually being utilized.\n3. **Limiting Returned Data**: Avoiding `SELECT *` or returning massive arrays. Only projecting the exact fields needed by the frontend.\n4. **Pagination**: Implementing cursor-based or limit/offset pagination to fetch small chunks of data.\n5. **Denormalization (NoSQL)**: Embedding frequently accessed data directly inside the document to avoid expensive `$lookup` or `.populate()` calls.",
      difficulty: "hard",
      category: "System Design & Architecture"
    },
    
    // --- CODING / LOGICAL ---
    {
      question: "Write code to flatten a nested array without using the inbuilt .flat() method.",
      answer: "We can use recursion combined with the `reduce` method to flatten an array of unknown depth.\n\n```javascript\nfunction flattenArray(arr) {\n  return arr.reduce((acc, current) => {\n    if (Array.isArray(current)) {\n      // If the current element is an array, recursively flatten it\n      return acc.concat(flattenArray(current));\n    } else {\n      // Otherwise, just push the element to the accumulator\n      return acc.concat(current);\n    }\n  }, []);\n}\n\nconst nested = [1, [2, [3, 4], 5], 6];\nconsole.log(flattenArray(nested)); // [1, 2, 3, 4, 5, 6]\n```",
      difficulty: "hard",
      category: "JavaScript Advanced"
    },
    {
      question: "Sort the array [40, 50, 70, 90, 10] in descending order without using the .sort() method.",
      answer: "We can implement a basic sorting algorithm, such as Bubble Sort, to sort the array manually.\n\n```javascript\nfunction sortDescending(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = 0; j < arr.length - 1 - i; j++) {\n      // If the current element is smaller than the next, swap them\n      if (arr[j] < arr[j + 1]) {\n        let temp = arr[j];\n        arr[j] = arr[j + 1];\n        arr[j + 1] = temp;\n      }\n    }\n  }\n  return arr;\n}\n\nconst nums = [40, 50, 70, 90, 10];\nconsole.log(sortDescending(nums)); // [90, 70, 50, 40, 10]\n```",
      difficulty: "medium",
      category: "JavaScript"
    },
    {
      question: "Output Question: What does this code print and why?\n`console.log([] + []);`",
      answer: "The output is an **empty string** `\"\"`.\n\n**Why?**\nIn JavaScript, the `+` operator triggers type coercion. When you try to add two arrays together, JavaScript attempts to convert them into primitive strings.\n\n1. It calls `.toString()` on the empty array `[]`.\n2. `[].toString()` returns an empty string `\"\"`.\n3. It then concatenates the two empty strings: `\"\" + \"\"`.\n4. The result is `\"\"`.",
      difficulty: "medium",
      category: "JavaScript Advanced"
    }
  ];

  await InterviewQuestion.insertMany(questions);

  console.log(`Successfully seeded ${questions.length} new MASSIVE dump interview questions!`);
  process.exit(0);
};

run().catch(console.error);
