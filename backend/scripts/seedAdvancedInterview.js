import mongoose from 'mongoose';
import dotenv from 'dotenv';
import InterviewQuestion from '../models/InterviewQuestion.js';
import connectDB from '../config/db.js';

dotenv.config();

const run = async () => {
  await connectDB();
  
  const advancedQuestions = [
    // --- React Advanced ---
    {
      question: "Can you explain the difference between useMemo and useCallback? When would you use them?",
      answer: "Both `useMemo` and `useCallback` are hooks used for performance optimization by memoizing values between re-renders.\n\n- **`useMemo`** memoizes the *result* of a calculation. You use it when you have an expensive synchronous computation that you don't want to re-run on every render unless its dependencies change.\n- **`useCallback`** memoizes the *function itself*. You use it when you are passing a callback function as a prop to a child component (especially one wrapped in `React.memo`), to prevent the child from unnecessarily re-rendering because a new function reference was created.\n\n```javascript\n// useMemo example\nconst expensiveResult = useMemo(() => computeMath(a, b), [a, b]);\n\n// useCallback example\nconst handleClick = useCallback(() => {\n  console.log('Clicked', param);\n}, [param]);\n```",
      difficulty: "medium",
      category: "React Advanced"
    },
    {
      question: "How does React Fiber improve performance compared to the older Stack Reconciler?",
      answer: "React Fiber is a complete rewrite of React's core reconciliation algorithm, introduced in React 16.\n\nOlder versions used a 'Stack Reconciler' which was synchronous and blocking. Once it started updating the component tree, it couldn't stop until it finished, which could cause dropped frames and lag during large updates.\n\n**Fiber** breaks rendering work into chunks and can *pause, abort, or yield* to the browser. It assigns priorities to updates. For example, a user typing in an input field (high priority) will pause the rendering of a heavy data table (low priority), ensuring the UI stays completely responsive and buttery smooth.",
      difficulty: "hard",
      category: "React Advanced"
    },
    {
      question: "What are React Error Boundaries and how do you implement them?",
      answer: "Error Boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the whole application.\n\nCurrently, Error Boundaries must be written as **Class Components**. A class becomes an error boundary if it defines `static getDerivedStateFromError()` (to render a fallback UI) or `componentDidCatch()` (to log the error info).\n\n```jsx\nclass ErrorBoundary extends React.Component {\n  state = { hasError: false };\n\n  static getDerivedStateFromError(error) {\n    return { hasError: true };\n  }\n\n  render() {\n    if (this.state.hasError) return <h1>Something went wrong.</h1>;\n    return this.props.children; \n  }\n}\n```",
      difficulty: "medium",
      category: "React Advanced"
    },
    {
      question: "When should you use the Context API vs Redux in a mid-sized application?",
      answer: "As a developer with 2 years of experience, this is a crucial architectural decision:\n\n- **Context API** is excellent for low-frequency updates, such as Theme (Dark/Light mode), User Authentication status, or Localization/Language. It causes all consuming components to re-render when the context value changes, which can hurt performance if updated rapidly.\n- **Redux (with Redux Toolkit)** is built for high-frequency, complex state updates (like an e-commerce cart, live chat feeds, or complex multi-step forms). Redux allows components to subscribe *only* to the specific slice of state they care about (`useSelector`), preventing unnecessary re-renders across the app.",
      difficulty: "medium",
      category: "React Architecture"
    },

    // --- Node.js & Express Advanced ---
    {
      question: "Can you explain how the Node.js Event Loop works under the hood?",
      answer: "Node.js is single-threaded, but it achieves non-blocking I/O using the **Event Loop**, which offloads heavy operations to the system kernel (via the libuv library).\n\nThe Event Loop runs in phases:\n1. **Timers**: Executes `setTimeout` and `setInterval` callbacks.\n2. **Pending Callbacks**: Executes I/O callbacks deferred to the next loop.\n3. **Idle, Prepare**: Internal Node.js usage.\n4. **Poll**: Retrieves new I/O events and executes their callbacks (e.g., reading a file, HTTP requests).\n5. **Check**: Executes `setImmediate` callbacks.\n6. **Close Callbacks**: Executes close events like `socket.on('close', ...)`.\n\nBetween each phase, Node checks the microtask queue (`process.nextTick` and `Promises`), executing them immediately before moving to the next phase.",
      difficulty: "hard",
      category: "Node.js Deep Dive"
    },
    {
      question: "How do you handle unhandled Promise rejections and uncaught exceptions in a production Node.js app?",
      answer: "In a production environment, an unhandled error could crash the Node.js server. You must listen for global process events to log the error gracefully and restart the server.\n\n```javascript\n// Catches synchronous errors\nprocess.on('uncaughtException', (err) => {\n  console.error('UNCAUGHT EXCEPTION! Shutting down...');\n  console.error(err.name, err.message);\n  process.exit(1); // PM2 or Docker will restart the app\n});\n\n// Catches asynchronous Promise errors without a .catch()\nprocess.on('unhandledRejection', (err) => {\n  console.error('UNHANDLED REJECTION! Shutting down...');\n  console.error(err.name, err.message);\n  server.close(() => {\n    process.exit(1);\n  });\n});\n```",
      difficulty: "medium",
      category: "Node.js Deep Dive"
    },
    {
      question: "What are Streams in Node.js? Name the different types.",
      answer: "Streams are collections of data—just like arrays or strings. However, streams might not be available all at once, and they don't have to fit in memory. This makes streams extremely powerful when working with large volumes of data, like reading a 10GB video file on a server with only 512MB of RAM.\n\nThe 4 types of streams are:\n1. **Readable**: Data can be read from it (e.g., `fs.createReadStream()`).\n2. **Writable**: Data can be written to it (e.g., `fs.createWriteStream()`).\n3. **Duplex**: Can be both read and written to (e.g., TCP sockets).\n4. **Transform**: A type of Duplex stream where the output is computed based on the input (e.g., `zlib.createGzip()` to compress data on the fly).",
      difficulty: "hard",
      category: "Node.js Deep Dive"
    },
    {
      question: "Explain Cross-Origin Resource Sharing (CORS). How do you configure it in Express?",
      answer: "CORS is a browser security mechanism that restricts web pages from making requests to a different domain than the one that served the web page. \n\nIf your React frontend is on `localhost:3000` and your Express backend is on `localhost:5000`, the browser will block API calls unless the backend explicitly allows `localhost:3000` via HTTP headers.\n\nIn Express, we use the `cors` middleware:\n```javascript\nconst cors = require('cors');\n\napp.use(cors({\n  origin: 'http://localhost:3000', // Allow only this domain\n  credentials: true, // Allow cookies to be sent\n  methods: ['GET', 'POST', 'PUT', 'DELETE']\n}));\n```",
      difficulty: "medium",
      category: "Security"
    },
    {
      question: "How do you protect a Node.js Express application against common security vulnerabilities?",
      answer: "As a 2-year experienced developer, I implement multiple layers of security:\n\n1. **Helmet**: Sets secure HTTP headers (prevents clickjacking, hides X-Powered-By).\n2. **Express Rate Limit**: Limits repeated requests to public APIs (e.g., login) to prevent brute-force and DoS attacks.\n3. **Data Sanitization**: \n   - Use `express-mongo-sanitize` to prevent NoSQL query injection (removing `$` operators).\n   - Use `xss-clean` to prevent Cross-Site Scripting (XSS) by stripping HTML from user inputs.\n4. **Bcrypt**: Always salt and hash passwords.\n5. **JWT HttpOnly Cookies**: Store JWTs in secure, httpOnly cookies rather than localStorage to prevent XSS theft.",
      difficulty: "hard",
      category: "Security"
    },

    // --- MongoDB Advanced ---
    {
      question: "What is the MongoDB Aggregation Pipeline? Can you give an example?",
      answer: "The aggregation pipeline is a framework for data aggregation. Documents enter a multi-stage pipeline that transforms them into aggregated results, similar to `GROUP BY` and `JOIN` in SQL.\n\nCommon stages include `$match` (filtering), `$group` (aggregating data), `$sort`, `$project` (reshaping the output), and `$lookup` (joining collections).\n\n```javascript\n// Example: Finding the total sales revenue per product category\nconst stats = await Order.aggregate([\n  { $match: { status: 'completed' } }, // 1. Filter completed orders\n  { \n    $group: { \n      _id: '$category', // 2. Group by category\n      totalRevenue: { $sum: '$price' },\n      numOrders: { $sum: 1 }\n    } \n  },\n  { $sort: { totalRevenue: -1 } } // 3. Sort by highest revenue\n]);\n```",
      difficulty: "hard",
      category: "MongoDB Advanced"
    },
    {
      question: "Explain Indexing in MongoDB. Why is it important and what are its drawbacks?",
      answer: "Indexes support the efficient execution of queries. Without an index, MongoDB must perform a *Collection Scan*—scanning every single document in a collection to select those that match the query. If a collection has 10 million users, finding one user by email without an index will be extremely slow.\n\nBy creating an index on the `email` field (`db.users.createIndex({ email: 1 })`), MongoDB uses a B-tree data structure to find the document in milliseconds.\n\n**Drawbacks**: \nIndexes take up RAM and Disk space. More importantly, they slow down write operations (`INSERT`, `UPDATE`, `DELETE`) because every time a document is written, the index must also be updated. Therefore, you should only index fields that are frequently queried.",
      difficulty: "medium",
      category: "MongoDB Advanced"
    },
    {
      question: "What is the difference between Replication and Sharding in MongoDB?",
      answer: "Both are used for scaling, but they solve different problems:\n\n- **Replication (High Availability)**: Involves creating copies of your database across multiple servers (a Replica Set: 1 Primary, 2+ Secondaries). If the primary server crashes, a secondary automatically takes over. It ensures your data is safe and your app doesn't go down. It does *not* increase storage capacity.\n- **Sharding (Horizontal Scaling)**: Involves splitting a massive database across multiple machines. If you have 2TB of data but your servers only hold 1TB each, Sharding splits the data (e.g., users A-M on Server 1, N-Z on Server 2). It increases storage and write capacity.",
      difficulty: "hard",
      category: "MongoDB Advanced"
    },
    {
      question: "How does Mongoose's .populate() work, and how does it compare to SQL JOINs?",
      answer: "`.populate()` is Mongoose's way of referencing documents in other collections, mimicking a JOIN in SQL.\n\nIf a `Post` document has an `author` field containing a User's ObjectId, `.populate('author')` will automatically run a second query under the hood to fetch that User document and replace the ObjectId with the actual User object in the returned JSON.\n\n**Difference from SQL JOINs**:\nSQL JOINs happen entirely inside the database engine and are highly optimized. Mongoose's `.populate()` actually executes multiple queries to the database and merges the data inside your Node.js server. For massive datasets, `.populate()` can be slower than using MongoDB's native `$lookup` aggregation.",
      difficulty: "medium",
      category: "MongoDB Advanced"
    },

    // --- Architecture / General ---
    {
      question: "What is a Memory Leak in Node.js, and how would you debug it?",
      answer: "A memory leak occurs when objects are no longer needed by the application but are still referenced by a variable or closure, preventing the Garbage Collector from freeing the memory. Over time, the RAM usage grows until the Node.js process crashes with a `Fatal Error: heap out of memory`.\n\n**Common Causes**:\n- Storing session data in global variables instead of a DB like Redis.\n- Unclosed database connections or streams.\n- Event listeners that are never removed.\n\n**How to debug**:\nYou can use tools like **Chrome DevTools** (by running node with `--inspect`) to take Heap Snapshots. You take a snapshot, simulate traffic, take another snapshot, and compare them to see exactly which objects are accumulating in memory.",
      difficulty: "hard",
      category: "System Design & Architecture"
    },
    {
      question: "If you were asked to build a real-time chat feature in a MERN app, how would you approach it?",
      answer: "For real-time bi-directional communication, standard HTTP requests (which are stateless and client-initiated) are not suitable. I would use **WebSockets**, specifically the **Socket.io** library.\n\n**Architecture**:\n1. **Frontend (React)**: Connects to the Socket.io server. Listens for `receive_message` events to update the React state in real-time.\n2. **Backend (Node/Express)**: Attaches Socket.io to the Express HTTP server. It listens for `send_message` events from clients.\n3. **Database (MongoDB)**: When a message arrives at the backend, it is first saved to the `Messages` collection in MongoDB for persistence, and then instantly `broadcasted` to the recipient's socket room.\n4. **Scaling**: If the app grows and requires multiple Node.js instances, I would use the **Redis Adapter** for Socket.io to ensure messages are routed between different server instances.",
      difficulty: "hard",
      category: "System Design & Architecture"
    }
  ];

  await InterviewQuestion.insertMany(advancedQuestions);

  console.log(`Successfully seeded ${advancedQuestions.length} ADVANCED MERN interview questions!`);
  process.exit(0);
};

run().catch(console.error);
