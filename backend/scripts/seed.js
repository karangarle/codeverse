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
import { interviewQuestions } from "./questionsData.js";

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
    // COURSES
    // ─────────────────────────────────────────
    console.log("📚 Seeding Courses...");

    const coursesData = [
      {
        title: "React.js Essentials",
        slug: "react-js-essentials",
        description: "Master React.js from core JSX and state hooks up to performance tuning and advanced code-splitting architectures.",
        level: "beginner",
        language: "english",
        duration: 240,
        createdBy: admin._id,
        isPublished: true,
        order: 1,
      },
      {
        title: "Node.js & Express",
        slug: "node-js-express",
        description: "Build scalable APIs and event-driven backends with advanced streams, subprocess clustering, and robust API security middlewares.",
        level: "intermediate",
        language: "english",
        duration: 300,
        createdBy: admin._id,
        isPublished: true,
        order: 2,
      },
      {
        title: "Data Structures & Algorithms",
        slug: "data-structures-algorithms",
        description: "Master DSA interview patterns including Arrays sliding window, Kadane's logic, Linked Lists, logarithmic searches, and Dynamic Programming.",
        level: "intermediate",
        language: "english",
        duration: 360,
        createdBy: admin._id,
        isPublished: true,
        order: 3,
      },
      {
        title: "SQL & Databases",
        slug: "sql-databases",
        description: "Deep dive into DBMS concepts: SQL Joins, Indexing, Normalization, ACID compliance, Mongo aggregate pipelines, and scaling with replication & sharding.",
        level: "intermediate",
        language: "english",
        duration: 280,
        createdBy: admin._id,
        isPublished: true,
        order: 4,
      },
    ];

    const seededCourses = await Course.insertMany(coursesData);
    const reactCourse = seededCourses[0];
    const nodeCourse = seededCourses[1];
    const dsaCourse = seededCourses[2];
    const dbCourse = seededCourses[3];

    // ─────────────────────────────────────────
    // TOPICS
    // ─────────────────────────────────────────
    console.log("📝 Seeding Topics...");

    const topics = [
      // ==========================================
      //  REACT TOPICS
      // ==========================================
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
}`,
        codeLanguage: "jsx",
        visualizeUrl: "https://react.dev/images/docs/illustrations/i_jsx-and-js.png",
        videoUrl: "https://www.youtube.com/watch?v=vz1RlUyrc3w&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige",
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

**Functional vs Class Components:**
- **Functional Components** — Modern, preferred approach (uses hooks)
- **Class Components** — Legacy, older style

**Props (Properties):**
Props are read-only data passed from a parent component to a child. They make components reusable with different data.

**Key Rules:**
- Props are immutable (never modify props directly)
- Always destructure props for cleaner code
- Use default parameters for fallbacks`,
        codeSnippet: `// Reusable Card Component
function CourseCard({ title, description, level = "beginner", duration }) {
  return (
    <div className="card">
      <span className="badge">{level}</span>
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
    </div>
  );
}`,
        codeLanguage: "jsx",
        visualizeUrl: "",
        videoUrl: "https://www.youtube.com/watch?v=vz1RlUyrc3w&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige",
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

