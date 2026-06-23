import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Course from "../models/Course.js";
import CourseTopic from "../models/CourseTopic.js";
import Revision from "../models/Revision.js";
import InterviewQuestion from "../models/InterviewQuestion.js";
import GitCommand from "../models/GitCommand.js";
import ResourcePdf from "../models/ResourcePdf.js";
import YoutubeVideo from "../models/YoutubeVideo.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    console.log("🗑️  Cleaning database...");
    await Course.deleteMany({});
    await CourseTopic.deleteMany({});
    await Revision.deleteMany({});
    await InterviewQuestion.deleteMany({});
    await GitCommand.deleteMany({});
    await ResourcePdf.deleteMany({});
    await YoutubeVideo.deleteMany({});

    let admin = await User.findOne({ role: "admin" });
    if (!admin) {
      admin = new User({
        name: "System Admin",
        email: "admin@codeverse.com",
        password: "AdminPassword123",
        role: "admin",
      });
      await admin.save();
      console.log("👤 Admin user created.");
    }

    // ─────────────────────────────────────────
    // COURSES & TOPICS
    // ─────────────────────────────────────────
    console.log("📚 Seeding Courses & Topics...");

    const courses = [
      {
        title: "React.js Essentials",
        slug: "react-js-essentials",
        description: "Master the fundamentals of React.js including components, hooks, state management, and modern patterns.",
        level: "beginner",
        language: "english",
        duration: 120,
        createdBy: admin._id,
        isPublished: true,
      },
      {
        title: "Node.js & Express",
        slug: "node-js-express",
        description: "Build robust REST APIs and server-side applications using Node.js and Express framework.",
        level: "intermediate",
        language: "english",
        duration: 180,
        createdBy: admin._id,
        isPublished: true,
      },
      {
        title: "Data Structures & Algorithms",
        slug: "data-structures-algorithms",
        description: "Master DSA from arrays to graphs with real interview problems and optimised solutions.",
        level: "intermediate",
        language: "english",
        duration: 240,
        createdBy: admin._id,
        isPublished: true,
      },
    ];

    const seededCourses = await Course.insertMany(courses);
    const reactCourse = seededCourses[0];
    const nodeCourse = seededCourses[1];
    const dsaCourse = seededCourses[2];

    const topics = [
      // ─── React Topics ───
      {
        course: reactCourse._id,
        title: "Introduction to JSX",
        slug: "intro-to-jsx",
        shortDescription: "JSX is a syntax extension that lets you write HTML-like markup inside JavaScript.",
        content: `JSX (JavaScript XML) allows you to describe the UI structure directly in your JavaScript code. React uses JSX to define what the UI should look like.

**Why JSX?**
- Combines the power of JavaScript with UI structure
- Makes code more readable and intuitive
- Babel compiles it down to React.createElement() calls

**Rules:**
1. Only one root element per component
2. Use className instead of class
3. All tags must be closed (self-closing if no children)
4. JavaScript expressions go inside curly braces { }`,
        codeSnippet: `// JSX Example
function Greeting({ name }) {
  const isLoggedIn = true;

  return (
    <div className="greeting-card">
      <h1>Hello, {name}!</h1>
      {isLoggedIn ? (
        <p>Welcome back 👋</p>
      ) : (
        <p>Please sign in</p>
      )}
      <img src="/avatar.png" alt="User avatar" />
    </div>
  );
}

// Babel compiles JSX to:
// React.createElement('div', { className: 'greeting-card' },
//   React.createElement('h1', null, 'Hello, ', name, '!'),
//   ...
// )`,
        codeLanguage: "jsx",
        visualizeUrl: "https://react.dev/images/docs/illustrations/i_jsx-and-js.png",
        videoUrl: "https://www.youtube.com/embed/cM2F5UquSsk",
        order: 1,
        estimatedMinutes: 15,
        isPublished: true,
        createdBy: admin._id,
      },
      {
        course: reactCourse._id,
        title: "Components & Props",
        slug: "components-and-props",
        shortDescription: "Components let you split the UI into independent, reusable pieces. Props pass data from parent to child.",
        content: `React components are the building blocks of any React application. A component is a JavaScript function that returns JSX.

**Two types of components:**
- **Functional Components** — Modern, preferred approach (uses hooks)
- **Class Components** — Legacy, older style

**Props (Properties):**
Props are read-only data passed from a parent component to a child. They make components reusable with different data.

**Key Rules:**
- Props are immutable (never modify props directly)
- Always destructure props for cleaner code
- Use defaultProps or default parameter values for fallbacks`,
        codeSnippet: `// Reusable Card Component
function CourseCard({ title, description, level = "beginner", duration }) {
  const levelColors = {
    beginner: "text-green-400",
    intermediate: "text-yellow-400",
    advanced: "text-red-400",
  };

  return (
    <div className="card">
      <span className={levelColors[level]}>{level}</span>
      <h2>{title}</h2>
      <p>{description}</p>
      <span>{duration} mins</span>
    </div>
  );
}

// Parent passing props to child
function App() {
  return (
    <div>
      <CourseCard
        title="React Essentials"
        description="Learn React from scratch"
        level="beginner"
        duration={120}
      />
      <CourseCard
        title="Advanced Node.js"
        description="Backend mastery"
        level="advanced"
        duration={200}
      />
    </div>
  );
}`,
        codeLanguage: "jsx",
        visualizeUrl: "",
        videoUrl: "https://www.youtube.com/embed/cM2F5UquSsk",
        order: 2,
        estimatedMinutes: 20,
        isPublished: true,
        createdBy: admin._id,
      },
      {
        course: reactCourse._id,
        title: "useState Hook",
        slug: "use-state-hook",
        shortDescription: "useState lets you add reactive state variables to your functional components.",
        content: `State is data that changes over time in your application. When state changes, React re-renders the component to reflect the new data.

**useState Syntax:**
\`const [state, setState] = useState(initialValue)\`

- First value: current state value
- Second value: function to update state
- Argument: initial state value

**Important Rules:**
1. Never mutate state directly — always use the setter
2. State updates may be batched and asynchronous
3. When new state depends on old state, use a callback form
4. Each call to useState manages one piece of state`,
        codeSnippet: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');

  const increment = () => {
    // ✅ Correct: callback form when using previous state
    setCount(prev => prev + 1);
  };

  const decrement = () => {
    setCount(prev => Math.max(0, prev - 1));
  };

  const reset = () => {
    setCount(0);
    setMessage('Counter reset!');
    // Clear message after 2 seconds
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <div>
      <h2>Count: {count}</h2>
      {message && <p className="success">{message}</p>}
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}`,
        codeLanguage: "jsx",
        visualizeUrl: "",
        videoUrl: "https://www.youtube.com/embed/cM2F5UquSsk",
        order: 3,
        estimatedMinutes: 25,
        isPublished: true,
        createdBy: admin._id,
      },
      // ─── Node.js Topics ───
      {
        course: nodeCourse._id,
        title: "How Node.js Works",
        slug: "how-nodejs-works",
        shortDescription: "Node.js is a single-threaded event-driven runtime that handles concurrent connections without blocking.",
        content: `Node.js is built on Chrome's V8 engine and uses a non-blocking I/O model. Unlike traditional servers (like Apache), Node does not create a new thread for each request.

**Key Architecture Concepts:**
- **Event Loop** — The heart of Node.js; checks for events and triggers callbacks
- **Call Stack** — Executes synchronous code
- **Libuv Thread Pool** — Handles heavy I/O ops (file system, DNS, etc.)
- **Event Queue** — Stores callbacks waiting to be executed

**Why is Node fast?**
Because instead of waiting (blocking) for I/O operations to complete, it registers a callback and moves on to the next task. When the I/O finishes, the callback runs.

**Perfect for:**
- Real-time applications (chat, live updates)
- REST APIs with high concurrency
- Microservices architectures`,
        codeSnippet: `// Demonstrating Non-Blocking I/O
const fs = require('fs');

console.log('1. Start reading file...');

// Non-blocking: Node registers callback and moves on
fs.readFile('./data.txt', 'utf8', (err, data) => {
  if (err) return console.error(err);
  console.log('3. File content:', data);
});

console.log('2. This runs BEFORE file is read!');
// Output order:
// 1. Start reading file...
// 2. This runs BEFORE file is read!
// 3. File content: (file contents here)

// ─── Async/Await Version (modern) ───
const { readFile } = require('fs/promises');

async function readMyFile() {
  try {
    console.log('Reading file...');
    const data = await readFile('./data.txt', 'utf8');
    console.log('Done:', data);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

readMyFile();`,
        codeLanguage: "javascript",
        visualizeUrl: "",
        videoUrl: "https://www.youtube.com/embed/TlB_eWDSMt4",
        order: 1,
        estimatedMinutes: 20,
        isPublished: true,
        createdBy: admin._id,
      },
      {
        course: nodeCourse._id,
        title: "Building REST API with Express",
        slug: "rest-api-express",
        shortDescription: "Express.js is a minimal Node.js framework to build REST APIs with routing, middleware, and error handling.",
        content: `A REST (Representational State Transfer) API uses HTTP methods to perform operations on resources.

**HTTP Methods & CRUD:**
| Method | Operation | Example |
|--------|-----------|---------|
| GET    | Read      | GET /users |
| POST   | Create    | POST /users |
| PUT    | Update    | PUT /users/:id |
| DELETE | Delete    | DELETE /users/:id |

**Express Middleware:**
Middleware are functions that run between the request and response. They can modify req/res, end the request cycle, or call the next middleware.

**Common middleware:**
- express.json() — Parse JSON bodies
- cors() — Handle cross-origin requests
- helmet() — Security headers
- Custom middleware for auth/logging`,
        codeSnippet: `import express from 'express';

const app = express();
app.use(express.json());

// In-memory data store (use MongoDB in production)
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

// GET all users
app.get('/api/users', (req, res) => {
  res.json({ success: true, data: users });
});

// GET single user
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ success: true, data: user });
});

