export const interviewQuestions = [
  {
    "question": "What is MERN Stack and what are its components?",
    "answer": "The MERN stack is a web development framework consisting of MongoDB, Express.js, React.js, and Node.js.\n\n- **MongoDB**: A NoSQL database that stores data in flexible, JSON-like documents.\n- **Express.js**: A fast, unopinionated web application framework for Node.js used to build APIs.\n- **React.js**: A front-end JavaScript library developed by Facebook for building user interfaces.\n- **Node.js**: A JavaScript runtime built on Chrome's V8 engine that allows for server-side execution of JavaScript code.",
    "difficulty": "easy",
    "category": "MERN Basics"
  },
  {
    "question": "What is JSX?",
    "answer": "JSX stands for JavaScript eXtensible Markup Language (XML).\n\nIt is a syntax extension for JavaScript that is commonly used with React to describe what the user interface (UI) should look like. JSX allows us to write HTML elements in JavaScript, making the code more readable and expressive. Under the hood, Babel transforms JSX into standard `React.createElement()` calls.\n\n```jsx\nimport React from 'react';\n\nfunction App() {\n  const name = 'Sadaf';\n  return <h1>Hello, {name}!</h1>;\n}\n\nexport default App;\n```",
    "difficulty": "easy",
    "category": "React"
  },
  {
    "question": "How do you ensure data validation in a MERN stack application?",
    "answer": "Data validation should be ensured on both the client-side and server-side:\n\n1. **Backend (Express.js)**: Using libraries like `Joi`, `express-validator`, or `Zod` to validate incoming request bodies before saving to the database. Mongoose schemas also provide built-in validation.\n2. **Frontend (React.js)**: Using form validation libraries like `Formik` combined with `Yup`, or `React Hook Form` to give immediate feedback to the user before they submit the form.\n\n```javascript\n// Frontend Validation Example using Formik & Yup\nconst formik = useFormik({\n  initialValues: { contact: '' },\n  validationSchema: Yup.object().shape({\n    contact: Yup.number().required('Contact is required')\n  }),\n  onSubmit: (values) => console.log(values)\n});\n```",
    "difficulty": "medium",
    "category": "Node & Express"
  },
  {
    "question": "What are the core principles of Redux?",
    "answer": "There are three core principles of Redux:\n\n1. **Single Source of Truth**: The state of your whole application is stored in an object tree within a single store.\n2. **State is Read-Only**: The only way to change the state is to emit an action (an object describing what happened).\n3. **Changes are Made with Pure Functions**: To specify how the state tree is transformed by actions, you write pure reducers.",
    "difficulty": "medium",
    "category": "React"
  },
  {
    "question": "What are pure functions? How do you explain 'Changes are Made with Pure Functions'?",
    "answer": "Pure functions in Redux are the reducers.\n\nA pure function is a function that, given the same input, will always return the same output, and produces no side effects (like API calls or mutating external variables).\n\nThe principle 'Changes are Made with Pure Functions' means that Reducers take the current state and an action as inputs and return a brand new state object without mutating the original state. This ensures that state updates are predictable and consistent.\n\n```javascript\nconst initialState = { count: 0 };\n\nexport const basicReducer = (state = initialState, action) => {\n  if (action.type === 'INCREMENT') return { count: state.count + 1 };\n  if (action.type === 'DECREMENT') return { count: state.count - 1 };\n  return state;\n};\n```",
    "difficulty": "medium",
    "category": "JavaScript"
  },
  {
    "question": "Why do we use an .env file in a MERN stack application?",
    "answer": "We use an `.env` file in a MERN stack application to securely store and manage sensitive data such as database credentials, secret keys, and API keys, as well as environment-specific configuration settings.\n\nThis prevents sensitive information from being hardcoded into the source code and accidentally uploaded to public repositories like GitHub.\n\n```env\nPORT=5000\nSECRET_KEY=MY_SUPER_SECRET_KEY\nFRONTEND_URL=http://localhost:3000\nJWT_EXPIRES_IN=1d\n```",
    "difficulty": "easy",
    "category": "Node & Express"
  },
  {
    "question": "Why do we use the $set modifier in MongoDB?",
    "answer": "The `$set` modifier in MongoDB is used to update specific fields in a document without overwriting the entire document.\n\nIt allows us to change the value of an existing field or add a completely new field if it doesn't already exist in the document. If we didn't use `$set` during an update, MongoDB might replace the entire document with only the updated fields.\n\n```javascript\ndb.users.updateOne(\n  { _id: ObjectId(\"4b253b0...\") },\n  { $set: { location: \"New York\" } }\n);\n```",
    "difficulty": "medium",
    "category": "MongoDB"
  },
  {
    "question": "How do you create a simple server in Node.js that returns 'Hello World'?",
    "answer": "You can create a simple server using the built-in `http` module.\n\n1. Require the `http` module.\n2. Create a server using `http.createServer()` that handles incoming requests (`req`) and responses (`res`).\n3. Set the status code (e.g., 200) and the content type (e.g., 'text/plain').\n4. Send the response to the client using `res.end()`.\n5. Tell the server to listen on a specific port.\n\n```javascript\nconst http = require('http');\n\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, { 'Content-Type': 'text/plain' });\n  res.end('Hello World\\n');\n});\n\nserver.listen(5000, () => {\n  console.log('Server running at http://localhost:5000/');\n});\n```",
    "difficulty": "easy",
    "category": "Node & Express"
  },
  {
    "question": "What is useSelector hook and why we use it?",
    "answer": "The `useSelector` hook is a function provided by the `react-redux` library that allows us to extract data from the Redux store state.\n\nIt replaces the older `mapStateToProps` function used in class components. It automatically subscribes the functional component to the Redux store, meaning the component will re-render any time the specific piece of state it is selecting gets updated.\n\n```javascript\nimport { useSelector } from 'react-redux';\n\nfunction UserProfile() {\n  // Extracts just the 'user' object from the global Redux state\n  const user = useSelector((state) => state.auth.user);\n  return <div>{user.name}</div>;\n}\n```",
    "difficulty": "medium",
    "category": "React"
  },
  {
    "question": "How does Express.js handle Routing?",
    "answer": "Express.js handles routing by associating specific HTTP methods (GET, POST, PUT, DELETE) with URL paths.\n\nRoutes are defined directly on the app instance using methods like `app.get()`, `app.post()`, `app.patch()`, and `app.delete()`. Express also supports route parameters (like `/users/:id`) for dynamic URLs.\n\nFor larger applications, Express provides the `express.Router()` class to organize routes modularly into separate files.\n\n```javascript\nconst express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => {\n  res.send('Welcome to the Home Page!');\n});\n\napp.post('/submit', (req, res) => {\n  res.send('Form Submitted!');\n});\n```",
    "difficulty": "easy",
    "category": "Node & Express"
  },
  {
    "question": "How can you implement authentication in Express.js?",
    "answer": "Authentication in Express.js can be implemented through various strategies:\n\n1. **JSON Web Tokens (JWT)**: A stateless, token-based system where the server signs a token and sends it to the client. The client sends it back in headers for verification.\n2. **Session-based Authentication**: A stateful system using cookies where the server stores session data in memory or a DB, and assigns the user a Session ID.\n3. **OAuth / Third-Party Providers**: Integrating with services like Google, GitHub, or Facebook using libraries like Passport.js.\n4. **Password Hashing**: Always hash passwords using libraries like `bcrypt` before storing them in the database.",
    "difficulty": "hard",
    "category": "Node & Express"
  },
  {
    "question": "What are modules in Node.js, and can you name five commonly used ones?",
    "answer": "Modules in Node.js are like JavaScript libraries that provide specific, reusable functionalities. They prevent you from having to write everything from scratch. You can include a module using the `require()` or `import` syntax.\n\nNode.js comes with several built-in core modules:\n1. **`fs`**: For File System operations (reading/writing files).\n2. **`http`**: For creating HTTP servers and making network requests.\n3. **`path`**: For handling and transforming file and directory paths (commonly used).\n4. **`stream`**: For handling streaming data (like video or large files).\n5. **`querystring`**: For parsing and formatting URL query strings.",
    "difficulty": "easy",
    "category": "Node & Express"
  },
  {
    "question": "What is the difference between req.params and req.query?",
    "answer": "**req.params** contains route parameters. These are part of the actual URL structure defined by the path (e.g., `/product/:id`). They are typically used for required or structured data to identify a specific resource.\n- URL: `daraz/stationary/pen-1` -> `req.params.id` is 'pen-1'\n\n**req.query** contains query string parameters. These are key-value pairs appended to the URL after a `?` symbol. They are used for optional, filter-like data such as sorting or pagination.\n- URL: `/search?sort=price&order=asc` -> `req.query.sort` is 'price'",
    "difficulty": "medium",
    "category": "Node & Express"
  },
  {
    "question": "How would you delay an API call until a component is mounted?",
    "answer": "In modern React (using Functional Components), we use the `useEffect` hook to achieve this.\n\nBy passing an empty dependency array `[]` as the second argument to `useEffect`, we tell React to run the inner function (the API call) only *once*, immediately after the component is rendered to the screen. \n\nThis mimics the behavior of `componentDidMount` in older Class components.\n\n```javascript\nimport React, { useEffect } from 'react';\n\nconst MyFunctionalComponent = () => {\n  useEffect(() => {\n    // API call goes here. It runs only once after mount.\n    fetchData();\n  }, []);\n\n  return <div>Hello</div>;\n}\n```",
    "difficulty": "medium",
    "category": "React"
  },
  {
    "question": "What is a Collection in MongoDB?",
    "answer": "A collection in MongoDB is the equivalent of a Table in a relational SQL database. It is a group of MongoDB documents that are stored together.\n\nUnlike SQL tables, collections do not enforce a strict schema by default (schemaless). This means documents inside the same collection can have completely different fields, arrays, and nested objects. \n\nFor example, one User document might have a `purchases` array, while another User document in the exact same collection might have a `membershipTier` field instead.",
    "difficulty": "easy",
    "category": "MongoDB"
  },
  {
    "question": "What is the difference between props and state in React?",
    "answer": "**Props (Properties)** are used to pass data from a parent component down to a child component. They are **read-only** (immutable), meaning the child component cannot modify the props it receives.\n\n**State** is used to store and manage data *within* a single component. State is local to that specific component. When state is updated (using a setter like `setCount`), the component automatically re-renders to reflect the new data.\n\nIn short: Props get passed down like instructions from a boss. State is a component's own personal memory.",
    "difficulty": "easy",
    "category": "React"
  },
  {
    "question": "Can we run Node.js in Windows?",
    "answer": "Yes, Node.js is cross-platform and runs perfectly on Windows, macOS, and Linux.\n\nYou can download the Windows installer from the official Node.js website. Once installed, you can execute JavaScript files directly from the Windows Command Prompt or PowerShell using the `node filename.js` command.",
    "difficulty": "easy",
    "category": "Node & Express"
  },
  {
    "question": "What are the data types supported by MongoDB?",
    "answer": "MongoDB supports a wide variety of BSON (Binary JSON) data types, including:\n\n- **String**: For text.\n- **Number**: For integers and floats.\n- **Boolean**: For true/false values.\n- **Date**: For storing dates and times.\n- **Array**: For lists of values.\n- **Object**: For nested/embedded documents.\n- **ObjectId**: A unique ID used for document primary keys (`_id`).\n- **Null**: For empty fields.\n- **Regex**: For storing regular expressions.\n- **BinaryData**: For storing raw binary data (like images).",
    "difficulty": "medium",
    "category": "MongoDB"
  },
  {
    "question": "What is the role of 'export default' in React?",
    "answer": "The `export default` keyword is used to expose a component (or function, or variable) so that it can be imported and used in other files across your application.\n\nWhen a component is exported using `export default`, you can import it into another file using any name you want, without needing curly braces. A file can only have one default export.\n\n```javascript\n// App.js\nfunction App() { return <div>App</div>; }\nexport default App;\n\n// index.js\nimport MyApp from './App'; // Valid!\n```",
    "difficulty": "easy",
    "category": "React"
  },
  {
    "question": "What is the setTimeout() function?",
    "answer": "The `setTimeout()` function is part of the JavaScript runtime (provided by the browser or Node.js). \n\nIt allows us to execute a specific callback function after a designated amount of time (measured in milliseconds) has passed. It is an asynchronous function, meaning it does not block the rest of the code from running while it waits.\n\n```javascript\nsetTimeout(() => {\n  console.log(\"This prints after 2 seconds\");\n}, 2000);\n```",
    "difficulty": "easy",
    "category": "JavaScript"
  },
  {
    "question": "What is NPM?",
    "answer": "NPM stands for Node Package Manager.\n\nIt is the world's largest open-source software registry, containing over a million code packages. It is responsible for managing all the third-party packages and modules for Node.js.\n\nNPM makes it incredibly easy to install, update, and manage the dependencies for your Node.js and React projects. When you run `npm install express`, NPM reaches out to its registry, downloads the Express code, and places it in your `node_modules` folder.",
    "difficulty": "easy",
    "category": "Node & Express"
  },
  {
    "question": "How can we check if Node.js and NPM are installed on our local machine?",
    "answer": "You can verify the installation by opening your terminal (or command prompt) and running version-check commands:\n\n- To check if Node.js is installed, type: `node -v` (or `node --version`). It will output the version number (e.g., `v18.16.0`).\n- To check if NPM is installed, type: `npm -v` (or `npm --version`).\n\nIf the terminal says 'command not found', it means they are not installed or not in your system's PATH.",
    "difficulty": "easy",
    "category": "Node & Express"
  },
  {
    "question": "What kind of API functions are supported by Node.js?",
    "answer": "Node.js heavily utilizes two types of API functions for interacting with the system (like reading files):\n\n1. **Synchronous Functions**: These block the event loop. The code halts execution until the operation completes. They usually end with 'Sync' (e.g., `fs.readFileSync`).\n2. **Asynchronous Functions**: These do NOT block the event loop. They use callbacks, Promises, or async/await to notify the program when the operation finishes (e.g., `fs.readFile`). Asynchronous APIs are preferred in Node.js to keep the server responsive.",
    "difficulty": "medium",
    "category": "Node & Express"
  },
  {
    "question": "What is an event in React?",
    "answer": "An event in React is an action triggered by a user or the system, such as clicking a button, pressing a key, submitting a form, or moving the mouse. Events make the application interactive.\n\nReact uses a synthetic event system that wraps native browser events, ensuring they work identically across all browsers. Common React event handlers are camelCased:\n- `onClick`\n- `onChange`\n- `onSubmit`\n- `onMouseOver`\n\n```jsx\n<button onClick={() => alert('Clicked!')}>Click Me</button>\n```",
    "difficulty": "easy",
    "category": "React"
  },
  {
    "question": "What is the default port number for MongoDB?",
    "answer": "The default port number for MongoDB is **27017**.\n\nWhen you run MongoDB locally without specifying a port, you connect to it using the URI string: `mongodb://localhost:27017`. Knowing this default is important for configuration and troubleshooting database connection issues.",
    "difficulty": "easy",
    "category": "MongoDB"
  },
  {
    "question": "What is bcrypt?",
    "answer": "Bcrypt is a powerful password-hashing function used heavily in Node.js applications to safely hash and salt user passwords before storing them in a database.\n\nBecause hashing is a one-way process, even if a database is compromised, hackers cannot easily read the original passwords. Bcrypt is mathematically designed to be slow, making brute-force and dictionary attacks highly ineffective.\n\n```javascript\n// Hashing a password with a salt round of 12\nconst hashedPassword = await bcrypt.hash(password, 12);\n```",
    "difficulty": "medium",
    "category": "Node & Express"
  },
  {
    "question": "Why can't browsers read JSX?",
    "answer": "Browsers have built-in JavaScript engines (like Chrome's V8) that only understand standard JavaScript syntax. JSX is NOT standard JavaScript; it is a custom syntax extension created by the React team.\n\nTo enable a browser to understand your React code, the JSX files must first be transformed into standard JavaScript objects (specifically `React.createElement()` calls). This process is known as **transpilation**, and it is typically handled automatically by tools like **Babel** before the code reaches the browser.",
    "difficulty": "medium",
    "category": "React"
  },
  {
    "question": "What are the lifecycle methods of React class components?",
    "answer": "Before React Hooks, Class components relied heavily on lifecycle methods to execute code at specific points in time. The main ones are:\n\n1. **componentDidMount()**: Runs once right after the component is rendered to the screen (perfect for API calls).\n2. **componentDidUpdate()**: Runs after the component re-renders due to a state or prop change.\n3. **componentWillUnmount()**: Runs right before the component is removed from the screen (used for cleanup, like canceling timers).\n\n*(Note: Modern functional components achieve all of this using the `useEffect` hook.)*",
    "difficulty": "medium",
    "category": "React"
  },
  {
    "question": "What is the difference between useDispatch() and useSelector()?",
    "answer": "`useDispatch` and `useSelector` are the two primary hooks provided by React-Redux.\n\n- **useDispatch()**: Returns the `dispatch` function from the Redux store. It is used to *send* actions to the store to trigger state changes. (e.g., `dispatch({ type: 'INCREMENT' })`)\n- **useSelector()**: Allows you to *read* and extract data from the Redux store state. It subscribes the component to that specific piece of state, triggering a re-render if it changes.",
    "difficulty": "medium",
    "category": "React"
  },
  {
    "question": "What is React Router?",
    "answer": "React Router is the standard library used in React for handling routing in Single-Page Applications (SPAs).\n\nIt enables navigation between different views or \"pages\" without actually reloading the HTML page from the server, maintaining a lightning-fast user experience. \n\nWith React Router, you map URL paths to specific components. For example, you can tell React to render the `<Home />` component when the URL is `/`, and the `<Products />` component when the URL is `/products`.",
    "difficulty": "easy",
    "category": "React"
  },
  {
    "question": "How is MongoDB better than SQL databases?",
    "answer": "MongoDB is often preferred over relational SQL databases for dealing with unstructured or semi-structured data because it stores information in a highly flexible, JSON-like format (BSON).\n\nUnlike SQL, where every row must strictly adhere to predefined columns, MongoDB is schemaless. Documents in a single collection can have completely different fields. This allows developers to iterate and change the data structure easily without running complex database migrations.",
    "difficulty": "medium",
    "category": "MongoDB"
  },
  {
    "question": "How do you insert a document into a MongoDB collection?",
    "answer": "To insert a document into a MongoDB collection using the native driver or Mongo Shell, you use:\n\n- **`insertOne()`**: Adds a single document to the collection.\n- **`insertMany()`**: Takes an array of documents and inserts them all at once.\n\n*(When using Mongoose in an Express app, you typically use `Model.create()` or `new Model().save()` instead.)*",
    "difficulty": "easy",
    "category": "MongoDB"
  },
  {
    "question": "What is a callback function?",
    "answer": "A callback is simply a function that is passed as an argument directly into another function. \n\nThis technique allows the receiving function to execute (or \"call back\") the passed function at a later time. Callbacks are heavily used in JavaScript for asynchronous operations, like executing code after an API response arrives or after a timer finishes.\n\n```javascript\nfunction greet(name, callback) {\n  console.log(\"Hello \" + name);\n  callback(); // Invokes the function passed to it\n}\n```",
    "difficulty": "easy",
    "category": "JavaScript"
  },
  {
    "question": "What is Prop Drilling in React JS?",
    "answer": "Prop Drilling is a term used to describe the cumbersome process of passing data from a high-level parent component down to a deeply nested child component by threading it through multiple layers of intermediate components.\n\nEach component in the middle has to receive the prop and pass it down, even if it doesn't need or use the data itself. This makes code hard to maintain. Solutions to avoid prop drilling include using the **Context API** or state management tools like **Redux**.",
    "difficulty": "medium",
    "category": "React"
  },
  {
    "question": "What are buffers in Node.js?",
    "answer": "Buffers in Node.js are used to handle streams of raw binary data directly in memory.\n\nSince standard JavaScript originally had no mechanism for reading or manipulating raw streams of binary data (like images, video files, or TCP network streams), Node.js introduced the `Buffer` class. Buffers store data in small chunks in a fixed-size sequence of memory outside the V8 JavaScript engine, making data processing extremely efficient.",
    "difficulty": "hard",
    "category": "Node & Express"
  },
  {
    "question": "Can you explain the difference between useMemo and useCallback? When would you use them?",
    "answer": "Both `useMemo` and `useCallback` are hooks used for performance optimization by memoizing values between re-renders.\n\n- **`useMemo`** memoizes the *result* of a calculation. You use it when you have an expensive synchronous computation that you don't want to re-run on every render unless its dependencies change.\n- **`useCallback`** memoizes the *function itself*. You use it when you are passing a callback function as a prop to a child component (especially one wrapped in `React.memo`), to prevent the child from unnecessarily re-rendering because a new function reference was created.\n\n```javascript\n// useMemo example\nconst expensiveResult = useMemo(() => computeMath(a, b), [a, b]);\n\n// useCallback example\nconst handleClick = useCallback(() => {\n  console.log('Clicked', param);\n}, [param]);\n```",
    "difficulty": "medium",
    "category": "React Advanced"
  },
  {
    "question": "How does React Fiber improve performance compared to the older Stack Reconciler?",
    "answer": "React Fiber is a complete rewrite of React's core reconciliation algorithm, introduced in React 16.\n\nOlder versions used a 'Stack Reconciler' which was synchronous and blocking. Once it started updating the component tree, it couldn't stop until it finished, which could cause dropped frames and lag during large updates.\n\n**Fiber** breaks rendering work into chunks and can *pause, abort, or yield* to the browser. It assigns priorities to updates. For example, a user typing in an input field (high priority) will pause the rendering of a heavy data table (low priority), ensuring the UI stays completely responsive and buttery smooth.",
    "difficulty": "hard",
    "category": "React Advanced"
  },
  {
    "question": "What are React Error Boundaries and how do you implement them?",
    "answer": "Error Boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the whole application.\n\nCurrently, Error Boundaries must be written as **Class Components**. A class becomes an error boundary if it defines `static getDerivedStateFromError()` (to render a fallback UI) or `componentDidCatch()` (to log the error info).\n\n```jsx\nclass ErrorBoundary extends React.Component {\n  state = { hasError: false };\n\n  static getDerivedStateFromError(error) {\n    return { hasError: true };\n  }\n\n  render() {\n    if (this.state.hasError) return <h1>Something went wrong.</h1>;\n    return this.props.children; \n  }\n}\n```",
    "difficulty": "medium",
    "category": "React Advanced"
  },
  {
    "question": "When should you use the Context API vs Redux in a mid-sized application?",
    "answer": "As a developer with 2 years of experience, this is a crucial architectural decision:\n\n- **Context API** is excellent for low-frequency updates, such as Theme (Dark/Light mode), User Authentication status, or Localization/Language. It causes all consuming components to re-render when the context value changes, which can hurt performance if updated rapidly.\n- **Redux (with Redux Toolkit)** is built for high-frequency, complex state updates (like an e-commerce cart, live chat feeds, or complex multi-step forms). Redux allows components to subscribe *only* to the specific slice of state they care about (`useSelector`), preventing unnecessary re-renders across the app.",
    "difficulty": "medium",
    "category": "React Architecture"
  },
  {
    "question": "Can you explain how the Node.js Event Loop works under the hood?",
    "answer": "Node.js is single-threaded, but it achieves non-blocking I/O using the **Event Loop**, which offloads heavy operations to the system kernel (via the libuv library).\n\nThe Event Loop runs in phases:\n1. **Timers**: Executes `setTimeout` and `setInterval` callbacks.\n2. **Pending Callbacks**: Executes I/O callbacks deferred to the next loop.\n3. **Idle, Prepare**: Internal Node.js usage.\n4. **Poll**: Retrieves new I/O events and executes their callbacks (e.g., reading a file, HTTP requests).\n5. **Check**: Executes `setImmediate` callbacks.\n6. **Close Callbacks**: Executes close events like `socket.on('close', ...)`.\n\nBetween each phase, Node checks the microtask queue (`process.nextTick` and `Promises`), executing them immediately before moving to the next phase.",
    "difficulty": "hard",
    "category": "Node.js Deep Dive"
  },
  {
    "question": "How do you handle unhandled Promise rejections and uncaught exceptions in a production Node.js app?",
    "answer": "In a production environment, an unhandled error could crash the Node.js server. You must listen for global process events to log the error gracefully and restart the server.\n\n```javascript\n// Catches synchronous errors\nprocess.on('uncaughtException', (err) => {\n  console.error('UNCAUGHT EXCEPTION! Shutting down...');\n  console.error(err.name, err.message);\n  process.exit(1); // PM2 or Docker will restart the app\n});\n\n// Catches asynchronous Promise errors without a .catch()\nprocess.on('unhandledRejection', (err) => {\n  console.error('UNHANDLED REJECTION! Shutting down...');\n  console.error(err.name, err.message);\n  server.close(() => {\n    process.exit(1);\n  });\n});\n```",
    "difficulty": "medium",
    "category": "Node.js Deep Dive"
  },
  {
    "question": "What are Streams in Node.js? Name the different types.",
    "answer": "Streams are collections of data—just like arrays or strings. However, streams might not be available all at once, and they don't have to fit in memory. This makes streams extremely powerful when working with large volumes of data, like reading a 10GB video file on a server with only 512MB of RAM.\n\nThe 4 types of streams are:\n1. **Readable**: Data can be read from it (e.g., `fs.createReadStream()`).\n2. **Writable**: Data can be written to it (e.g., `fs.createWriteStream()`).\n3. **Duplex**: Can be both read and written to (e.g., TCP sockets).\n4. **Transform**: A type of Duplex stream where the output is computed based on the input (e.g., `zlib.createGzip()` to compress data on the fly).",
    "difficulty": "hard",
    "category": "Node.js Deep Dive"
  },
  {
    "question": "Explain Cross-Origin Resource Sharing (CORS). How do you configure it in Express?",
    "answer": "CORS is a browser security mechanism that restricts web pages from making requests to a different domain than the one that served the web page. \n\nIf your React frontend is on `localhost:3000` and your Express backend is on `localhost:5000`, the browser will block API calls unless the backend explicitly allows `localhost:3000` via HTTP headers.\n\nIn Express, we use the `cors` middleware:\n```javascript\nconst cors = require('cors');\n\napp.use(cors({\n  origin: 'http://localhost:3000', // Allow only this domain\n  credentials: true, // Allow cookies to be sent\n  methods: ['GET', 'POST', 'PUT', 'DELETE']\n}));\n```",
    "difficulty": "medium",
    "category": "Security"
  },
  {
    "question": "How do you protect a Node.js Express application against common security vulnerabilities?",
    "answer": "As a 2-year experienced developer, I implement multiple layers of security:\n\n1. **Helmet**: Sets secure HTTP headers (prevents clickjacking, hides X-Powered-By).\n2. **Express Rate Limit**: Limits repeated requests to public APIs (e.g., login) to prevent brute-force and DoS attacks.\n3. **Data Sanitization**: \n   - Use `express-mongo-sanitize` to prevent NoSQL query injection (removing `$` operators).\n   - Use `xss-clean` to prevent Cross-Site Scripting (XSS) by stripping HTML from user inputs.\n4. **Bcrypt**: Always salt and hash passwords.\n5. **JWT HttpOnly Cookies**: Store JWTs in secure, httpOnly cookies rather than localStorage to prevent XSS theft.",
    "difficulty": "hard",
    "category": "Security"
  },
  {
    "question": "What is the MongoDB Aggregation Pipeline? Can you give an example?",
    "answer": "The aggregation pipeline is a framework for data aggregation. Documents enter a multi-stage pipeline that transforms them into aggregated results, similar to `GROUP BY` and `JOIN` in SQL.\n\nCommon stages include `$match` (filtering), `$group` (aggregating data), `$sort`, `$project` (reshaping the output), and `$lookup` (joining collections).\n\n```javascript\n// Example: Finding the total sales revenue per product category\nconst stats = await Order.aggregate([\n  { $match: { status: 'completed' } }, // 1. Filter completed orders\n  { \n    $group: { \n      _id: '$category', // 2. Group by category\n      totalRevenue: { $sum: '$price' },\n      numOrders: { $sum: 1 }\n    } \n  },\n  { $sort: { totalRevenue: -1 } } // 3. Sort by highest revenue\n]);\n```",
    "difficulty": "hard",
    "category": "MongoDB Advanced"
  },
  {
    "question": "Explain Indexing in MongoDB. Why is it important and what are its drawbacks?",
    "answer": "Indexes support the efficient execution of queries. Without an index, MongoDB must perform a *Collection Scan*—scanning every single document in a collection to select those that match the query. If a collection has 10 million users, finding one user by email without an index will be extremely slow.\n\nBy creating an index on the `email` field (`db.users.createIndex({ email: 1 })`), MongoDB uses a B-tree data structure to find the document in milliseconds.\n\n**Drawbacks**: \nIndexes take up RAM and Disk space. More importantly, they slow down write operations (`INSERT`, `UPDATE`, `DELETE`) because every time a document is written, the index must also be updated. Therefore, you should only index fields that are frequently queried.",
    "difficulty": "medium",
    "category": "MongoDB Advanced"
  },
  {
    "question": "What is the difference between Replication and Sharding in MongoDB?",
    "answer": "Both are used for scaling, but they solve different problems:\n\n- **Replication (High Availability)**: Involves creating copies of your database across multiple servers (a Replica Set: 1 Primary, 2+ Secondaries). If the primary server crashes, a secondary automatically takes over. It ensures your data is safe and your app doesn't go down. It does *not* increase storage capacity.\n- **Sharding (Horizontal Scaling)**: Involves splitting a massive database across multiple machines. If you have 2TB of data but your servers only hold 1TB each, Sharding splits the data (e.g., users A-M on Server 1, N-Z on Server 2). It increases storage and write capacity.",
    "difficulty": "hard",
    "category": "MongoDB Advanced"
  },
  {
    "question": "How does Mongoose's .populate() work, and how does it compare to SQL JOINs?",
    "answer": "`.populate()` is Mongoose's way of referencing documents in other collections, mimicking a JOIN in SQL.\n\nIf a `Post` document has an `author` field containing a User's ObjectId, `.populate('author')` will automatically run a second query under the hood to fetch that User document and replace the ObjectId with the actual User object in the returned JSON.\n\n**Difference from SQL JOINs**:\nSQL JOINs happen entirely inside the database engine and are highly optimized. Mongoose's `.populate()` actually executes multiple queries to the database and merges the data inside your Node.js server. For massive datasets, `.populate()` can be slower than using MongoDB's native `$lookup` aggregation.",
    "difficulty": "medium",
    "category": "MongoDB Advanced"
  },
  {
    "question": "What is a Memory Leak in Node.js, and how would you debug it?",
    "answer": "A memory leak occurs when objects are no longer needed by the application but are still referenced by a variable or closure, preventing the Garbage Collector from freeing the memory. Over time, the RAM usage grows until the Node.js process crashes with a `Fatal Error: heap out of memory`.\n\n**Common Causes**:\n- Storing session data in global variables instead of a DB like Redis.\n- Unclosed database connections or streams.\n- Event listeners that are never removed.\n\n**How to debug**:\nYou can use tools like **Chrome DevTools** (by running node with `--inspect`) to take Heap Snapshots. You take a snapshot, simulate traffic, take another snapshot, and compare them to see exactly which objects are accumulating in memory.",
    "difficulty": "hard",
    "category": "System Design & Architecture"
  },
  {
    "question": "If you were asked to build a real-time chat feature in a MERN app, how would you approach it?",
    "answer": "For real-time bi-directional communication, standard HTTP requests (which are stateless and client-initiated) are not suitable. I would use **WebSockets**, specifically the **Socket.io** library.\n\n**Architecture**:\n1. **Frontend (React)**: Connects to the Socket.io server. Listens for `receive_message` events to update the React state in real-time.\n2. **Backend (Node/Express)**: Attaches Socket.io to the Express HTTP server. It listens for `send_message` events from clients.\n3. **Database (MongoDB)**: When a message arrives at the backend, it is first saved to the `Messages` collection in MongoDB for persistence, and then instantly `broadcasted` to the recipient's socket room.\n4. **Scaling**: If the app grows and requires multiple Node.js instances, I would use the **Redis Adapter** for Socket.io to ensure messages are routed between different server instances.",
    "difficulty": "hard",
    "category": "System Design & Architecture"
  },
  {
    "question": "What is hoisting in JavaScript?",
    "answer": "Hoisting is a JavaScript mechanism where variable and function declarations are moved to the top of their scope before code execution.\n\n- **var**: Variables declared with `var` are hoisted and initialized with `undefined`. Accessing them before declaration returns `undefined`.\n- **let/const**: They are hoisted but *not* initialized. Accessing them before declaration results in a `ReferenceError` because they are in the **Temporal Dead Zone (TDZ)**.\n- **Function Declarations**: Fully hoisted. You can call the function before it is defined in the code.\n\n```javascript\nconsole.log(myVar); // undefined\nvar myVar = 10;\n\nmyFunc(); // Works fine!\nfunction myFunc() { console.log('Hello'); }\n```",
    "difficulty": "easy",
    "category": "JavaScript"
  },
  {
    "question": "What is the Temporal Dead Zone (TDZ)?",
    "answer": "The Temporal Dead Zone (TDZ) is the period of time during execution where a `let` or `const` variable is hoisted and exists in memory, but is not yet initialized with a value.\n\nIf you try to access the variable during this period, JavaScript will throw a `ReferenceError`. The TDZ ends the moment the variable declaration line is executed.\n\n```javascript\n// TDZ starts at the beginning of the block\nconsole.log(age); // ReferenceError: Cannot access 'age' before initialization\nlet age = 25; // TDZ ends here\n```",
    "difficulty": "medium",
    "category": "JavaScript"
  },
  {
    "question": "What is a Closure in JavaScript? Give a practical example.",
    "answer": "A closure is a function that remembers and has access to its outer lexical scope, even after the outer function has finished executing.\n\nClosures are commonly used for data privacy (encapsulation), function currying, and maintaining state in asynchronous callbacks.\n\n```javascript\n// Practical Example: Data Privacy\nfunction createCounter() {\n  let count = 0; // Private variable\n  return function() {\n    count++;\n    return count;\n  };\n}\n\nconst counter = createCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2\n// We cannot access `count` directly from outside!\n```",
    "difficulty": "hard",
    "category": "JavaScript"
  },
  {
    "question": "What is event bubbling and event capturing?",
    "answer": "When an event (like a click) happens on a deeply nested HTML element, the browser handles it in two phases:\n\n1. **Capturing Phase**: The event starts at the top of the DOM tree (`window`/`document`) and trickles down to the target element.\n2. **Bubbling Phase**: The event starts at the target element and bubbles back up to the top of the DOM tree.\n\nBy default, JavaScript event listeners trigger during the **bubbling** phase. You can stop an event from bubbling up using `event.stopPropagation()`.",
    "difficulty": "medium",
    "category": "JavaScript"
  },
  {
    "question": "What is the difference between a microtask queue and a macrotask queue in the Event Loop?",
    "answer": "The Event Loop manages asynchronous operations using two queues:\n\n1. **Microtask Queue**: Holds callbacks from Promises (`.then`, `.catch`), `process.nextTick` (Node.js), and `MutationObserver`. It has the **highest priority**.\n2. **Macrotask Queue (Callback Queue)**: Holds callbacks from `setTimeout`, `setInterval`, I/O operations, and UI rendering.\n\nAfter executing the current synchronous code (Call Stack), the Event Loop will empty the *entire* Microtask Queue before it moves on to execute even a single task from the Macrotask Queue.",
    "difficulty": "hard",
    "category": "JavaScript Advanced"
  },
  {
    "question": "How do you implement a Debounce function?",
    "answer": "Debouncing ensures that a function is not called too frequently. It delays the execution of the function until a certain amount of time has passed since the *last* time it was invoked.\n\nIt is perfect for search input fields to avoid firing an API request on every single keystroke.\n\n```javascript\nfunction debounce(func, delay) {\n  let timer;\n  return function(...args) {\n    clearTimeout(timer); // Reset the timer on every keystroke\n    timer = setTimeout(() => {\n      func.apply(this, args); // Execute after delay\n    }, delay);\n  };\n}\n\nconst searchAPI = debounce(() => console.log('Fetching...'), 500);\n```",
    "difficulty": "hard",
    "category": "JavaScript Advanced"
  },
  {
    "question": "What is the difference between shallow copy and deep copy? How do you achieve them?",
    "answer": "When copying objects or arrays in JavaScript:\n\n- **Shallow Copy**: Copies the top-level properties. If the object contains nested objects, only their *memory references* are copied. Changing the nested object in the copy will mutate the original. \n  *Methods*: Spread operator `...`, `Object.assign()`.\n- **Deep Copy**: Creates a completely independent clone, including all nested objects.\n  *Methods*: `JSON.parse(JSON.stringify(obj))` (fails on functions and undefined) or `structuredClone(obj)` (modern and robust).\n\n```javascript\nconst original = { name: 'John', address: { city: 'NY' } };\n\n// Deep copy using structuredClone\nconst deepCopy = structuredClone(original);\ndeepCopy.address.city = 'LA';\nconsole.log(original.address.city); // Still 'NY'\n```",
    "difficulty": "medium",
    "category": "JavaScript"
  },
  {
    "question": "What is the difference between SSR, CSR, and SSG in Next.js?",
    "answer": "These are three different rendering strategies:\n\n1. **CSR (Client-Side Rendering)**: Traditional React. The browser downloads a bare HTML file and a massive JS bundle, then renders the UI entirely in the browser. Slow initial load, bad for SEO.\n2. **SSR (Server-Side Rendering)**: Next.js generates the HTML on the server *on every single request*. Great for SEO and highly dynamic data, but puts load on the server.\n3. **SSG (Static Site Generation)**: Next.js generates the HTML at *build time*. The HTML is cached on a CDN and served instantly to all users. Blazing fast, great for SEO, perfect for blogs or docs that rarely change.",
    "difficulty": "hard",
    "category": "React & Next.js"
  },
  {
    "question": "What is React Suspense and Concurrent Rendering?",
    "answer": "**React Suspense** allows you to declaratively \"suspend\" rendering of a component while it waits for some asynchronous operation to finish (like lazy-loading a component or fetching data), displaying a fallback UI (like a spinner) in the meantime.\n\n**Concurrent Rendering** (introduced in React 18) allows React to prepare multiple versions of the UI at the same time in the background without blocking the main thread. It enables features like `useTransition`, which lets you mark a state update as non-urgent, keeping the app highly responsive during heavy rendering.",
    "difficulty": "hard",
    "category": "React Advanced"
  },
  {
    "question": "What is a Higher-Order Component (HOC)?",
    "answer": "A Higher-Order Component (HOC) is an advanced React pattern for reusing component logic. \n\nAn HOC is a function that takes a component and returns a *new*, enhanced component. It's essentially the decorator pattern applied to React components. Common use cases include checking authentication before rendering a page.\n\n```jsx\n// HOC that checks if user is authenticated\nfunction withAuth(WrappedComponent) {\n  return function(props) {\n    const isAuthenticated = checkAuth();\n    if (!isAuthenticated) return <Login />;\n    return <WrappedComponent {...props} />;\n  };\n}\n\nexport default withAuth(Dashboard);\n```",
    "difficulty": "medium",
    "category": "React Architecture"
  },
  {
    "question": "If Node.js is single-threaded, how does it handle multiple concurrent requests?",
    "answer": "While the main JavaScript execution runs on a single thread, Node.js offloads heavy I/O operations (like database queries, file reading, and network requests) to the system kernel and a thread pool managed by the **libuv** library.\n\nBecause these operations are **non-blocking**, the main thread simply registers a callback and immediately moves on to serve the next user's request. When the I/O operation finishes in the background, libuv places the callback in the Event Loop queue to be executed. This architecture allows Node to handle tens of thousands of concurrent connections effortlessly.",
    "difficulty": "hard",
    "category": "Node.js Deep Dive"
  },
  {
    "question": "What is an EventEmitter in Node.js? How do you create custom events?",
    "answer": "The `EventEmitter` class is a core Node.js module that facilitates event-driven programming. It allows objects to emit named events that cause previously registered listeners (callbacks) to be called.\n\nMany core Node modules (like HTTP server and Streams) inherit from EventEmitter.\n\n```javascript\nconst EventEmitter = require('events');\nconst myEmitter = new EventEmitter();\n\n// Register a listener for the 'userSignup' event\nmyEmitter.on('userSignup', (username) => {\n  console.log(`Welcome email sent to ${username}`);\n});\n\n// Trigger the event\nmyEmitter.emit('userSignup', 'john_doe');\n```",
    "difficulty": "medium",
    "category": "Node.js Deep Dive"
  },
  {
    "question": "What is Clustering in Node.js and why is it used?",
    "answer": "Because Node.js is single-threaded, it normally only utilizes one CPU core. If you run a Node app on a 16-core server, 15 cores sit completely idle.\n\n**Clustering** allows you to spawn multiple Node.js processes (workers) that run simultaneously and share the same server port. This multiplies your application's throughput. In production, developers typically use process managers like **PM2** to handle clustering automatically rather than writing cluster logic manually.",
    "difficulty": "hard",
    "category": "System Design & Architecture"
  },
  {
    "question": "What is the difference between INNER JOIN, LEFT JOIN, and RIGHT JOIN in SQL?",
    "answer": "In relational databases (like MySQL or PostgreSQL), JOINs are used to combine rows from two or more tables based on a related column.\n\n- **INNER JOIN**: Returns only the records that have matching values in *both* tables. If there is no match, the row is dropped.\n- **LEFT JOIN (Left Outer)**: Returns *all* records from the left table, and the matched records from the right table. If there's no match, the right side returns NULL.\n- **RIGHT JOIN (Right Outer)**: Returns *all* records from the right table, and the matched records from the left table. If there's no match, the left side returns NULL.",
    "difficulty": "medium",
    "category": "SQL & Databases"
  },
  {
    "question": "What are ACID properties in database transactions?",
    "answer": "ACID is a set of properties that guarantee database transactions are processed reliably, critical for financial systems.\n\n1. **Atomicity**: The transaction is \"all or nothing.\" If one step fails, the entire transaction is rolled back (e.g., deducting money from A, but failing to add to B).\n2. **Consistency**: The database must remain in a valid state before and after the transaction, adhering to all constraints.\n3. **Isolation**: Concurrent transactions execute as if they were running sequentially. One transaction cannot read intermediate, uncommitted data of another.\n4. **Durability**: Once a transaction is committed, it is permanently saved to disk, surviving system crashes.",
    "difficulty": "hard",
    "category": "SQL & Databases"
  },
  {
    "question": "How do you optimize a slow database query?",
    "answer": "As an experienced developer, I approach slow queries by:\n\n1. **Using Indexes**: Creating an index (like a B-Tree) on frequently searched columns (e.g., `email`) prevents full-table/collection scans.\n2. **Analyzing the Query Execution Plan**: Using `EXPLAIN` in SQL or `.explain()` in MongoDB to see if indexes are actually being utilized.\n3. **Limiting Returned Data**: Avoiding `SELECT *` or returning massive arrays. Only projecting the exact fields needed by the frontend.\n4. **Pagination**: Implementing cursor-based or limit/offset pagination to fetch small chunks of data.\n5. **Denormalization (NoSQL)**: Embedding frequently accessed data directly inside the document to avoid expensive `$lookup` or `.populate()` calls.",
    "difficulty": "hard",
    "category": "System Design & Architecture"
  },
  {
    "question": "Write code to flatten a nested array without using the inbuilt .flat() method.",
    "answer": "We can use recursion combined with the `reduce` method to flatten an array of unknown depth.\n\n```javascript\nfunction flattenArray(arr) {\n  return arr.reduce((acc, current) => {\n    if (Array.isArray(current)) {\n      // If the current element is an array, recursively flatten it\n      return acc.concat(flattenArray(current));\n    } else {\n      // Otherwise, just push the element to the accumulator\n      return acc.concat(current);\n    }\n  }, []);\n}\n\nconst nested = [1, [2, [3, 4], 5], 6];\nconsole.log(flattenArray(nested)); // [1, 2, 3, 4, 5, 6]\n```",
    "difficulty": "hard",
    "category": "JavaScript Advanced"
  },
  {
    "question": "Sort the array [40, 50, 70, 90, 10] in descending order without using the .sort() method.",
    "answer": "We can implement a basic sorting algorithm, such as Bubble Sort, to sort the array manually.\n\n```javascript\nfunction sortDescending(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = 0; j < arr.length - 1 - i; j++) {\n      // If the current element is smaller than the next, swap them\n      if (arr[j] < arr[j + 1]) {\n        let temp = arr[j];\n        arr[j] = arr[j + 1];\n        arr[j + 1] = temp;\n      }\n    }\n  }\n  return arr;\n}\n\nconst nums = [40, 50, 70, 90, 10];\nconsole.log(sortDescending(nums)); // [90, 70, 50, 40, 10]\n```",
    "difficulty": "medium",
    "category": "JavaScript"
  },
  {
    "question": "Output Question: What does this code print and why?\n`console.log([] + []);`",
    "answer": "The output is an **empty string** `\"\"`.\n\n**Why?**\nIn JavaScript, the `+` operator triggers type coercion. When you try to add two arrays together, JavaScript attempts to convert them into primitive strings.\n\n1. It calls `.toString()` on the empty array `[]`.\n2. `[].toString()` returns an empty string `\"\"`.\n3. It then concatenates the two empty strings: `\"\" + \"\"`.\n4. The result is `\"\"`.",
    "difficulty": "medium",
    "category": "JavaScript Advanced"
  },
  {
    "question": "What is JavaScript?",
    "answer": "JavaScript is a high-level, dynamic, interpreted, and multi-paradigm programming language. It is the core technology of the World Wide Web, allowing developers to create interactive, dynamic web pages and complex server-side applications (using Node.js).\n\n- **For Freshers**: Think of JavaScript as the 'verbs' or actions of a webpage (HTML is the structure, CSS is the style, JS is the behavior).\n- **For Experienced**: It is a single-threaded, non-blocking, event-driven runtime environment that supports OOP, functional, and imperative programming styles.",
    "difficulty": "easy",
    "category": "JavaScript"
  },
  {
    "question": "What is the difference between var, let, and const?",
    "answer": "The main differences lie in scope, hoisting, and re-assignment:\n\n- **`var`**:\n  - Scope: Function-scoped.\n  - Hoisting: Hoisted and initialized with `undefined`.\n  - Re-assignment: Allowed.\n- **`let`**:\n  - Scope: Block-scoped `{ }`.\n  - Hoisting: Hoisted but not initialized (lies in the Temporal Dead Zone).\n  - Re-assignment: Allowed.\n- **`const`**:\n  - Scope: Block-scoped `{ }`.\n  - Hoisting: Hoisted but not initialized.\n  - Re-assignment: **Not allowed** (immutable bindings, though properties of objects/arrays *can* be modified).\n\n```javascript\nvar a = 10; // Function scoped\nlet b = 20; // Block scoped\nconst c = 30; // Block scoped & constant reference\n```",
    "difficulty": "easy",
    "category": "JavaScript"
  },
  {
    "question": "What is the difference between == and ===?",
    "answer": "- **`==` (Loose Equality)**: Compares only the values after converting them to a common type (implicit type coercion).\n- **`===` (Strict Equality)**: Compares both the values and their data types without performing type coercion.\n\n```javascript\nconsole.log(5 == '5');  // true (type coercion converts string to number)\nconsole.log(5 === '5'); // false (different types: number vs string)\n```",
    "difficulty": "easy",
    "category": "JavaScript"
  },
  {
    "question": "What is the difference between null and undefined?",
    "answer": "- **`undefined`**: Means a variable has been declared but has not yet been assigned a value.\n- **`null`**: Is an assignment value that represents the intentional absence of any object value. It must be explicitly assigned.\n\n```javascript\nlet x; // undefined\nlet y = null; // null\n\nconsole.log(typeof x); // \"undefined\"\nconsole.log(typeof y); // \"object\" (known JS bug/quirk)\n```",
    "difficulty": "easy",
    "category": "JavaScript"
  },
  {
    "question": "What are primitive and non-primitive types in JavaScript?",
    "answer": "- **Primitive Types**: Stored directly in the call stack. They are immutable and compared by value.\n  - Types: `String`, `Number`, `Boolean`, `Null`, `Undefined`, `Symbol`, `BigInt`.\n- **Non-Primitive Types (Reference Types)**: Stored in the heap. The call stack holds the reference/address. They are mutable and compared by reference.\n  - Types: `Object`, `Array`, `Function`.",
    "difficulty": "easy",
    "category": "JavaScript"
  },
  {
    "question": "What are the shift() and unshift() methods in JavaScript?",
    "answer": "These are built-in array mutation methods that operate at the beginning of an array:\n\n- **`shift()`**: Removes the first element from an array and returns that removed element. This shifts all remaining elements down by one index.\n- **`unshift()`**: Adds one or more elements to the beginning of an array and returns the new length of the array.\n\n```javascript\nconst arr = [2, 3, 4];\narr.unshift(1); // arr is now [1, 2, 3, 4]\narr.shift();    // returns 1, arr is now [2, 3, 4]\n```",
    "difficulty": "easy",
    "category": "JavaScript"
  },
  {
    "question": "What is the map() method? Provide a code example.",
    "answer": "The `map()` method creates a new array populated with the results of calling a provided function on every element in the calling array. It does not modify the original array.\n\n```javascript\nconst fruits = ['apple', 'banana', 'cherry'];\nconst uppercaseFruits = fruits.map(fruit => fruit.toUpperCase());\nconsole.log(uppercaseFruits); // Output: ['APPLE', 'BANANA', 'CHERRY']\n```",
    "difficulty": "easy",
    "category": "JavaScript"
  },
  {
    "question": "Explain the map and reduce methods in JavaScript.",
    "answer": "- **`map()`**: Transforms every element in an array and returns a new array of the same length.\n- **`reduce()`**: Executes a reducer function on each element, accumulating the results into a single output value.\n\n```javascript\n// reduce example: summing array numbers\nconst numbers = [1, 2, 3, 4];\nconst sum = numbers.reduce((acc, curr) => acc + curr, 0);\nconsole.log(sum); // 10\n```",
    "difficulty": "medium",
    "category": "JavaScript"
  },
  {
    "question": "What is hoisting?",
    "answer": "Hoisting is JavaScript's default behavior of moving declarations to the top of the current scope before execution.\n\n- **Functions**: Fully hoisted. You can run them before they are declared.\n- **var**: Hoisted but initialized as `undefined`.\n- **let / const**: Hoisted but not initialized (they remain in the Temporal Dead Zone until initialized).",
    "difficulty": "medium",
    "category": "JavaScript Advanced"
  },
  {
    "question": "What is a Closure? Give a practical example.",
    "answer": "A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). In other words, a closure gives an inner function access to the outer function's scope even after the outer function has returned.\n\n```javascript\nfunction makeAdder(x) {\n  return function(y) {\n    return x + y;\n  };\n}\nconst add5 = makeAdder(5);\nconsole.log(add5(2)); // 7\n```",
    "difficulty": "medium",
    "category": "JavaScript Advanced"
  },
  {
    "question": "Explain the Event Loop in JavaScript.",
    "answer": "JavaScript is single-threaded, meaning it executes one task at a time. The event loop allows JavaScript to handle asynchronous operations by offloading tasks to the browser APIs (or Node.js runtime) and handling their callbacks when they finish.\n\nIt works in a loop:\n1. Run synchronous code on the Call Stack.\n2. When the call stack is empty, run microtasks (Promises, process.nextTick).\n3. Render updates if necessary.\n4. Pull a task from the macrotask queue (setTimeout, I/O) and run it.",
    "difficulty": "hard",
    "category": "JavaScript Advanced"
  },
  {
    "question": "What is the difference between call stack, microtask queue, and macrotask queue?",
    "answer": "- **Call Stack**: Where synchronous execution takes place.\n- **Microtask Queue**: Holds high-priority async callbacks (e.g., Promises, `MutationObserver`). Run completely after stack is empty.\n- **Macrotask Queue**: Holds standard async callbacks (e.g., `setTimeout`, `setInterval`, I/O). Executed one by one, checking microtasks in between.",
    "difficulty": "hard",
    "category": "JavaScript Advanced"
  },
  {
    "question": "Difference between: setTimeout, setImmediate, and process.nextTick in Node.js?",
    "answer": "These control when callback functions execute inside the event loop:\n\n- **`process.nextTick`**: Runs immediately after the current phase of the event loop finishes, before microtasks and before transitioning to the next phase.\n- **`setImmediate`**: Runs in the 'Check' phase of the Event Loop, immediately after I/O polling.\n- **`setTimeout`**: Runs in the 'Timers' phase, after a minimum threshold of time has passed.\n\n```\nCall Stack -> process.nextTick -> Promises (Microtasks) -> Timers (setTimeout) -> Check (setImmediate)\n```",
    "difficulty": "hard",
    "category": "JavaScript Advanced"
  },
  {
    "question": "What happens internally when you use async/await?",
    "answer": "The `async/await` syntax is syntactic sugar built on top of JavaScript Promises.\n\n- Under the hood, it is translated into a **Generator** function wrapped in a promise runner.\n- When a function encounters `await`, it pauses execution of that function's block, yields control back to the event loop, and schedules the remaining lines as a microtask callback once the awaited Promise resolves.",
    "difficulty": "hard",
    "category": "JavaScript Advanced"
  },
  {
    "question": "How do you implement a Throttle function?",
    "answer": "Throttling limits the execution of a function to at most once per a specified time window. If triggered repeatedly, it executes the function at regular intervals.\n\n```javascript\nfunction throttle(func, limit) {\n  let inThrottle = false;\n  return function (...args) {\n    if (!inThrottle) {\n      func.apply(this, args);\n      inThrottle = true;\n      setTimeout(() => inThrottle = false, limit);\n    }\n  };\n}\n```",
    "difficulty": "hard",
    "category": "JavaScript Advanced"
  },
  {
    "question": "What is function currying?",
    "answer": "Currying is a functional programming technique that transforms a function with multiple arguments into a sequence of nested functions, each taking a single argument.\n\n```javascript\n// Normal function\nconst add = (a, b) => a + b;\n\n// Currying implementation\nconst curriedAdd = a => b => a + b;\nconsole.log(curriedAdd(5)(10)); // 15\n```",
    "difficulty": "medium",
    "category": "JavaScript Advanced"
  },
  {
    "question": "What is an IIFE (Immediately Invoked Function Expression)?",
    "answer": "An IIFE is a function that runs as soon as it is defined. It is used to create local scope and prevent variables from polluting the global namespace.\n\n```javascript\n(function () {\n  const privateMessage = \"Encapsulated\";\n  console.log(privateMessage);\n})();\n```",
    "difficulty": "easy",
    "category": "JavaScript Advanced"
  },
  {
    "question": "Write a recursive function to print 10 to 1 without using any loops.",
    "answer": "We can use recursive division where the base condition exits the execution once the count reaches 0.\n\n```javascript\nfunction printCountdown(n) {\n  if (n === 0) return;\n  console.log(n);\n  printCountdown(n - 1);\n}\nprintCountdown(10);\n```",
    "difficulty": "easy",
    "category": "JavaScript Advanced"
  },
  {
    "question": "Write a recursive function to print 10 to 1 with a one-second delay between prints.",
    "answer": "We can combine recursion with `setTimeout`:\n\n```javascript\nfunction countdownDelay(n) {\n  if (n === 0) return;\n  console.log(n);\n  setTimeout(() => {\n    countdownDelay(n - 1);\n  }, 1000);\n}\ncountdownDelay(10);\n```",
    "difficulty": "medium",
    "category": "JavaScript Advanced"
  },
  {
    "question": "How do you count the frequency of elements in an array using reduce?",
    "answer": "Here is the implementation of an element frequency counter using `Array.prototype.reduce`:\n\n```javascript\nconst countFrequency = arr =>\n  arr.reduce((acc, curr) => {\n    acc[curr] = (acc[curr] || 0) + 1;\n    return acc;\n  }, {});\n\nconsole.log(countFrequency(['apple', 'banana', 'apple', 'orange', 'banana', 'apple']));\n// Output: { apple: 3, banana: 2, orange: 1 }\n```",
    "difficulty": "medium",
    "category": "JavaScript Advanced"
  },
  {
    "question": "What is the difference between standard functions and arrow functions?",
    "answer": "There are four critical differences:\n\n1. **`this` Binding**: Standard functions have dynamically bound `this` depending on how they are called. Arrow functions bind `this` lexically to the surrounding outer context.\n2. **`arguments` Object**: Arrow functions do not have their own `arguments` binding. You must use rest parameters `...args` instead.\n3. **Constructor Usage**: Standard functions can be instantiated using `new`. Arrow functions cannot be used as constructors and throw an error.\n4. **Hoisting**: Standard function declarations are hoisted. Arrow functions (being variable assignments) are not hoisted and follow let/const TDZ rules.",
    "difficulty": "medium",
    "category": "JavaScript Advanced"
  },
  {
    "question": "How do you remove duplicates from an array without using any built-in functions?",
    "answer": "We can use an object to track unique elements or use nested loops manually:\n\n```javascript\nfunction removeDuplicates(arr) {\n  const seen = {};\n  const result = [];\n  for (let i = 0; i < arr.length; i++) {\n    if (!seen[arr[i]]) {\n      result.push(arr[i]);\n      seen[arr[i]] = true;\n    }\n  }\n  return result;\n}\nconsole.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5])); // [1, 2, 3, 4, 5]\n```",
    "difficulty": "medium",
    "category": "JavaScript Advanced"
  },
  {
    "question": "How do you capitalize the first letter of each word in a string (e.g., 'raj kapur' -> 'Raj Kapur')?",
    "answer": "We split the string into an array of words, capitalize the first letter of each, and join them back:\n\n```javascript\nfunction capitalizeWords(str) {\n  return str\n    .split(' ')\n    .map(word => word.charAt(0).toUpperCase() + word.slice(1))\n    .join(' ');\n}\nconsole.log(capitalizeWords('raj kapur')); // Output: 'Raj Kapur'\n```",
    "difficulty": "easy",
    "category": "JavaScript Advanced"
  },
  {
    "question": "Difference between function expression and function declaration?",
    "answer": "- **Function Declaration**: Standard definition that is hoisted, so it can be called before it is defined.\n- **Function Expression**: Function assigned to a variable. It is not hoisted and follows block/variable scoping rules.\n\n```javascript\n// Declaration\nfunction decl() { return 'hoisted'; }\n\n// Expression\nconst expr = function() { return 'not hoisted'; };\n```",
    "difficulty": "easy",
    "category": "JavaScript Advanced"
  },
  {
    "question": "How can we block the JavaScript main thread?",
    "answer": "Since JavaScript is single-threaded, running an infinite loop or performing an extremely heavy synchronous calculation will block the call stack, freezing the entire UI or server:\n\n```javascript\n// Blocks the main thread infinitely\nwhile(true) {\n  // call stack is never cleared\n}\n```",
    "difficulty": "medium",
    "category": "JavaScript Advanced"
  },
  {
    "question": "What is the difference between for...of and for...in loops in JavaScript?",
    "answer": "- **`for...in`**: Iterates over the **keys (property names)** of an object or indices of an array.\n- **`for...of`**: Iterates over the **values** of an iterable object (like an Array, Set, Map, or String).\n\n```javascript\nconst arr = ['a', 'b'];\nfor (let index in arr) console.log(index); // 0, 1\nfor (let val of arr) console.log(val); // 'a', 'b'\n```",
    "difficulty": "easy",
    "category": "JavaScript Advanced"
  },
  {
    "question": "What are React Fragments?",
    "answer": "A Fragment is a lightweight wrapper that allows you to group multiple child elements without rendering an extra DOM node (like a `<div>`).\n\n```jsx\n// Using shorthand <> </>\nreturn (\n  <>\n    <h1>Title</h1>\n    <p>Paragraph</p>\n  </>\n);\n```",
    "difficulty": "easy",
    "category": "React"
  },
  {
    "question": "What are the core building blocks of React?",
    "answer": "The primary architectural blocks of React are:\n1. **Components**: Declarative, reusable UI templates.\n2. **JSX**: Javascript syntax extension mapping to element rendering.\n3. **Props and State**: Configuration and reactive state management.\n4. **Context**: Global scoping provider for cross-component variables.\n5. **Virtual DOM**: Light in-memory copy of native DOM tree.",
    "difficulty": "easy",
    "category": "React"
  },
  {
    "question": "What is conditional rendering in React?",
    "answer": "Conditional rendering is displaying components or elements based on a logic state, just like using `if` statements in Javascript.\n\n```jsx\n// Ternary\nreturn isAdmin ? <AdminPanel /> : <UserPanel />;\n\n// Logical &&\nreturn hasErrors && <ErrorMessage />;\n```",
    "difficulty": "easy",
    "category": "React"
  },
  {
    "question": "Can we pass data from child component to parent component in React?",
    "answer": "Yes, you pass data from child to parent by passing a **callback function** as a prop from the parent to the child. The child component then invokes this callback function and passes the data as an argument.\n\n```jsx\n// Parent\nconst handleData = (childData) => console.log(childData);\nreturn <Child onDataSubmit={handleData} />;\n\n// Child\nreturn <button onClick={() => props.onDataSubmit('Hello Parent!')}>Send</button>;\n```",
    "difficulty": "medium",
    "category": "React"
  },
  {
    "question": "What are controlled and uncontrolled components?",
    "answer": "- **Controlled Component**: A component where form data is handled by the React state. The state acts as the single source of truth.\n- **Uncontrolled Component**: A component where form data is handled by the DOM itself. We use **`useRef`** to query values from DOM nodes directly.",
    "difficulty": "medium",
    "category": "React"
  },
  {
    "question": "What is an Outlet in React Router?",
    "answer": "An `Outlet` is a component provided by `react-router-dom` that acts as a placeholder. It renders the matching child route components of a parent layout route, making it essential for nested navigation layouts.\n\n```jsx\n// Layout wrapper\nimport { Outlet } from 'react-router-dom';\nfunction DashboardLayout() {\n  return (\n    <div>\n      <Sidebar />\n      <Outlet /> {/* Child routes like /dashboard/settings render here */}\n    </div>\n  );\n}\n```",
    "difficulty": "medium",
    "category": "React"
  },
  {
    "question": "Why do we use event.preventDefault() in form handling?",
    "answer": "We call `event.preventDefault()` inside submit handlers to prevent the browser's default behavior, which is to reload the page when a form is submitted. This allows React application JavaScript to process the inputs and make asynchronous API calls without breaking state.",
    "difficulty": "easy",
    "category": "React"
  },
  {
    "question": "How do you stop unnecessary re-rendering in React.js?",
    "answer": "Unnecessary re-renders can be stopped using:\n1. **`React.memo`**: Wraps components to skip rendering if props haven't changed.\n2. **`useMemo`**: Memoizes the values of expensive calculations.\n3. **`useCallback`**: Memoizes callbacks to maintain reference integrity.\n4. **State Localization**: Keeping state locally inside child elements instead of hoisting globally.",
    "difficulty": "medium",
    "category": "React Advanced"
  },
  {
    "question": "Difference between pure components (class-based) and React.memo?",
    "answer": "- **`React.PureComponent`**: A base class for React class components that performs a shallow comparison of props and state before rendering.\n- **`React.memo`**: A higher-order component for **functional components** that also does a shallow comparison of props, skipping re-renders if props match.",
    "difficulty": "medium",
    "category": "React Advanced"
  },
  {
    "question": "What causes memory leaks in React.js and how do we prevent them?",
    "answer": "Memory leaks in React are caused by tasks executing in the background after a component is unmounted. Common culprits include:\n- Uncleared timers (`setInterval`/`setTimeout`).\n- Active event listeners on `window` or `document`.\n- Unsubscribed WebSockets or API streams.\n\n**Prevention**: Always clean up resources inside `useEffect` return functions.\n\n```javascript\nuseEffect(() => {\n  const handleResize = () => {};\n  window.addEventListener('resize', handleResize);\n  \n  return () => {\n    // Cleanup run when component unmounts\n    window.removeEventListener('resize', handleResize);\n  };\n}, []);\n```",
    "difficulty": "hard",
    "category": "React Advanced"
  },
  {
    "question": "How do you handle cookies in a React.js application?",
    "answer": "We can handle cookies using native `document.cookie` strings, or more commonly using helper libraries like `js-cookie` or `universal-cookie` for safer operations:\n\n```javascript\nimport Cookies from 'js-cookie';\n\n// Set a cookie\nCookies.set('authToken', token, { expires: 7 });\n\n// Get a cookie\nconst token = Cookies.get('authToken');\n\n// Remove a cookie\nCookies.remove('authToken');\n```",
    "difficulty": "medium",
    "category": "React Advanced"
  },
  {
    "question": "Explain the difference between app.use() and app.get() in Express.js.",
    "answer": "- **`app.use()`**: Registers a middleware function for all HTTP methods (GET, POST, etc.) and matching paths. Used for setup (e.g., body-parsing, logging).\n- **`app.get()`**: Specifically registers a route handler only for HTTP **GET** requests at the specified path.\n\n```javascript\napp.use(express.json()); // Runs on all requests\napp.get('/users', (req, res) => res.json(users)); // GET request only\n```",
    "difficulty": "easy",
    "category": "Node & Express"
  },
  {
    "question": "What is REPL in Node.js?",
    "answer": "REPL stands for **Read-Eval-Print-Loop**. It is an interactive shell environment built into Node.js. It reads JS commands typed by the user, evaluates them, prints the results, and loops back to wait for more input. You access it by typing `node` in your command line.",
    "difficulty": "easy",
    "category": "Node & Express"
  },
  {
    "question": "What is the purpose of the package.json file?",
    "answer": "The `package.json` file is the heart of a Node.js project. It contains:\n- Metadata (Project name, version, author).\n- CLI Scripts (e.g., `npm run dev`).\n- **Dependencies**: Libraries required for production.\n- **devDependencies**: Libraries only required for development (e.g., ESLint, compiler tools).",
    "difficulty": "easy",
    "category": "Node & Express"
  },
  {
    "question": "How do you install, update, and delete dependencies in a Node project?",
    "answer": "Using NPM commands:\n\n- **Install**: `npm install <package-name>` (or `npm i`)\n- **Update**: `npm update <package-name>`\n- **Delete**: `npm uninstall <package-name>`",
    "difficulty": "easy",
    "category": "Node & Express"
  },
  {
    "question": "What are child processes in Node.js? Name the four methods to create them.",
    "answer": "Because Node runs in a single process, CPU-heavy tasks block execution. We can offload these tasks using the `child_process` module to run helper processes. The four methods are:\n\n1. **`spawn()`**: Spawns a new command. Handles streaming data (preferred for large data outputs).\n2. **`exec()`**: Runs a command in a shell and buffers the output, passing it to a callback (best for small outputs).\n3. **`execFile()`**: Runs an executable file directly without spawning a shell.\n4. **`fork()`**: A special instance of `spawn` that creates a new Node process with a built-in IPC channel for sending messages between parent and child.",
    "difficulty": "hard",
    "category": "Node.js Deep Dive"
  },
  {
    "question": "Does MongoDB support foreign key constraints?",
    "answer": "No. MongoDB is a NoSQL, non-relational database and does not support traditional SQL foreign key constraints or cascading deletes.\n\nInstead, we model relationships using:\n1. **Document Referencing (Normalization)**: Storing the ID of another document manually.\n2. **Embedded Documents (Denormalization)**: Nesting the associated document directly inside the parent document (preferred in NoSQL for fast reads).",
    "difficulty": "easy",
    "category": "MongoDB"
  },
  {
    "question": "What is the role of the `_id` field in MongoDB documents?",
    "answer": "The `_id` field acts as the unique primary key for every document in a collection. If you insert a document without an `_id` field, MongoDB automatically generates a unique 12-byte **ObjectId** for it, containing timestamps and machine-specific values.",
    "difficulty": "easy",
    "category": "MongoDB"
  },
  {
    "question": "Explain SQL Stored Procedures and Triggers.",
    "answer": "- **Stored Procedure**: A prepared batch of SQL statements that are saved in the database engine, allowing them to be executed repeatedly (like a function inside SQL).\n- **Trigger**: A database object that automatically fires in response to specific events (such as `INSERT`, `UPDATE`, or `DELETE`) on a table.",
    "difficulty": "medium",
    "category": "SQL & Databases"
  },
  {
    "question": "Compare Relational (SQL) and Non-Relational (NoSQL) Databases.",
    "answer": "- **Relational (SQL)**: Structured tables, schemas, relations, ACID transactional compliance. Ideal for complex JOIN queries (e.g. banking).\n- **Non-Relational (NoSQL)**: Flexible schemas, dynamic collections, horizontal scaling. Designed for high volume, unstructured storage, and fast performance.",
    "difficulty": "medium",
    "category": "SQL & Databases"
  },
  {
    "question": "How do you do JOIN operations in MongoDB?",
    "answer": "In MongoDB, we can perform JOIN-like operations using the **`$lookup`** aggregation stage to fetch documents from a secondary collection.\n\n```javascript\n// Aggregating Orders with matching Users\ndb.orders.aggregate([\n  {\n    $lookup: {\n      from: \"users\", // join table\n      localField: \"userId\",\n      foreignField: \"_id\",\n      as: \"user_details\" // output array\n    }\n  }\n])\n```",
    "difficulty": "medium",
    "category": "MongoDB Advanced"
  },
  {
    "question": "What is the difference between Authentication and Authorization?",
    "answer": "- **Authentication (AuthN)**: Verifies **who** a user is (e.g., entering username and password or logging in with Google).\n- **Authorization (AuthZ)**: Verifies **what** an authenticated user has permission to do (e.g., checking if the user is an Admin before allowing deletion of a file).",
    "difficulty": "easy",
    "category": "Security"
  },
  {
    "question": "How do you secure a Node.js API against CSRF attacks?",
    "answer": "Cross-Site Request Forgery (CSRF) tricks a user's browser into executing an unwanted action on a trusted site where they are authenticated.\n\n**Prevention**:\n1. **Anti-CSRF Tokens**: Utilizing libraries like `csrf-csrf` or `csurf` to generate tokens that the frontend must include in headers for modification requests (POST/PUT).\n2. **SameSite Cookies**: Setting the `SameSite` attribute of cookies to `Strict` or `Lax` to prevent browsers from attaching credentials to cross-site requests.",
    "difficulty": "hard",
    "category": "Security"
  },
  {
    "question": "What are Microservices and what is their primary use case?",
    "answer": "Microservices is an architectural style that structures an application as a collection of small, independent services communicating via APIs (REST or message queues like RabbitMQ).\n\n**Use Cases**:\n- Large teams working on separate services independently.\n- Scaling individual components of an app (e.g., scaling the payment service independently of the search service).\n- Mixing technology stacks (e.g., building user auth in Node.js and data science recommendations in Python).",
    "difficulty": "hard",
    "category": "System Design & Architecture"
  }
];