**Important Rules:**
1. Never mutate state directly — always use the setter
2. State updates may be batched and asynchronous
3. When new state depends on old state, use a callback form`,
        codeSnippet: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    // ✅ Correct: callback form when using previous state
    setCount(prev => prev + 1);
  };

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>+</button>
    </div>
  );
}`,
        codeLanguage: "jsx",
        visualizeUrl: "",
        videoUrl: "https://www.youtube.com/watch?v=vz1RlUyrc3w&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige",
        order: 3,
        estimatedMinutes: 25,
        isPublished: true,
        createdBy: admin._id,
      },
      {
        course: reactCourse._id,
        title: "useEffect Hook",
        slug: "use-effect-hook",
        shortDescription: "useEffect lets you perform side effects in functional components (data fetching, intervals, etc.).",
        content: `Side effects are operations that happen outside the scope of rendering, such as fetching data from an API, subscribing to websockets, or manually modifying the DOM.

**Lifecycle Mapping:**
- **componentDidMount**: Run once by passing an empty dependency array \`[]\`
- **componentDidUpdate**: Run on state/prop change by adding items to dependency array \`[stateVal]\`
- **componentWillUnmount**: Run cleanup logic by returning a function inside the callback`,
        codeSnippet: `import { useEffect, useState } from 'react';

function UserStatus({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let active = true;
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => { if (active) setUser(data); });

    // Cleanup function
    return () => {
      active = false;
      console.log('Component cleanup or userId change');
    };
  }, [userId]); // Runs every time userId changes

  return <div>{user ? \`User: \${user.name}\` : 'Loading...'}</div>;
}`,
        codeLanguage: "jsx",
        visualizeUrl: "",
        videoUrl: "https://www.youtube.com/watch?v=vz1RlUyrc3w&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige",
        order: 4,
        estimatedMinutes: 30,
        isPublished: true,
        createdBy: admin._id,
      },
      {
        course: reactCourse._id,
        title: "useContext Hook",
        slug: "use-context-hook",
        shortDescription: "useContext enables clean global state distribution, preventing prop-drilling.",
        content: `The Context API provides a way to pass data down the component tree without having to pass props manually at every level (prop drilling).

**Core Concept:**
1. Create Context via \`createContext(defaultValue)\`
2. Wrap parent tree in \`<Context.Provider value={state}>\`
3. Consume context values inside any nested component via \`useContext(Context)\``,
        codeSnippet: `import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext('light');

function App() {
  const [theme, setTheme] = useState('dark');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Navbar />
    </ThemeContext.Provider>
  );
}

function Navbar() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className={\`navbar \${theme}\`}>
      <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
}`,
        codeLanguage: "jsx",
        visualizeUrl: "",
        videoUrl: "https://www.youtube.com/watch?v=vz1RlUyrc3w&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige",
        order: 5,
        estimatedMinutes: 20,
        isPublished: true,
        createdBy: admin._id,
      },
      {
        course: reactCourse._id,
        title: "useRef & DOM References",
        slug: "use-ref-hook",
        shortDescription: "useRef returns a mutable object that persists across renders without triggering a re-render.",
        content: `Unlike state variables, changing a ref's \`.current\` property does NOT trigger a re-render.

**Primary Use Cases:**
1. Accessing DOM nodes directly (focusing input, playing media)
2. Storing persistence values (e.g., previous state values, timer IDs)`,
        codeSnippet: `import { useRef, useEffect } from 'react';

function FormInput() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus(); // Direct DOM manipulation
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Enter name" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}`,
        codeLanguage: "jsx",
        visualizeUrl: "",
        videoUrl: "https://www.youtube.com/watch?v=vz1RlUyrc3w&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige",
        order: 6,
        estimatedMinutes: 20,
        isPublished: true,
        createdBy: admin._id,
      },
      {
        course: reactCourse._id,
        title: "useReducer Hook",
        slug: "use-reducer-hook",
        shortDescription: "useReducer is an alternative to useState for managing complex state structures in functional components.",
        content: `When state transition depends on multiple conditions or sub-actions, \`useReducer\` keeps the state transition logic clean, isolated, and highly predictable.

**Structure:**
- **Reducer Function**: \`(state, action) => newState\` (must be a pure function)
- **Dispatch**: Sends action objects to the reducer to trigger transitions`,
        codeSnippet: `import { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: Math.max(0, state.count - 1) };
    default: return state;
  }
};

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}`,
        codeLanguage: "jsx",
        visualizeUrl: "",
        videoUrl: "https://www.youtube.com/watch?v=vz1RlUyrc3w&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige",
        order: 7,
        estimatedMinutes: 25,
        isPublished: true,
        createdBy: admin._id,
      },
      {
        course: reactCourse._id,
        title: "React.memo & useCallback & useMemo",
        slug: "react-performance-opt",
        shortDescription: "Learn to reduce unnecessary re-renders using shallow rendering guards and reference memoization hooks.",
        content: `Performance issues in React often stem from redundant component updates.

**When to memoize?**
- **React.memo**: Memoizes a component to prevent updates unless props have changed.
- **useMemo**: Caches result calculations. Only recalculates when dependent inputs change.
- **useCallback**: Caches function references. Prevents children components from re-rendering due to fresh function instances on parent update.`,
        codeSnippet: `import React, { useState, useMemo, useCallback } from 'react';

const ChildButton = React.memo(({ onClick }) => {
  console.log('Button render');
  return <button onClick={onClick}>Click me</button>;
});

function App() {
  const [count, setCount] = useState(0);

  // useCallback keeps reference same
  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  // useMemo caches value
  const isCountEven = useMemo(() => {
    return count % 2 === 0;
  }, [count]);

  return (
    <div>
      <p>Is Even: {isCountEven ? 'Yes' : 'No'}</p>
      <ChildButton onClick={handleClick} />
    </div>
  );
}`,
        codeLanguage: "jsx",
        visualizeUrl: "",
        videoUrl: "https://www.youtube.com/watch?v=vz1RlUyrc3w&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige",
        order: 8,
        estimatedMinutes: 30,
        isPublished: true,
        createdBy: admin._id,
      },
      {
        course: reactCourse._id,
        title: "React Virtualized & Windowing",
        slug: "react-virtualized",
        shortDescription: "Render huge arrays of data efficiently by updating only elements that are visible on the viewport.",
        content: `Rendering 10,000 DOM nodes simultaneously is extremely resource intensive.

**Windowing concept:**
Instead of placing all 10,000 items in the DOM, windowing libraries (like \`react-window\` or \`react-virtualized\`) only construct the DOM elements that reside inside the current scroll bounds of the user. As the user scrolls, items outside are recycled or destroyed.`,
        codeSnippet: `import { FixedSizeList as List } from 'react-window';

const Row = ({ index, style }) => (
  <div style={style} className="row">
    Row index: {index}
  </div>
);

function VirtualList({ items }) {
  return (
    <List
      height={400}
      width={300}
      itemCount={items.length}
      itemSize={35} // Height of each row
    >
      {Row}
    </List>
  );
}`,
        codeLanguage: "jsx",
        visualizeUrl: "",
        videoUrl: "https://www.youtube.com/watch?v=vz1RlUyrc3w&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige",
        order: 9,
        estimatedMinutes: 20,
        isPublished: true,
        createdBy: admin._id,
      },
      {
        course: reactCourse._id,
        title: "React Suspense & Concurrent Rendering",
        slug: "react-suspense",
        shortDescription: "Introduce asynchronous chunk rendering and transitions using Suspense fallback loading screens.",
        content: `React 18 Concurrent Rendering splits long rendering tasks into interruptible chunks.

**Features:**
- **Suspense**: Suspends rendering of a component until an operation completes (e.g., lazy components loading, resource fetches).
- **useTransition**: Marks a state change as a 'transition', meaning it can be interrupted by higher priority interactions (like keystrokes) to prevent UI freezing.`,
        codeSnippet: `import { lazy, Suspense, useState, useTransition } from 'react';

const LazyDashboard = lazy(() => import('./Dashboard'));

function App() {
  const [tab, setTab] = useState('home');
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (newTab) => {
    // Non-urgent tab rendering is marked as transition
    startTransition(() => {
      setTab(newTab);
    });
  };

  return (
    <div>
      <button onClick={() => handleTabChange('dashboard')}>Show Dashboard</button>
      <Suspense fallback={<div>Loading Dashboard module...</div>}>
        {tab === 'dashboard' && <LazyDashboard />}
      </Suspense>
    </div>
  );
}`,
        codeLanguage: "jsx",
        visualizeUrl: "",
        videoUrl: "https://www.youtube.com/watch?v=vz1RlUyrc3w&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige",
        order: 10,
        estimatedMinutes: 25,
        isPublished: true,
        createdBy: admin._id,
      },
      {
        course: reactCourse._id,
        title: "Error Boundaries",
        slug: "error-boundaries",
        shortDescription: "Handle JavaScript exceptions inside component hierarchies gracefully using class boundaries.",
        content: `A JavaScript error in part of the UI shouldn't crash the entire React application.

**Implementation:**
React Error Boundaries must be written as class components, defining \`getDerivedStateFromError()\` or \`componentDidCatch()\` to store the error state and log the stack traces.`,
        codeSnippet: `import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true }; // Trigger fallback rendering
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="error-fallback">Something went wrong.</div>;
    }
    return this.props.children;
  }
}`,
        codeLanguage: "jsx",
        visualizeUrl: "",
        videoUrl: "https://www.youtube.com/watch?v=vz1RlUyrc3w&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige",
        order: 11,
        estimatedMinutes: 20,
        isPublished: true,
        createdBy: admin._id,
      },

      // ==========================================
      //  NODE.JS TOPICS
      // ==========================================
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
Because instead of waiting (blocking) for I/O operations to complete, it registers a callback and moves on to the next task. When the I/O finishes, the callback runs.`,
        codeSnippet: `// Demonstrating Non-Blocking I/O