// POST create user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
});

// DELETE user
app.delete('/api/users/:id', (req, res) => {
  users = users.filter(u => u.id !== Number(req.params.id));
  res.json({ success: true, message: 'User deleted' });
});

app.listen(5000, () => console.log('Server running on port 5000'));`,
        codeLanguage: "javascript",
        visualizeUrl: "",
        videoUrl: "https://www.youtube.com/embed/TlB_eWDSMt4",
        order: 2,
        estimatedMinutes: 30,
        isPublished: true,
        createdBy: admin._id,
      },
      // ─── DSA Topics ───
      {
        course: dsaCourse._id,
        title: "Arrays — Foundation",
        slug: "arrays-foundation",
        shortDescription: "Arrays are contiguous memory blocks storing elements of the same type. They are the most fundamental data structure.",
        content: `An array stores elements in a contiguous block of memory. Each element is accessed by its index (0-based in most languages).

**Time Complexities:**
| Operation | Average | Worst |
|-----------|---------|-------|
| Access    | O(1)    | O(1)  |
| Search    | O(n)    | O(n)  |
| Insert    | O(n)    | O(n)  |
| Delete    | O(n)    | O(n)  |

**Common Techniques:**
- **Two Pointers** — For sorted arrays, pair problems
- **Sliding Window** — For subarray problems (max sum, count)
- **Prefix Sum** — Efficient range sum queries
- **Kadane's Algorithm** — Maximum subarray sum in O(n)`,
        codeSnippet: `// ─── Kadane's Algorithm ─── (Maximum Subarray Sum)
function maxSubarraySum(arr) {
  let maxSoFar = arr[0];
  let currentMax = arr[0];

  for (let i = 1; i < arr.length; i++) {
    // Either extend current subarray or start fresh
    currentMax = Math.max(arr[i], currentMax + arr[i]);
    maxSoFar = Math.max(maxSoFar, currentMax);
  }

  return maxSoFar;
}

console.log(maxSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
// Output: 6 (subarray: [4, -1, 2, 1])

// ─── Sliding Window ─── (Max sum of k elements)
function maxSumWindow(arr, k) {
  let windowSum = arr.slice(0, k).reduce((a, b) => a + b, 0);
  let maxSum = windowSum;

  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k]; // Slide window
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}

console.log(maxSumWindow([2, 1, 5, 1, 3, 2], 3)); // Output: 9`,
        codeLanguage: "javascript",
        visualizeUrl: "",
        videoUrl: "https://www.youtube.com/embed/yRpLlJmRo2w",
        order: 1,
        estimatedMinutes: 40,
        isPublished: true,
        createdBy: admin._id,
      },
      {
        course: dsaCourse._id,
        title: "Linked Lists",
        slug: "linked-lists",
        shortDescription: "A Linked List is a linear data structure where each element (node) contains data and a pointer to the next node.",
        content: `Unlike arrays, linked list elements are NOT stored in contiguous memory. Each node has a value and a reference (pointer) to the next node.

**Types:**
- **Singly Linked List** — Each node points to the next
- **Doubly Linked List** — Each node points to next AND previous
- **Circular Linked List** — Last node points back to head

**Advantages over Arrays:**
- Dynamic size (no fixed capacity)
- O(1) insertion/deletion at head

**Disadvantages:**
- No random access (must traverse from head)
- Extra memory for storing pointers

**Classic Problems:**
- Reverse a linked list
- Detect a cycle (Floyd's Tortoise & Hare)
- Find middle node
- Merge two sorted lists`,
        codeSnippet: `class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  // Add to beginning — O(1)
  prepend(val) {
    const newNode = new Node(val);
    newNode.next = this.head;
    this.head = newNode;
  }

  // Reverse in-place — O(n)
  reverse() {
    let prev = null;
    let current = this.head;

    while (current !== null) {
      const nextNode = current.next;
      current.next = prev;
      prev = current;
      current = nextNode;
    }
    this.head = prev;
  }

  // Floyd's Cycle Detection — O(n) time, O(1) space
  hasCycle() {
    let slow = this.head;
    let fast = this.head;

    while (fast !== null && fast.next !== null) {
      slow = slow.next;        // Move 1 step
      fast = fast.next.next;   // Move 2 steps
      if (slow === fast) return true; // Cycle detected!
    }
    return false;
  }
}`,
        codeLanguage: "javascript",
        visualizeUrl: "",
        videoUrl: "https://www.youtube.com/embed/yRpLlJmRo2w",
        order: 2,
        estimatedMinutes: 45,
        isPublished: true,
        createdBy: admin._id,
      },
    ];

    await CourseTopic.insertMany(topics);

    // ─────────────────────────────────────────
    // REVISION CARDS
    // ─────────────────────────────────────────
    console.log("⚡ Seeding Revision Cards...");
    const revisions = [
      {
        title: "HTML Semantic Elements",
        category: "HTML",
        content: "Semantic elements clearly describe their meaning to both the browser and developer. Examples: `<header>`, `<main>`, `<article>`, `<section>`, `<footer>`, `<nav>`, `<aside>`.",
        keyPoints: [
          "Improves SEO — crawlers understand your content structure.",
          "Enhances accessibility for screen readers.",
          "Makes code readable and self-documenting.",
        ],
      },
      {
        title: "CSS Flexbox vs Grid",
        category: "CSS",
        content: "Flexbox = 1-dimensional layout (row OR column). CSS Grid = 2-dimensional layout (rows AND columns simultaneously). Use both together for best results.",
        keyPoints: [
          "Flexbox: align items in a single axis, great for nav bars.",
          "Grid: complex page layouts, overlapping elements.",
          "justify-content / align-items are flexbox core.",
        ],
      },
      {
        title: "JavaScript Closures",
        category: "JavaScript",
        content: "A closure is a function that retains access to its outer lexical scope even after the outer function has returned. This enables data encapsulation (private variables).",
        keyPoints: [
          "Inner functions have access to outer function's variables.",
          "Used in factory functions, event handlers, currying.",
          "Created every time a function is created.",
        ],
      },
      {
        title: "React Virtual DOM",
        category: "React",
        content: "React keeps a lightweight in-memory copy of the real DOM (Virtual DOM). On state change, React diffs the new VDOM vs old VDOM and only updates what changed (reconciliation).",
        keyPoints: [
          "Much faster than direct DOM manipulation.",
          "Only changed nodes are updated (not full re-render).",
          "Enables declarative, component-based UI programming.",
        ],
      },
      {
        title: "JWT Authentication Flow",
        category: "Node & Express",
        content: "JWT (JSON Web Token) is a stateless auth mechanism. Server signs a token with a secret, client stores and sends it in the Authorization header for protected routes.",
        keyPoints: [
          "Three parts: Header.Payload.Signature (Base64 encoded).",
          "Stateless — server doesn't need session storage.",
          "Never store sensitive data in JWT payload (it's decodable!).",
        ],
      },
      {
        title: "Big O Notation",
        category: "DSA",
        content: "Big O describes the worst-case time/space complexity of an algorithm as input size (n) grows. It helps compare algorithm efficiency.",
        keyPoints: [
          "O(1) Constant — best case (hash map lookup).",
          "O(log n) Logarithmic — binary search.",
          "O(n) Linear — single loop through array.",
          "O(n²) Quadratic — nested loops (bubble sort).",
        ],
      },
      {
        title: "MongoDB Aggregation Pipeline",
        category: "MongoDB",
        content: "Aggregation processes data through stages: $match, $group, $sort, $project, $lookup, etc. Each stage transforms the collection data.",
        keyPoints: [
          "$match filters documents (like SQL WHERE).",
          "$group groups and calculates aggregations like $sum, $avg.",
          "$lookup performs joins between collections.",
          "Much more powerful than find() for analytics.",
        ],
      },
      {
        title: "TypeScript Generics",
        category: "TypeScript",
        content: "Generics allow you to write reusable, type-safe functions and classes that work with any type while preserving type information.",
        keyPoints: [
          "Use <T> as a placeholder type parameter.",
          "Generics are resolved at compile time, not runtime.",
          "Avoid using 'any' — use generics instead for type safety.",
        ],
      },
    ];
    await Revision.insertMany(revisions);

    // ─────────────────────────────────────────
    // INTERVIEW QUESTIONS
    // ─────────────────────────────────────────
    console.log("🎯 Seeding Interview Questions...");
    const interviewQuestions = [
      {
        question: "What is the difference between let, const, and var in JavaScript?",
        answer: "`var` is function-scoped, hoisted with `undefined`. `let` and `const` are block-scoped and in the Temporal Dead Zone until initialized. `const` cannot be reassigned after declaration.",
        difficulty: "easy", category: "JavaScript",
      },
      {
        question: "Explain the event loop in JavaScript.",
        answer: "The event loop continuously checks the call stack. If it's empty, it moves callbacks from the task queue (or microtask queue) onto the stack. Microtasks (Promises) run before macrotasks (setTimeout).",
        difficulty: "medium", category: "JavaScript",
      },
      {
        question: "What are React hooks and why were they introduced?",
        answer: "Hooks (introduced in React 16.8) allow functional components to use state and lifecycle features. They replaced class components, making code shorter, more readable, and easier to test. Core hooks: useState, useEffect, useContext, useRef.",
        difficulty: "medium", category: "React",
      },
      {
        question: "What is the difference between useEffect and useLayoutEffect?",
        answer: "useEffect runs asynchronously AFTER the browser paints (doesn't block visual update). useLayoutEffect runs synchronously BEFORE the browser paints. Use useLayoutEffect for DOM measurements to avoid flickering.",
        difficulty: "hard", category: "React",
      },
      {
        question: "What is CORS and how do you handle it in Express?",
        answer: "CORS (Cross-Origin Resource Sharing) is a browser security mechanism that blocks requests to different origins. In Express, install the `cors` package and use `app.use(cors({ origin: 'http://your-frontend.com' }))`. Always whitelist specific origins in production.",
        difficulty: "medium", category: "Express",
      },
      {
        question: "Explain the difference between SQL and NoSQL databases.",
        answer: "SQL databases are relational (tables, fixed schema, ACID transactions). NoSQL databases are non-relational (documents/key-value/graph, flexible schema, horizontally scalable). Use SQL for complex relationships and NoSQL for high-volume, flexible data.",
        difficulty: "medium", category: "Database",
      },
      {
        question: "How does MongoDB indexing work?",
        answer: "Indexes store a subset of collection data in a traversable B-tree structure, allowing MongoDB to find documents without scanning the entire collection. Without an index, MongoDB does a full collection scan (COLLSCAN). Always index fields used in queries, sorts, and joins.",
        difficulty: "hard", category: "MongoDB",
      },
      {
        question: "What is the time complexity of Binary Search?",
        answer: "O(log n) — Binary search halves the search space at each step. It requires the array to be sorted. At each step: compare middle element, discard half the array. After k steps, we have n/2^k elements. When n/2^k = 1, k = log₂(n).",
        difficulty: "easy", category: "DSA",
      },
      {
        question: "What is the difference between Stack and Queue?",
        answer: "Stack is LIFO (Last In, First Out) — push/pop from same end. Queue is FIFO (First In, First Out) — enqueue at rear, dequeue from front. Stack use cases: function call stack, undo/redo, bracket matching. Queue use cases: BFS, task scheduling, print queues.",
        difficulty: "easy", category: "DSA",
      },
      {
        question: "Explain Dynamic Programming with an example.",
        answer: "DP solves problems by breaking them into overlapping subproblems and storing results (memoization/tabulation). Example: Fibonacci — without DP: O(2^n). With DP: O(n). Key insight: fib(n) = fib(n-1) + fib(n-2). Store computed values in a table to avoid recomputation.",
        difficulty: "hard", category: "DSA",
      },
      {
        question: "What is process scheduling in Operating Systems?",
        answer: "Process scheduling determines which process gets CPU time. Algorithms: FCFS (First Come First Served), SJF (Shortest Job First), Round Robin (time quantum), Priority Scheduling. Modern OSes use multilevel feedback queues combining these.",
        difficulty: "medium", category: "Operating System",
      },
      {
        question: "What is the difference between process and thread?",
        answer: "A process is an independent program in execution with its own memory space. A thread is the smallest unit of execution within a process and shares the process's memory/resources. Creating threads (context switching) is cheaper than processes. Java uses threads; Node.js uses single-threaded event loop.",
        difficulty: "medium", category: "Operating System",
      },
      {
        question: "Explain the OSI model's 7 layers.",
        answer: "Physical (bits/cables), Data Link (frames/MAC), Network (packets/IP routing), Transport (TCP/UDP segments), Session (connection management), Presentation (encryption/encoding), Application (HTTP, FTP, SMTP). Remember: 'Please Do Not Throw Sausage Pizza Away'.",
        difficulty: "medium", category: "Computer Networks",
      },
    ];
    await InterviewQuestion.insertMany(interviewQuestions);

    // ─────────────────────────────────────────
    // GIT COMMANDS
    // ─────────────────────────────────────────
    console.log("🔧 Seeding Git Commands...");
    const gitCommands = [
      { command: "git init", description: "Initialize a new local Git repository.", category: "Setup", example: "git init" },
      { command: "git clone <url>", description: "Clone a remote repository locally.", category: "Setup", example: "git clone https://github.com/user/repo.git" },
      { command: "git add .", description: "Stage ALL modified/new files for commit.", category: "Working Files", example: "git add ." },
      { command: "git add <file>", description: "Stage a specific file for commit.", category: "Working Files", example: "git add src/App.tsx" },
      { command: "git commit -m '<msg>'", description: "Commit staged changes with a message.", category: "Working Files", example: "git commit -m 'feat: add user auth module'" },
      { command: "git status", description: "Show status of working tree and staging area.", category: "Working Files", example: "git status" },
      { command: "git log --oneline", description: "View compact commit history.", category: "History", example: "git log --oneline -10" },
      { command: "git diff", description: "Show unstaged changes in working directory.", category: "History", example: "git diff" },
      { command: "git checkout -b <branch>", description: "Create and switch to a new branch immediately.", category: "Branches", example: "git checkout -b feature/user-auth" },
      { command: "git branch -m <old> <new>", description: "Rename an existing branch.", category: "Branches", example: "git branch -m main master" },
      { command: "git merge <branch>", description: "Merge specified branch into current branch.", category: "Branches", example: "git merge feature/login" },
      { command: "git rebase <branch>", description: "Reapply commits on top of another branch (linear history).", category: "Branches", example: "git rebase main" },
      { command: "git stash", description: "Temporarily save uncommitted changes to a stash.", category: "Advanced", example: "git stash save 'WIP: working on login'" },
      { command: "git stash pop", description: "Re-apply the most recent stash and remove it.", category: "Advanced", example: "git stash pop" },
      { command: "git reset --hard HEAD~1", description: "Discard last commit AND all its changes permanently.", category: "Advanced", example: "git reset --hard HEAD~1" },
      { command: "git push <remote> <branch>", description: "Push local branch to remote repository.", category: "Remote", example: "git push origin main" },
      { command: "git pull origin <branch>", description: "Fetch and merge remote changes.", category: "Remote", example: "git pull origin main" },
      { command: "git fetch --all", description: "Download all remote branches without merging.", category: "Remote", example: "git fetch --all" },
      { command: "git cherry-pick <hash>", description: "Apply a specific commit to the current branch.", category: "Advanced", example: "git cherry-pick a3f5c2d" },
      { command: "git tag -a v1.0 -m 'msg'", description: "Create an annotated tag for a release.", category: "Advanced", example: "git tag -a v1.0.0 -m 'First release'" },
    ];
    await GitCommand.insertMany(gitCommands);

    // ─────────────────────────────────────────
    // PDF RESOURCES
    // ─────────────────────────────────────────
    console.log("📄 Seeding PDF Resources...");
    const resourcePdfs = [
      {
        title: "JavaScript ES6+ Cheat Sheet",
        description: "Complete reference for arrow functions, destructuring, spread, promises, async/await, modules, and more.",
        pdfUrl: "https://htmlcheatsheet.com/js/",
        category: "JavaScript",
      },
      {
        title: "React Hooks Quick Reference",
        description: "All React hooks explained with usage examples: useState, useEffect, useContext, useReducer, useMemo, useCallback, useRef.",
        pdfUrl: "https://reactjs.org/docs/hooks-reference.html",
        category: "React",
      },
      {
        title: "DSA Patterns Cheat Sheet",
        description: "Most important coding patterns for interviews: Two Pointers, Sliding Window, BFS/DFS, Dynamic Programming, Backtracking.",
        pdfUrl: "https://www.techinterviewhandbook.org/",
        category: "DSA",
      },
      {
        title: "SQL Commands Reference",
        description: "Complete SQL reference: DDL, DML, DQL, DCL commands with syntax, examples, and join visualizations.",
        pdfUrl: "https://sqlzoo.net/",
        category: "SQL & Database",
      },
      {
        title: "Git Commands Reference",
        description: "All essential Git commands organized by workflow: setup, branching, merging, rebasing, stashing, and remote ops.",
        pdfUrl: "https://education.github.com/git-cheat-sheet-education.pdf",
        category: "DevOps & Tools",
      },
      {
        title: "System Design Interview Primer",
        description: "Core concepts for system design: Load balancing, Caching, Database sharding, CAP theorem, Microservices patterns.",
        pdfUrl: "https://github.com/donnemartin/system-design-primer",
        category: "System Design",
      },
    ];
    await ResourcePdf.insertMany(resourcePdfs);

    // ─────────────────────────────────────────
    // YOUTUBE VIDEOS — All Subjects
    // ─────────────────────────────────────────
    console.log("▶️  Seeding YouTube Playlists...");
    const youtubeVideos = [

      // ── APTITUDE ──
      { title: "Quantitative Aptitude - Number System", channelName: "Yash Jain", videoId: "JvJr5LfRr_c", subject: "Aptitude", playlistName: "Aptitude by Yash Jain", description: "Complete number system for aptitude and competitive exams.", order: 1 },
      { title: "Aptitude - Percentage Problems", channelName: "Yash Jain", videoId: "Ks5rQ6UDjbw", subject: "Aptitude", playlistName: "Aptitude by Yash Jain", description: "Percentage shortcuts and tricks for competitive exams.", order: 2 },

      // ── JAVA ──
      { title: "Java Tutorial for Beginners", channelName: "Telusko", videoId: "8cm1x4bySPM", subject: "Java", playlistName: "Java by Telusko", description: "Complete Java programming from scratch by Navin Reddy.", order: 1 },
      { title: "Java Full Course for Beginners", channelName: "Bro Code", videoId: "GdzRzWymT4c", subject: "Java", playlistName: "Java by Bro Code", description: "Learn Java in 12 hours with practical examples.", order: 2 },
      { title: "Java Tutorial for Beginners", channelName: "Programming with Mosh", videoId: "eIrMbAQSU34", subject: "Java", playlistName: "Java by Mosh", description: "Learn Java fundamentals in 2.5 hours by Mosh Hamedani.", order: 3 },
      { title: "Core Java Tutorial", channelName: "Durga Software Solutions", videoId: "6nDOdLV8Rws", subject: "Java", playlistName: "Java by Durga Software", description: "In-depth Java tutorials by Durga Software Solutions.", order: 4 },

      // ── DSA ──
      { title: "Data Structures and Algorithms - Complete Course", channelName: "Kunal Kushwaha", videoId: "yRpLlJmRo2w", subject: "DSA", playlistName: "DSA by Kunal Kushwaha", description: "Full DSA course in Java by Kunal Kushwaha from community classroom.", order: 1 },
      { title: "A2Z DSA Sheet — Striver", channelName: "TakeUForward (Striver)", videoId: "0bHoB32fuj0", subject: "DSA", playlistName: "DSA by Striver (TakeUForward)", description: "Striver's A2Z DSA sheet video playlist — the best interview prep.", order: 2 },
      { title: "Data Structures and Algorithms", channelName: "Abdul Bari", videoId: "0IAPZzGSbME", subject: "DSA", playlistName: "DSA by Abdul Bari", description: "Classic DSA concepts explained mathematically by Abdul Bari.", order: 3 },
      { title: "DSA Masterclass — Complete Playlist", channelName: "Raghav Sir (Physics Wallah)", videoId: "5_5oE5lgrhw", subject: "DSA", playlistName: "DSA by Raghav Sir (PW)", description: "DSA course by PW's Raghav Sir — simplified for beginners.", order: 4 },
      { title: "Algorithms Explained — Learning Algo", channelName: "Learning Lingo", videoId: "oBt53YbR9Kk", subject: "DSA", playlistName: "Algorithms by Learning Algo", description: "Clean visual explanations of common algorithms.", order: 5 },
      { title: "Data Structures & Algorithms Made Easy", channelName: "DSA Made Easy", videoId: "b1j4-Q6X9PY", subject: "DSA", playlistName: "DSA Made Easy", description: "Easy-to-follow data structures and algorithms tutorial series.", order: 6 },

      // ── DSA FUNDAMENTALS ──
      { title: "DSA Fundamentals — Full Course", channelName: "Learning Lingo", videoId: "9rhT3P1MDHk", subject: "DSA Fundamentals", playlistName: "DSA Fundamentals by Learning Algo", description: "Core data structure fundamentals before diving into advanced topics.", order: 1 },
      { title: "Data Structures for Beginners", channelName: "Jenny's Lectures CS IT", videoId: "AT14lCXuMKI", subject: "DSA Fundamentals", playlistName: "DSA Fundamentals by Jeni Ma'am", description: "Beginner-friendly DSA series by Jenny's Lectures.", order: 2 },

      // ── OOPs ──
      { title: "Object Oriented Programming in Java — Full Course", channelName: "Apna College", videoId: "BSVKUk58K6U", subject: "OOPs", playlistName: "OOPs by Apna College", description: "Complete OOPs concepts: Classes, Inheritance, Polymorphism, Abstraction, Encapsulation.", order: 1 },

      // ── PYTHON ──
      { title: "Python Tutorial for Beginners", channelName: "Apna College", videoId: "ERCMXc8x7mc", subject: "Python", playlistName: "Python by Apna College", description: "Python programming from basics to advanced by Apna College.", order: 1 },
      { title: "Python Full Course for Beginners", channelName: "Bro Code", videoId: "XKHEtdqhLK8", subject: "Python", playlistName: "Python by Bro Code", description: "Learn Python in one sitting with practical exercises by Bro Code.", order: 2 },
      { title: "Python Tutorial — Learn Python in One Video", channelName: "Programming with Mosh", videoId: "_uQrJ0TkZlc", subject: "Python", playlistName: "Python by Mosh", description: "Python programming for beginners by Mosh — 6-hour complete course.", order: 3 },
      { title: "Python for Beginners — Full Course", channelName: "Telusko", videoId: "QXeEoD0pB3E", subject: "Python", playlistName: "Python by Telusko", description: "Navin Reddy's Python tutorial series for absolute beginners.", order: 4 },
      { title: "Python for Everybody — Full Course", channelName: "freeCodeCamp", videoId: "rfscVS0vtbw", subject: "Python", playlistName: "Python by freeCodeCamp", description: "Dr. Chuck's Python for Everybody full course on freeCodeCamp.", order: 5 },
      { title: "Python OOP Tutorials - Complete Series", channelName: "Corey Schafer", videoId: "BJ-VvGyQxuo", subject: "Python", playlistName: "Python by Corey Schafer", description: "Excellent deep-dive into Python Object-Oriented Programming (OOP) concepts by Corey Schafer.", order: 6 },

      // ── SQL ──
      { title: "SQL Tutorial for Beginners — Full Course", channelName: "Apna College", videoId: "hlGoQC332VM", subject: "SQL", playlistName: "SQL by Apna College", description: "Complete SQL course from basic queries to advanced joins and subqueries.", order: 1 },

      // ── DBMS ──
      { title: "DBMS — Complete Course", channelName: "CodeHelp (Love Babbar)", videoId: "kBdlM6hNDAE", subject: "DBMS", playlistName: "DBMS by Code Help", description: "Database Management System complete course for interviews and university exams.", order: 1 },

      // ── OPERATING SYSTEM ──
      { title: "Operating System — Full Course", channelName: "CodeHelp (Love Babbar)", videoId: "3obEP8eLsCw", subject: "Operating System", playlistName: "OS by Code Help", description: "Complete OS course covering process scheduling, memory management, deadlocks, file systems.", order: 1 },
      { title: "Operating Systems — Gate Smashers", channelName: "Gate Smashers", videoId: "xW_3r6xvSvM", subject: "Operating System", playlistName: "OS by Gate Smashers", description: "OS topics for GATE exam preparation by Gate Smashers.", order: 2 },

      // ── SYSTEM DESIGN ──
      { title: "System Design for Beginners", channelName: "Shivam Tiwari", videoId: "rExFReLJ4m8", subject: "System Design", playlistName: "System Design by Shivam Tiwari", description: "Beginner-friendly system design concepts for software engineers.", order: 1 },
      { title: "System Design Masterclass", channelName: "Piyush Garg", videoId: "i7twT3x5yv8", subject: "System Design", playlistName: "System Design by Piyush Garg", description: "Comprehensive system design series covering real-world architectures.", order: 2 },

      // ── COMPUTER NETWORKS ──
      { title: "Computer Networks — Full Course", channelName: "Kunal Kushwaha", videoId: "IPvYjXCsTg8", subject: "Computer Networks", playlistName: "Networks by Kunal Kushwaha", description: "Complete computer networking course covering OSI, TCP/IP, HTTP, DNS, and more.", order: 1 },
      { title: "Computer Networks — Gate Smashers", channelName: "Gate Smashers", videoId: "JFF2vAaN6Oo", subject: "Computer Networks", playlistName: "Networks by Gate Smashers", description: "CN topics for GATE exam with visual explanations.", order: 2 },

      // ── WEB DEVELOPMENT ──
      { title: "Web Development Full Course — Hindi", channelName: "Chai aur Code", videoId: "sHivhgva", subject: "Web Development", playlistName: "Web Dev by Chai aur Code", description: "Full stack web development in Hindi by Hitesh Choudhary (Chai aur Code).", order: 1 },
      { title: "Responsive Web Design — Full Course", channelName: "freeCodeCamp", videoId: "nu_pCVPKzTk", subject: "Web Development", playlistName: "Web Dev by freeCodeCamp", description: "Complete responsive web design course including HTML, CSS, Flexbox, Grid.", order: 2 },

      // ── GATE PREPARATION ──
      { title: "GATE CS — Complete Revision", channelName: "Gate Smashers", videoId: "xW_3r6xvSvM", subject: "GATE Preparation", playlistName: "GATE by Gate Smashers", description: "All GATE CS topics: Algorithms, OS, DBMS, CN, Discrete Math in one place.", order: 1 },
      { title: "GATE Mathematics — Full Course", channelName: "Gate Smashers", videoId: "JFF2vAaN6Oo", subject: "GATE Preparation", playlistName: "GATE Maths by Gate Smashers", description: "Engineering Mathematics for GATE: Calculus, Linear Algebra, Probability, etc.", order: 2 },

      // ── NPTEL COURSES ──
      { title: "Programming in Java — NPTEL", channelName: "NPTEL", videoId: "mVNHPpvXY5c", subject: "Java", playlistName: "Java by NPTEL", description: "IIT faculty's Java programming course — rigorous and comprehensive.", order: 5 },
      { title: "Data Structures & Algorithms — NPTEL", channelName: "NPTEL", videoId: "zWg7U0OEAoE", subject: "DSA", playlistName: "DSA by NPTEL", description: "DSA by IIT professors — detailed mathematical foundations.", order: 6 },
    ];
    await YoutubeVideo.insertMany(youtubeVideos);

    console.log("\n✅ Database seeded successfully!");
    console.log(`   📚 Courses: ${courses.length}`);
    console.log(`   📝 Topics: ${topics.length}`);
    console.log(`   ⚡ Revisions: ${revisions.length}`);
    console.log(`   🎯 Interview Questions: ${interviewQuestions.length}`);
    console.log(`   🔧 Git Commands: ${gitCommands.length}`);
    console.log(`   📄 PDF Resources: ${resourcePdfs.length}`);
    console.log(`   ▶️  YouTube Videos: ${youtubeVideos.length}`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