const fs = require('fs');

console.log('1. Start reading file...');

// Non-blocking: Node registers callback and moves on
fs.readFile('./data.txt', 'utf8', (err, data) => {
  if (err) return console.error(err);
  console.log('3. File content:', data);
});

console.log('2. This runs BEFORE file is read!');`,
        codeLanguage: "javascript",
        visualizeUrl: "",
        videoUrl: "https://www.youtube.com/watch?v=EH3vGeqeIAo&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW",
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
- **GET** — Read resources
- **POST** — Create resources
- **PUT** — Replace resources
- **PATCH** — Update specific resource fields
- **DELETE** — Remove resources

**Express Middleware:**
Middleware are functions that run between the request and response. They can modify req/res, end the request cycle, or call the next middleware.`,
        codeSnippet: `import express from 'express';

const app = express();
app.use(express.json());

let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
];

app.get('/api/users', (req, res) => {
  res.json({ success: true, data: users });
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
});

app.listen(5000, () => console.log('Server running on port 5000'));`,
        codeLanguage: "javascript",
        visualizeUrl: "",
        videoUrl: "https://www.youtube.com/watch?v=EH3vGeqeIAo&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW",
        order: 2,
        estimatedMinutes: 30,
        isPublished: true,
        createdBy: admin._id,
      },
      {
        course: nodeCourse._id,
        title: "Streams & Buffers in Node.js",
        slug: "streams-buffers-node",
        shortDescription: "Process files and large chunks of data sequentially in memory using Streams and raw binary Buffers.",
        content: `Reading a 5GB file using \`fs.readFile\` will crash servers with low memory. Streams solve this by processing the data chunk-by-chunk.

**Stream types:**
- **Readable**: Reads data (e.g. \`fs.createReadStream\`)
- **Writable**: Writes data (e.g. \`fs.createWriteStream\`)
- **Duplex**: Readable and Writable (e.g. network socket)
- **Transform**: Modifies data as it passes (e.g. zlib compression)

**Buffers**:
Raw binary segments stored outside the V8 heap in fixed-size allocations. Used to hold chunks of raw binary data.`,
        codeSnippet: `const fs = require('fs');
const zlib = require('zlib');

// Compress a huge file on the fly using streams and pipe
const readable = fs.createReadStream('./large_input.txt');
const writable = fs.createWriteStream('./large_input.txt.gz');
const gzip = zlib.createGzip();

readable
  .pipe(gzip)
  .pipe(writable)
  .on('finish', () => console.log('File compressed successfully!'));`,
        codeLanguage: "javascript",
        visualizeUrl: "",
        videoUrl: "https://www.youtube.com/watch?v=EH3vGeqeIAo&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW",
        order: 3,
        estimatedMinutes: 25,
        isPublished: true,
        createdBy: admin._id,
      },
      {
        course: nodeCourse._id,
        title: "Child Processes & Clustering",
        slug: "child-processes-clustering",
        shortDescription: "Distribute workload across CPU cores and spawn subprocess commands using child_process module.",
        content: `Node's single-threaded nature means heavy tasks block the event loop.

**Workarounds:**
1. **Child Process**: Spawn new operating system commands or sub-instances of Node via \`spawn\`, \`exec\`, or \`fork\`.
2. **Clustering**: Spawn duplicate instances of the server listening on the same port, handled by Nginx or PM2 to balance loads.`,
        codeSnippet: `// Clustering example in vanilla Node
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isPrimary) {
  console.log(\`Primary \${process.pid} is running\`);
  
  // Fork workers for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  // Workers share the TCP connection
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Worker response\\n');
  }).listen(8000);
}`,
        codeLanguage: "javascript",
        visualizeUrl: "",
        videoUrl: "https://www.youtube.com/watch?v=EH3vGeqeIAo&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW",
        order: 4,
        estimatedMinutes: 30,
        isPublished: true,
        createdBy: admin._id,
      },
      {
        course: nodeCourse._id,
        title: "API Performance & Caching",
        slug: "api-performance-caching",
        shortDescription: "Optimize server response times using memory cache systems, debouncing queries, and index strategies.",
        content: `To build highly performant backends, we must reduce slow operations like database queries and remote API requests.

**Optimization Methods:**
- **In-Memory Caching (Redis/NodeCache)**: Store frequently read static database results in RAM.
- **Client-Side Debouncing**: Group quick consecutive actions into one transaction request.
- **API Throttling**: Limit maximum API executions during load bursts to keep services responsive.`,
        codeSnippet: `// Simple in-memory Cache Middleware
const cache = {};

function cacheMiddleware(req, res, next) {
  const key = req.originalUrl;
  if (cache[key]) {
    console.log('Serving cache hit!');
    return res.json(cache[key]);
  }
  
  // Override res.json to capture response
  const originalJson = res.json;
  res.json = (data) => {
    cache[key] = data; // store in cache
    originalJson.call(res, data);
  };
  next();
}`,
        codeLanguage: "javascript",
        visualizeUrl: "",
        videoUrl: "https://www.youtube.com/watch?v=EH3vGeqeIAo&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW",
        order: 5,
        estimatedMinutes: 20,
        isPublished: true,
        createdBy: admin._id,
      },
      {
        course: nodeCourse._id,
        title: "Node.js API Security",
        slug: "nodejs-security",
        shortDescription: "Learn to defend Node endpoints from XSS, SQL Injection, CSRF, and DoS attacks.",
        content: `A production Express API should implement modern security best practices:

- **Helmet**: Sets secure HTTP response headers.
- **CORS**: Defines which external domains are allowed to access your API endpoints.
- **express-rate-limit**: Restricts the maximum number of requests from an IP in a time window to prevent Denial of Service (DoS) attacks.
- **Sanitization**: Filters request variables to escape characters and prevent SQL/NoSQL injections.`,
        codeSnippet: `import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const app = express();

app.use(helmet()); // Secure HTTP headers
app.use(cors({ origin: 'https://production-site.com' })); // Strict CORS

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100 // limit each IP to 100 requests per window
});
app.use(limiter);`,
        codeLanguage: "javascript",
        visualizeUrl: "",
        videoUrl: "https://www.youtube.com/watch?v=EH3vGeqeIAo&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW",
        order: 6,
        estimatedMinutes: 25,
        isPublished: true,
        createdBy: admin._id,
      },
      {
        course: nodeCourse._id,
        title: "File Operations using fs",
        slug: "file-operations-fs",
        shortDescription: "Read, write, append, and delete files on local disks synchronously or asynchronously.",
        content: `Node.js provides the \`fs\` (File System) module to interact with files. 

**Asynchronous vs Synchronous:**
- **Synchronous** methods (e.g. \`readFileSync\`) block the event loop and should be avoided in multi-user environments.
- **Asynchronous** methods (e.g. \`readFile\` or \`fs/promises\`) handle operations in the libuv thread pool, keeping the main thread free.`,
        codeSnippet: `// Asynchronous Promisified File Operations
const fs = require('fs/promises');

async function manageFiles() {
  try {
    // Write file
    await fs.writeFile('./sample.txt', 'Learning CodeVerse!', 'utf8');
    
    // Read file
    const content = await fs.readFile('./sample.txt', 'utf8');
    console.log('File Content:', content);
  } catch (err) {
    console.error('File Error:', err);
  }
}

manageFiles();`,
        codeLanguage: "javascript",
        visualizeUrl: "",
        videoUrl: "https://www.youtube.com/watch?v=EH3vGeqeIAo&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW",
        order: 7,
        estimatedMinutes: 15,
        isPublished: true,
        createdBy: admin._id,
      },

      // ==========================================
      //  DSA TOPICS
      // ==========================================
      {
        course: dsaCourse._id,
        title: "Arrays — Foundation",
        slug: "arrays-foundation",
        shortDescription: "Arrays are contiguous memory blocks storing elements of the same type. They are the most fundamental data structure.",
        content: `An array stores elements in a contiguous block of memory. Each element is accessed by its index (0-based in most languages).

**Time Complexities:**
- Access: O(1)
- Search: O(n)
- Insertion: O(n)
- Deletion: O(n)

**Common Techniques:**
- **Two Pointers** — Useful for sorted arrays
- **Sliding Window** — Efficient for subarray metrics`,
        codeSnippet: `// Sliding Window Example: Max sum of k consecutive elements
function maxSumSubarray(arr, k) {
  let maxVal = 0, currentSum = 0;
  for (let i = 0; i < k; i++) currentSum += arr[i];
  maxVal = currentSum;

  for (let i = k; i < arr.length; i++) {
    currentSum += arr[i] - arr[i - k]; // Slide
    maxVal = Math.max(maxVal, currentSum);
  }
  return maxVal;
}`,
        codeLanguage: "javascript",
        visualizeUrl: "",
        videoUrl: "https://www.youtube.com/watch?v=EAR7Mte8qA4&list=PLgUwDviBIf0oF1DYAnJOIMrjvAEgaKhj1",
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
- Singly Linked List (next pointer only)
- Doubly Linked List (next and previous pointers)
- Circular Linked List (last node points to head)

**Cycle Detection:**
Floyd's Cycle Detection uses two pointers (slow and fast) to trace nodes. If the pointers meet, a cycle exists.`,
        codeSnippet: `class Node {
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}

// Cycle Detection logic (Floyd's algorithm)
function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true; // cycle found
  }
  return false;
}`,
        codeLanguage: "javascript",
        visualizeUrl: "",
        videoUrl: "https://www.youtube.com/watch?v=EAR7Mte8qA4&list=PLgUwDviBIf0oF1DYAnJOIMrjvAEgaKhj1",
        order: 2,
        estimatedMinutes: 45,
        isPublished: true,
        createdBy: admin._id,
      },
      {
        course: dsaCourse._id,
        title: "Stacks & Queues",
        slug: "stacks-queues",
        shortDescription: "Stacks follow Last-In-First-Out (LIFO), whereas Queues follow First-In-First-Out (FIFO) logic.",
        content: `Stacks and Queues are abstract data structures used for ordering items.

- **Stack**: Operations are \`push\` (add to top) and \`pop\` (remove from top). Used in undo actions, backtracking, and browser history.
- **Queue**: Operations are \`enqueue\` (add to back) and \`dequeue\` (remove from front). Used in printing queues and CPU scheduling.`,
        codeSnippet: `// Stack class implementation
class Stack {
  constructor() { this.items = []; }
  push(el) { this.items.push(el); }
  pop() { return this.items.pop(); }
  peek() { return this.items[this.items.length - 1]; }
}

// Queue class implementation
class Queue {
  constructor() { this.items = []; }
  enqueue(el) { this.items.push(el); }
  dequeue() { return this.items.shift(); }
  front() { return this.items[0]; }
}`,
        codeLanguage: "javascript",
        visualizeUrl: "",
        videoUrl: "https://www.youtube.com/watch?v=EAR7Mte8qA4&list=PLgUwDviBIf0oF1DYAnJOIMrjvAEgaKhj1",
        order: 3,
        estimatedMinutes: 20,
        isPublished: true,
        createdBy: admin._id,
      },
      {
        course: dsaCourse._id,
        title: "Binary Search",
        slug: "binary-search",
        shortDescription: "Find elements in a sorted array by halving the search space at each step in logarithmic time.",
        content: `Binary Search runs in **O(log n)** worst-case time complexity.

**Pre-requisite:**
The target array must be **sorted**.

**Algorithm:**
Compare the target value to the middle element. If it matches, return the index. If target is smaller, repeat search on left sub-array; if target is larger, search right sub-array.`,
        codeSnippet: `function binarySearch(arr, target) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) start = mid + 1;
    else end = mid - 1;
  }
  return -1; // Not found
}

console.log(binarySearch([10, 20, 30, 40, 50], 30)); // 2`,
        codeLanguage: "javascript",
        visualizeUrl: "",
        videoUrl: "https://www.youtube.com/watch?v=EAR7Mte8qA4&list=PLgUwDviBIf0oF1DYAnJOIMrjvAEgaKhj1",
        order: 4,
        estimatedMinutes: 30,
        isPublished: true,
        createdBy: admin._id,
      },
      {
        course: dsaCourse._id,
        title: "Dynamic Programming",
        slug: "dynamic-programming",
        shortDescription: "Solve optimization problems by dividing them into subproblems and storing computed values (Memoization).",
        content: `Dynamic Programming (DP) optimizes recursive relations that solve redundant overlapping subproblems.

**Approaches:**
1. **Memoization (Top-Down)**: Cache computed values on recursive traversals.
2. **Tabulation (Bottom-Up)**: Solve values iteratively starting from baseline cases.`,
        codeSnippet: `// Fibonacci using DP (Memoization) - O(n) time
function fibonacci(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n] !== undefined) return memo[n];
  
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}

console.log(fibonacci(50)); // 12586269025 (Instantly!)`,
        codeLanguage: "javascript",
        visualizeUrl: "",
        videoUrl: "https://www.youtube.com/watch?v=EAR7Mte8qA4&list=PLgUwDviBIf0oF1DYAnJOIMrjvAEgaKhj1",
        order: 5,
        estimatedMinutes: 40,
        isPublished: true,
        createdBy: admin._id,
      },

      // ==========================================
      //  SQL & DATABASE TOPICS
      // ==========================================
      {
        course: dbCourse._id,
        title: "SQL Joins",
        slug: "sql-joins",
        shortDescription: "SQL Joins let you combine records from multiple tables based on common matching fields.",
        content: `Relational database structures distribute items in multiple normalized tables. Joins link them together:

- **INNER JOIN**: Returns rows with matching values in both tables.
- **LEFT JOIN**: Returns all rows from left table, matching rows from right.
- **RIGHT JOIN**: Returns all rows from right table, matching rows from left.
- **FULL JOIN**: Returns rows with a match in either left or right table.`,
        codeSnippet: `/* SQL Joins syntax */
-- Inner Join
SELECT orders.id, users.name
FROM orders
INNER JOIN users ON orders.user_id = users.id;

-- Left Join
SELECT users.name, orders.id
FROM users
LEFT JOIN orders ON users.id = orders.user_id;`,
        codeLanguage: "sql",
        visualizeUrl: "",
        videoUrl: "https://www.youtube.com/watch?v=hlGoQC332VM",
        order: 1,
        estimatedMinutes: 20,
        isPublished: true,
        createdBy: admin._id,
      },
      {
        course: dbCourse._id,
        title: "DBMS Keys",
        slug: "dbms-keys",
        shortDescription: "Identify rows uniquely and define relational mappings using Candidate, Primary, and Foreign keys.",
        content: `Keys are constraints defined on table attributes to enforce structural rules:

- **Primary Key**: Uniquely identifies a row. Cannot contain NULL values.
- **Unique Key**: Uniquely identifies a row. Allows NULL values.
- **Foreign Key**: References the Primary Key of another table, ensuring referential integrity.
- **Candidate Key**: A minimal set of attributes that can uniquely identify a row.
- **Composite Key**: A primary key made of multiple attributes.`,
        codeSnippet: `/* Defining keys in SQL Table Creation */
CREATE TABLE users (
  id INT PRIMARY KEY,
  email VARCHAR(100) UNIQUE
);

CREATE TABLE orders (
  order_id INT PRIMARY KEY,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);`,
        codeLanguage: "sql",
        visualizeUrl: "",
        videoUrl: "https://www.youtube.com/watch?v=kBdlM6hNDAE",
        order: 2,
        estimatedMinutes: 15,
        isPublished: true,
        createdBy: admin._id,
      },
      {
        course: dbCourse._id,
        title: "DBMS Normalization",
        slug: "dbms-normalization",
        shortDescription: "Reduce redundancy and avoid data anomalies by applying 1NF, 2NF, 3NF, and BCNF normalization rules.",
        content: `Normalization partitions tables systematically to eliminate database anomalies:

- **First Normal Form (1NF)**: Atomic values per cell (no repeating arrays/groups).
- **Second Normal Form (2NF)**: Meets 1NF, and all non-key columns must fully depend on the entire Primary Key.
- **Third Normal Form (3NF)**: Meets 2NF, and no transitive functional dependencies are present (non-key columns do not depend on other non-key columns).`,
        codeLanguage: "sql",
        visualizeUrl: "",
        videoUrl: "https://www.youtube.com/watch?v=kBdlM6hNDAE",
        order: 3,
        estimatedMinutes: 25,
        isPublished: true,
        createdBy: admin._id,
      },
      {
        course: dbCourse._id,
        title: "ACID Transactions & Concurrency",
        slug: "acid-concurrency",
        shortDescription: "ACID rules ensure transactional reliability, while concurrency control manages simultaneous database edits.",
        content: `ACID compliance guarantees that all database updates are bulletproof:

- **Atomicity**: Entire transaction succeeds or fails.
- **Consistency**: Database transitions between valid states adhering to constraints.
- **Isolation**: Concurrent transactions execute without cross-contamination.
- **Durability**: Committed data survives crashes.

**Concurrency control:**
- **Optimistic Locking**: Uses version fields; checks conflicts before commit.
- **Pessimistic Locking**: Obtains locks on rows while reading to prevent write changes.`,
        codeLanguage: "sql",
        visualizeUrl: "",
        videoUrl: "https://www.youtube.com/watch?v=kBdlM6hNDAE",
        order: 4,
        estimatedMinutes: 20,
        isPublished: true,
        createdBy: admin._id,
      },
      {
        course: dbCourse._id,
        title: "SQL Truncate vs Delete vs Drop",
        slug: "sql-truncate-delete-drop",
        shortDescription: "Understand differences in speed, transactional rollback, and table structure deletion.",
        content: `These SQL commands differ in scope, velocity, and rollback capabilities:

| Command | Category | scope | Rollback | Speed |
|---------|----------|-------|----------|-------|
| DELETE  | DML      | Selected rows | Yes (slow) | Slow |
| TRUNCATE| DDL      | All rows (structure kept) | No | Fast |
| DROP    | DDL      | Entire table & structure | No | Fast |`,
        codeSnippet: `-- Delete specific rows
DELETE FROM employees WHERE status = 'inactive';

-- Reset table records instantly (releases space)
TRUNCATE TABLE logs;

-- Drop table completely from memory
DROP TABLE temp_records;`,
        codeLanguage: "sql",
        visualizeUrl: "",
        videoUrl: "https://www.youtube.com/watch?v=hlGoQC332VM",
        order: 5,
        estimatedMinutes: 15,
        isPublished: true,
        createdBy: admin._id,
      },
      {
        course: dbCourse._id,
        title: "MongoDB Aggregation Pipeline",
        slug: "mongo-aggregation",
        shortDescription: "Filter, group, join, and reshape document data sequentially using stages in MongoDB.",
        content: `The aggregation pipeline is a framework for multi-stage document transformations.

**Common Stages:**
- **$match**: Filters documents (analogous to WHERE)
- **$group**: Groups and calculates values ($sum, $avg)
- **$project**: Filters output fields (analogous to SELECT)
- **$lookup**: Performs joins against other collections (analogous to LEFT JOIN)`,
        codeSnippet: `// Aggregation query: count total spent per user
db.orders.aggregate([
  { $match: { status: "completed" } },
  {
    $group: {
      _id: "$userId",
      totalSpent: { $sum: "$totalAmount" },
      ordersCount: { $sum: 1 }
    }
  },
  { $sort: { totalSpent: -1 } }
]);`,
        codeLanguage: "javascript",
        visualizeUrl: "",
        videoUrl: "https://www.youtube.com/watch?v=kBdlM6hNDAE",
        order: 6,
        estimatedMinutes: 25,
        isPublished: true,
        createdBy: admin._id,
      },
      {
        course: dbCourse._id,
        title: "Replication vs Sharding in MongoDB",
        slug: "replication-sharding-mongo",
        shortDescription: "Scale your Mongo collections using replica sets for high availability and shard keys for horizontal partitioning.",
        content: `- **Replication**: Configures duplicate copies of data across servers (Replica Set: 1 Primary, 2+ Secondaries). If the Primary server fails, an election selects a Secondary to assume write control.
- **Sharding**: Partitions datasets across separate servers (shards) based on a designated Shard Key. Enables horizontal scalability.`,
        codeLanguage: "javascript",
        visualizeUrl: "",
        videoUrl: "https://www.youtube.com/watch?v=kBdlM6hNDAE",
        order: 7,
        estimatedMinutes: 20,
        isPublished: true,
        createdBy: admin._id,
      },
    ];

    await CourseTopic.insertMany(topics);
    console.log(`Successfully seeded ${topics.length} course topics.`);

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
      {
        title: "Authentication vs Authorization",
        category: "Node & Express",
        content: "Authentication verifies who you are, whereas Authorization verifies what you have permission to access.",
        keyPoints: [
          "Authentication: Login, password verification, MFA, JWT generation.",
          "Authorization: Roles (admin, user), specific permissions, resource guards.",
          "AuthN always occurs first, followed by AuthZ checks.",
        ],
      },
      {
        title: "Regular vs Arrow Functions",
        category: "JavaScript",
        content: "Regular functions dynamically bind 'this' based on how they are called, while Arrow functions lexically bind 'this' to their enclosing context.",
        keyPoints: [
          "Regular functions have local 'arguments' object and can be constructors ('new').",
          "Arrow functions inherit 'this' from surrounding lexical scope.",
          "Arrow functions cannot be instantiated with 'new' and do not have 'arguments'.",
        ],
      },
      {
        title: "Remove Array Duplicates",
        category: "JavaScript",
        content: "Removing duplicate values from a collection can be achieved using modern ES6 structures or manual comparison algorithms.",
        keyPoints: [
          "ES6 Set method: [...new Set(arr)] is the cleanest O(N) way.",
          "Filter method: arr.filter((x, i) => arr.indexOf(x) === i) is O(N²).",
          "Without methods: nested loops comparing and building a unique output array.",
        ],
      },
      {
        title: "Debouncing in JavaScript",
        category: "JavaScript",
        content: "Debouncing delays function execution until a certain amount of idle time has elapsed since the last trigger.",
        keyPoints: [
          "Used on events like typing, resizing, or scrolling to optimize page performance.",
          "Uses setTimeout internally to queue function execution.",
          "Resets and clears the timeout timer on every consecutive trigger.",
        ],
      },
      {
        title: "Streams and Buffers",
        category: "Node & Express",
        content: "Buffers store chunked raw binary data temporarily in memory, while Streams process data incrementally over time without blocking heap space.",
        keyPoints: [
          "Buffer: Fixed-size allocation outside V8 engine memory heap.",
          "Stream: Incremental reader/writer (Readable, Writable, Duplex, Transform).",
          "Prevents memory overflows when reading/writing massive gigabyte-scale files.",
        ],
      },
      {
        title: "Indexing in MongoDB",
        category: "MongoDB",
        content: "Indexes optimize database query execution times by storing a small portion of the collection's dataset in an ordered B-Tree traversal tree.",
        keyPoints: [
          "Speeds up queries from O(N) collection scans to O(log N) index lookups.",
          "Unique indexes prevent insertion of duplicate document values.",
          "Slightly slows down write operations (insert/update/delete) due to index rebuilding.",
        ],
      },
    ];
    await Revision.insertMany(revisions);

    // ─────────────────────────────────────────
    // INTERVIEW QUESTIONS
    // ─────────────────────────────────────────
    console.log(`🎯 Seeding ${interviewQuestions.length} Interview Questions...`);
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
    // YOUTUBE VIDEOS
    // ─────────────────────────────────────────
    console.log("▶️  Seeding YouTube Playlists...");
    const youtubeVideos = [
      // ── APTITUDE ──
      { title: "Quantitative Aptitude - Number System", channelName: "Yash Jain", videoId: "JvJr5LfRr_c", subject: "Aptitude", playlistName: "Aptitude by Yash Jain", description: "Complete number system for aptitude and competitive exams.", order: 1 },
      { title: "Aptitude - Percentage Problems", channelName: "Yash Jain", videoId: "Ks5rQ6UDjbw", subject: "Aptitude", playlistName: "Aptitude by Yash Jain", description: "Percentages shortcuts and tricks for competitive exams.", order: 2 },

      // ── JAVA ──
      { title: "Java Tutorial for Beginners", channelName: "Telusko", videoId: "8cm1x4bySPM", subject: "Java", playlistName: "Java by Telusko", description: "Complete Java programming from scratch by Navin Reddy.", order: 1 },
      { title: "Java Full Course for Beginners", channelName: "Bro Code", videoId: "GdzRzWymT4c", subject: "Java", playlistName: "Java by Bro Code", description: "Learn Java in 12 hours with practical examples.", order: 2 },
      { title: "Java Tutorial for Beginners", channelName: "Programming with Mosh", videoId: "eIrMbAQSU34", subject: "Java", playlistName: "Java by Mosh", description: "Learn Java fundamentals in 2.5 hours by Mosh Hamedani.", order: 3 },
      { title: "Core Java Tutorial", channelName: "Durga Software Solutions", videoId: "6nDOdLV8Rws", subject: "Java", playlistName: "Java by Durga Software", description: "In-depth Java tutorials by Durga Software Solutions.", order: 4 },
      { title: "Programming in Java — NPTEL", channelName: "NPTEL", videoId: "mVNHPpvXY5c", subject: "Java", playlistName: "Java by NPTEL", description: "IIT faculty's Java programming course — rigorous and comprehensive.", order: 5 },

      // ── DSA ──
      { title: "Data Structures and Algorithms - Complete Course", channelName: "Kunal Kushwaha", videoId: "yRpLlJmRo2w", subject: "DSA", playlistName: "DSA by Kunal Kushwaha", description: "Full DSA course in Java by Kunal Kushwaha from community classroom.", order: 1 },
      { title: "A2Z DSA Sheet — Striver", channelName: "TakeUForward (Striver)", videoId: "0bHoB32fuj0", subject: "DSA", playlistName: "DSA by Striver (TakeUForward)", description: "Striver's A2Z DSA sheet video playlist — the best interview prep.", order: 2 },
      { title: "Data Structures and Algorithms", channelName: "Abdul Bari", videoId: "0IAPZzGSbME", subject: "DSA", playlistName: "DSA by Abdul Bari", description: "Classic DSA concepts explained mathematically by Abdul Bari.", order: 3 },
      { title: "DSA Masterclass — Complete Playlist", channelName: "Raghav Sir (Physics Wallah)", videoId: "5_5oE5lgrhw", subject: "DSA", playlistName: "DSA by Raghav Sir (PW)", description: "DSA course by PW's Raghav Sir — simplified for beginners.", order: 4 },
      { title: "Algorithms Explained — Learning Algo", channelName: "Learning Algo", videoId: "oBt53YbR9Kk", subject: "DSA", playlistName: "Algorithms by Learning Algo", description: "Clean visual explanations of common algorithms.", order: 5 },
      { title: "Data Structures & Algorithms Made Easy", channelName: "DSA Made Easy", videoId: "b1j4-Q6X9PY", subject: "DSA", playlistName: "DSA Made Easy", description: "Easy-to-follow data structures and algorithms tutorial series.", order: 6 },
      { title: "Data Structures & Algorithms — NPTEL", channelName: "NPTEL", videoId: "zWg7U0OEAoE", subject: "DSA", playlistName: "DSA by NPTEL", description: "DSA by IIT professors — detailed mathematical foundations.", order: 7 },

      // ── DSA FUNDAMENTALS ──
      { title: "DSA Fundamentals — Full Course", channelName: "Learning Algo", videoId: "9rhT3P1MDHk", subject: "DSA Fundamentals", playlistName: "DSA Fundamentals by Learning Algo", description: "Core data structure fundamentals before diving into advanced topics.", order: 1 },
      { title: "Data Structures for Beginners", channelName: "Jenny's Lectures CS IT", videoId: "AT14lCXuMKI", subject: "DSA Fundamentals", playlistName: "DSA Fundamentals by Jeni Ma'am", description: "Beginner-friendly DSA series by Jenny's Lectures.", order: 2 },

      // ── OOPs ──
      { title: "Object Oriented Programming in Java — Full Course", channelName: "Apna College", videoId: "BSVKUk58K6U", subject: "OOPs", playlistName: "OOPs by Apna College", description: "Complete OOPs concepts: Classes, Inheritance, Polymorphism, Abstraction, Encapsulation.", order: 1 },

      // ── PYTHON ──
      { title: "Python Tutorial for Beginners", channelName: "Apna College", videoId: "ERCMXc8x7mc", subject: "Python", playlistName: "Python by Apna College", description: "Python programming from basics to advanced by Apna College.", order: 1 },
      { title: "Python Full Course for Beginners", channelName: "Bro Code", videoId: "XKHEtdqhLK8", subject: "Python", playlistName: "Python by Bro Code", description: "Learn Python in one sitting with practical exercises by Bro Code.", order: 2 },
      { title: "Python for Beginners — Full Course", channelName: "Telusko", videoId: "QXeEoD0pB3E", subject: "Python", playlistName: "Python by Telusko", description: "Navin Reddy's Python tutorial series for absolute beginners.", order: 3 },
      { title: "Python OOP Tutorials - Complete Series", channelName: "Corey Schafer", videoId: "BJ-VvGyQxuo", subject: "Python", playlistName: "Python by Corey Schafer", description: "Excellent deep-dive into Python Object-Oriented Programming (OOP) concepts by Corey Schafer.", order: 4 },

      // ── SQL ──
      { title: "SQL Tutorial for Beginners — Full Course", channelName: "Apna College", videoId: "hlGoQC332VM", subject: "SQL", playlistName: "SQL by Apna College", description: "Complete SQL course from basic queries to advanced joins and subqueries.", order: 1 },

      // ── DBMS ──
      { title: "DBMS — Complete Course", channelName: "CodeHelp (Love Babbar)", videoId: "kBdlM6hNDAE", subject: "DBMS", playlistName: "DBMS by Code Help", description: "Database Management System complete course for interviews and university exams.", order: 1 },

      // ── OPERATING SYSTEM ──
      { title: "Operating System — Full Course", channelName: "CodeHelp (Love Babbar)", videoId: "rN9_h0jGg0Q", subject: "Operating System", playlistName: "OS by Code Help", description: "Complete OS course covering process scheduling, memory management, deadlocks, file systems.", order: 1 },
      { title: "Operating Systems — Gate Smashers", channelName: "Gate Smashers", videoId: "kU8O3yH_qSI", subject: "Operating System", playlistName: "OS by Gate Smashers", description: "OS topics for GATE exam preparation by Gate Smashers.", order: 2 },

      // ── SYSTEM DESIGN ──
      { title: "System Design for Beginners", channelName: "Shivam Tiwari", videoId: "rExFReLJ4m8", subject: "System Design", playlistName: "System Design by Shivam Tiwari", description: "Beginner-friendly system design concepts for software engineers.", order: 1 },
      { title: "System Design Masterclass", channelName: "Piyush Garg", videoId: "i7twT3x5yv8", subject: "System Design", playlistName: "System Design by Piyush Garg", description: "Comprehensive system design series covering real-world architectures.", order: 2 },

      // ── COMPUTER NETWORKS ──
      { title: "Computer Networks — Full Course", channelName: "Kunal Kushwaha", videoId: "IPvYjXCsTg8", subject: "Computer Networks", playlistName: "Networks by Kunal Kushwaha", description: "Complete computer networking course covering OSI, TCP/IP, HTTP, DNS, and more.", order: 1 },
      { title: "Computer Networks — Gate Smashers", channelName: "Gate Smashers", videoId: "J8495tF5h6s", subject: "Computer Networks", playlistName: "Networks by Gate Smashers", description: "CN topics for GATE exam with visual explanations.", order: 2 },

      // ── WEB DEVELOPMENT ──
      { title: "Web Development Full Course — Hindi", channelName: "Chai aur Code", videoId: "XmLOwJHFHf0", subject: "Web Development", playlistName: "Web Dev by Chai aur Code", description: "Full stack web development in Hindi by Hitesh Choudhary (Chai aur Code).", order: 1 },
      { title: "Responsive Web Design — Full Course", channelName: "freeCodeCamp", videoId: "nu_pCVPKzTk", subject: "Web Development", playlistName: "Web Dev by freeCodeCamp", description: "Complete responsive web design course including HTML, CSS, Flexbox, Grid.", order: 2 },

      // ── GATE PREPARATION ──
      { title: "GATE CS — Complete Revision", channelName: "Gate Smashers", videoId: "kU8O3yH_qSI", subject: "GATE Preparation", playlistName: "GATE by Gate Smashers", description: "All GATE CS topics: Algorithms, OS, DBMS, CN, Discrete Math in one place.", order: 1 },
    ];
    await YoutubeVideo.insertMany(youtubeVideos);

    console.log("\n✅ Database seeded successfully!");
    console.log(`   📚 Courses: ${seededCourses.length}`);
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
