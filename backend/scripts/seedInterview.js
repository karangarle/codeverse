import mongoose from 'mongoose';
import dotenv from 'dotenv';
import InterviewQuestion from '../models/InterviewQuestion.js';
import connectDB from '../config/db.js';

dotenv.config();

const run = async () => {
  await connectDB();
  
  // Clear existing questions if we want to replace them, or just insert new ones.
  // We'll delete all to start fresh with this huge list.
  await InterviewQuestion.deleteMany({});

  const questions = [
    {
      question: "What is MERN Stack and what are its components?",
      answer: "The MERN stack is a web development framework consisting of MongoDB, Express.js, React.js, and Node.js.\n\n- **MongoDB**: A NoSQL database that stores data in flexible, JSON-like documents.\n- **Express.js**: A fast, unopinionated web application framework for Node.js used to build APIs.\n- **React.js**: A front-end JavaScript library developed by Facebook for building user interfaces.\n- **Node.js**: A JavaScript runtime built on Chrome's V8 engine that allows for server-side execution of JavaScript code.",
      difficulty: "easy",
      category: "MERN Basics"
    },
    {
      question: "What is JSX?",
      answer: "JSX stands for JavaScript eXtensible Markup Language (XML).\n\nIt is a syntax extension for JavaScript that is commonly used with React to describe what the user interface (UI) should look like. JSX allows us to write HTML elements in JavaScript, making the code more readable and expressive. Under the hood, Babel transforms JSX into standard `React.createElement()` calls.\n\n```jsx\nimport React from 'react';\n\nfunction App() {\n  const name = 'Sadaf';\n  return <h1>Hello, {name}!</h1>;\n}\n\nexport default App;\n```",
      difficulty: "easy",
      category: "React"
    },
    {
      question: "How do you ensure data validation in a MERN stack application?",
      answer: "Data validation should be ensured on both the client-side and server-side:\n\n1. **Backend (Express.js)**: Using libraries like `Joi`, `express-validator`, or `Zod` to validate incoming request bodies before saving to the database. Mongoose schemas also provide built-in validation.\n2. **Frontend (React.js)**: Using form validation libraries like `Formik` combined with `Yup`, or `React Hook Form` to give immediate feedback to the user before they submit the form.\n\n```javascript\n// Frontend Validation Example using Formik & Yup\nconst formik = useFormik({\n  initialValues: { contact: '' },\n  validationSchema: Yup.object().shape({\n    contact: Yup.number().required('Contact is required')\n  }),\n  onSubmit: (values) => console.log(values)\n});\n```",
      difficulty: "medium",
      category: "Node & Express"
    },
    {
      question: "What are the core principles of Redux?",
      answer: "There are three core principles of Redux:\n\n1. **Single Source of Truth**: The state of your whole application is stored in an object tree within a single store.\n2. **State is Read-Only**: The only way to change the state is to emit an action (an object describing what happened).\n3. **Changes are Made with Pure Functions**: To specify how the state tree is transformed by actions, you write pure reducers.",
      difficulty: "medium",
      category: "React"
    },
    {
      question: "What are pure functions? How do you explain 'Changes are Made with Pure Functions'?",
      answer: "Pure functions in Redux are the reducers.\n\nA pure function is a function that, given the same input, will always return the same output, and produces no side effects (like API calls or mutating external variables).\n\nThe principle 'Changes are Made with Pure Functions' means that Reducers take the current state and an action as inputs and return a brand new state object without mutating the original state. This ensures that state updates are predictable and consistent.\n\n```javascript\nconst initialState = { count: 0 };\n\nexport const basicReducer = (state = initialState, action) => {\n  if (action.type === 'INCREMENT') return { count: state.count + 1 };\n  if (action.type === 'DECREMENT') return { count: state.count - 1 };\n  return state;\n};\n```",
      difficulty: "medium",
      category: "JavaScript"
    },
    {
      question: "Why do we use an .env file in a MERN stack application?",
      answer: "We use an `.env` file in a MERN stack application to securely store and manage sensitive data such as database credentials, secret keys, and API keys, as well as environment-specific configuration settings.\n\nThis prevents sensitive information from being hardcoded into the source code and accidentally uploaded to public repositories like GitHub.\n\n```env\nPORT=5000\nSECRET_KEY=MY_SUPER_SECRET_KEY\nFRONTEND_URL=http://localhost:3000\nJWT_EXPIRES_IN=1d\n```",
      difficulty: "easy",
      category: "Node & Express"
    },
    {
      question: "Why do we use the $set modifier in MongoDB?",
      answer: "The `$set` modifier in MongoDB is used to update specific fields in a document without overwriting the entire document.\n\nIt allows us to change the value of an existing field or add a completely new field if it doesn't already exist in the document. If we didn't use `$set` during an update, MongoDB might replace the entire document with only the updated fields.\n\n```javascript\ndb.users.updateOne(\n  { _id: ObjectId(\"4b253b0...\") },\n  { $set: { location: \"New York\" } }\n);\n```",
      difficulty: "medium",
      category: "MongoDB"
    },
    {
      question: "How do you create a simple server in Node.js that returns 'Hello World'?",
      answer: "You can create a simple server using the built-in `http` module.\n\n1. Require the `http` module.\n2. Create a server using `http.createServer()` that handles incoming requests (`req`) and responses (`res`).\n3. Set the status code (e.g., 200) and the content type (e.g., 'text/plain').\n4. Send the response to the client using `res.end()`.\n5. Tell the server to listen on a specific port.\n\n```javascript\nconst http = require('http');\n\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, { 'Content-Type': 'text/plain' });\n  res.end('Hello World\\n');\n});\n\nserver.listen(5000, () => {\n  console.log('Server running at http://localhost:5000/');\n});\n```",
      difficulty: "easy",
      category: "Node & Express"
    },
    {
      question: "What is useSelector hook and why we use it?",
      answer: "The `useSelector` hook is a function provided by the `react-redux` library that allows us to extract data from the Redux store state.\n\nIt replaces the older `mapStateToProps` function used in class components. It automatically subscribes the functional component to the Redux store, meaning the component will re-render any time the specific piece of state it is selecting gets updated.\n\n```javascript\nimport { useSelector } from 'react-redux';\n\nfunction UserProfile() {\n  // Extracts just the 'user' object from the global Redux state\n  const user = useSelector((state) => state.auth.user);\n  return <div>{user.name}</div>;\n}\n```",
      difficulty: "medium",
      category: "React"
    },
    {
      question: "How does Express.js handle Routing?",
      answer: "Express.js handles routing by associating specific HTTP methods (GET, POST, PUT, DELETE) with URL paths.\n\nRoutes are defined directly on the app instance using methods like `app.get()`, `app.post()`, `app.patch()`, and `app.delete()`. Express also supports route parameters (like `/users/:id`) for dynamic URLs.\n\nFor larger applications, Express provides the `express.Router()` class to organize routes modularly into separate files.\n\n```javascript\nconst express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => {\n  res.send('Welcome to the Home Page!');\n});\n\napp.post('/submit', (req, res) => {\n  res.send('Form Submitted!');\n});\n```",
      difficulty: "easy",
      category: "Node & Express"
    },
    {
      question: "How can you implement authentication in Express.js?",
      answer: "Authentication in Express.js can be implemented through various strategies:\n\n1. **JSON Web Tokens (JWT)**: A stateless, token-based system where the server signs a token and sends it to the client. The client sends it back in headers for verification.\n2. **Session-based Authentication**: A stateful system using cookies where the server stores session data in memory or a DB, and assigns the user a Session ID.\n3. **OAuth / Third-Party Providers**: Integrating with services like Google, GitHub, or Facebook using libraries like Passport.js.\n4. **Password Hashing**: Always hash passwords using libraries like `bcrypt` before storing them in the database.",
      difficulty: "hard",
      category: "Node & Express"
    },
    {
      question: "What are modules in Node.js, and can you name five commonly used ones?",
      answer: "Modules in Node.js are like JavaScript libraries that provide specific, reusable functionalities. They prevent you from having to write everything from scratch. You can include a module using the `require()` or `import` syntax.\n\nNode.js comes with several built-in core modules:\n1. **`fs`**: For File System operations (reading/writing files).\n2. **`http`**: For creating HTTP servers and making network requests.\n3. **`path`**: For handling and transforming file and directory paths (commonly used).\n4. **`stream`**: For handling streaming data (like video or large files).\n5. **`querystring`**: For parsing and formatting URL query strings.",
      difficulty: "easy",
      category: "Node & Express"
    },
    {
      question: "What is the difference between req.params and req.query?",
      answer: "**req.params** contains route parameters. These are part of the actual URL structure defined by the path (e.g., `/product/:id`). They are typically used for required or structured data to identify a specific resource.\n- URL: `daraz/stationary/pen-1` -> `req.params.id` is 'pen-1'\n\n**req.query** contains query string parameters. These are key-value pairs appended to the URL after a `?` symbol. They are used for optional, filter-like data such as sorting or pagination.\n- URL: `/search?sort=price&order=asc` -> `req.query.sort` is 'price'",
      difficulty: "medium",
      category: "Node & Express"
    },
    {
      question: "How would you delay an API call until a component is mounted?",
      answer: "In modern React (using Functional Components), we use the `useEffect` hook to achieve this.\n\nBy passing an empty dependency array `[]` as the second argument to `useEffect`, we tell React to run the inner function (the API call) only *once*, immediately after the component is rendered to the screen. \n\nThis mimics the behavior of `componentDidMount` in older Class components.\n\n```javascript\nimport React, { useEffect } from 'react';\n\nconst MyFunctionalComponent = () => {\n  useEffect(() => {\n    // API call goes here. It runs only once after mount.\n    fetchData();\n  }, []);\n\n  return <div>Hello</div>;\n}\n```",
      difficulty: "medium",
      category: "React"
    },
    {
      question: "What is a Collection in MongoDB?",
      answer: "A collection in MongoDB is the equivalent of a Table in a relational SQL database. It is a group of MongoDB documents that are stored together.\n\nUnlike SQL tables, collections do not enforce a strict schema by default (schemaless). This means documents inside the same collection can have completely different fields, arrays, and nested objects. \n\nFor example, one User document might have a `purchases` array, while another User document in the exact same collection might have a `membershipTier` field instead.",
      difficulty: "easy",
      category: "MongoDB"
    },
    {
      question: "What is the difference between props and state in React?",
      answer: "**Props (Properties)** are used to pass data from a parent component down to a child component. They are **read-only** (immutable), meaning the child component cannot modify the props it receives.\n\n**State** is used to store and manage data *within* a single component. State is local to that specific component. When state is updated (using a setter like `setCount`), the component automatically re-renders to reflect the new data.\n\nIn short: Props get passed down like instructions from a boss. State is a component's own personal memory.",
      difficulty: "easy",
      category: "React"
    },
    {
      question: "Can we run Node.js in Windows?",
      answer: "Yes, Node.js is cross-platform and runs perfectly on Windows, macOS, and Linux.\n\nYou can download the Windows installer from the official Node.js website. Once installed, you can execute JavaScript files directly from the Windows Command Prompt or PowerShell using the `node filename.js` command.",
      difficulty: "easy",
      category: "Node & Express"
    },
    {
      question: "What are the data types supported by MongoDB?",
      answer: "MongoDB supports a wide variety of BSON (Binary JSON) data types, including:\n\n- **String**: For text.\n- **Number**: For integers and floats.\n- **Boolean**: For true/false values.\n- **Date**: For storing dates and times.\n- **Array**: For lists of values.\n- **Object**: For nested/embedded documents.\n- **ObjectId**: A unique ID used for document primary keys (`_id`).\n- **Null**: For empty fields.\n- **Regex**: For storing regular expressions.\n- **BinaryData**: For storing raw binary data (like images).",
      difficulty: "medium",
      category: "MongoDB"
    },
    {
      question: "What is the role of 'export default' in React?",
      answer: "The `export default` keyword is used to expose a component (or function, or variable) so that it can be imported and used in other files across your application.\n\nWhen a component is exported using `export default`, you can import it into another file using any name you want, without needing curly braces. A file can only have one default export.\n\n```javascript\n// App.js\nfunction App() { return <div>App</div>; }\nexport default App;\n\n// index.js\nimport MyApp from './App'; // Valid!\n```",
      difficulty: "easy",
      category: "React"
    },
    {
      question: "What is the setTimeout() function?",
      answer: "The `setTimeout()` function is part of the JavaScript runtime (provided by the browser or Node.js). \n\nIt allows us to execute a specific callback function after a designated amount of time (measured in milliseconds) has passed. It is an asynchronous function, meaning it does not block the rest of the code from running while it waits.\n\n```javascript\nsetTimeout(() => {\n  console.log(\"This prints after 2 seconds\");\n}, 2000);\n```",
      difficulty: "easy",
      category: "JavaScript"
    },
    {
      question: "What is NPM?",
      answer: "NPM stands for Node Package Manager.\n\nIt is the world's largest open-source software registry, containing over a million code packages. It is responsible for managing all the third-party packages and modules for Node.js.\n\nNPM makes it incredibly easy to install, update, and manage the dependencies for your Node.js and React projects. When you run `npm install express`, NPM reaches out to its registry, downloads the Express code, and places it in your `node_modules` folder.",
      difficulty: "easy",
      category: "Node & Express"
    },
    {
      question: "How can we check if Node.js and NPM are installed on our local machine?",
      answer: "You can verify the installation by opening your terminal (or command prompt) and running version-check commands:\n\n- To check if Node.js is installed, type: `node -v` (or `node --version`). It will output the version number (e.g., `v18.16.0`).\n- To check if NPM is installed, type: `npm -v` (or `npm --version`).\n\nIf the terminal says 'command not found', it means they are not installed or not in your system's PATH.",
      difficulty: "easy",
      category: "Node & Express"
    },
    {
      question: "What kind of API functions are supported by Node.js?",
      answer: "Node.js heavily utilizes two types of API functions for interacting with the system (like reading files):\n\n1. **Synchronous Functions**: These block the event loop. The code halts execution until the operation completes. They usually end with 'Sync' (e.g., `fs.readFileSync`).\n2. **Asynchronous Functions**: These do NOT block the event loop. They use callbacks, Promises, or async/await to notify the program when the operation finishes (e.g., `fs.readFile`). Asynchronous APIs are preferred in Node.js to keep the server responsive.",
      difficulty: "medium",
      category: "Node & Express"
    },
    {
      question: "What is an event in React?",
      answer: "An event in React is an action triggered by a user or the system, such as clicking a button, pressing a key, submitting a form, or moving the mouse. Events make the application interactive.\n\nReact uses a synthetic event system that wraps native browser events, ensuring they work identically across all browsers. Common React event handlers are camelCased:\n- `onClick`\n- `onChange`\n- `onSubmit`\n- `onMouseOver`\n\n```jsx\n<button onClick={() => alert('Clicked!')}>Click Me</button>\n```",
      difficulty: "easy",
      category: "React"
    },
    {
      question: "What is the default port number for MongoDB?",
      answer: "The default port number for MongoDB is **27017**.\n\nWhen you run MongoDB locally without specifying a port, you connect to it using the URI string: `mongodb://localhost:27017`. Knowing this default is important for configuration and troubleshooting database connection issues.",
      difficulty: "easy",
      category: "MongoDB"
    },
    {
      question: "What is bcrypt?",
      answer: "Bcrypt is a powerful password-hashing function used heavily in Node.js applications to safely hash and salt user passwords before storing them in a database.\n\nBecause hashing is a one-way process, even if a database is compromised, hackers cannot easily read the original passwords. Bcrypt is mathematically designed to be slow, making brute-force and dictionary attacks highly ineffective.\n\n```javascript\n// Hashing a password with a salt round of 12\nconst hashedPassword = await bcrypt.hash(password, 12);\n```",
      difficulty: "medium",
      category: "Node & Express"
    },
    {
      question: "Why can't browsers read JSX?",
      answer: "Browsers have built-in JavaScript engines (like Chrome's V8) that only understand standard JavaScript syntax. JSX is NOT standard JavaScript; it is a custom syntax extension created by the React team.\n\nTo enable a browser to understand your React code, the JSX files must first be transformed into standard JavaScript objects (specifically `React.createElement()` calls). This process is known as **transpilation**, and it is typically handled automatically by tools like **Babel** before the code reaches the browser.",
      difficulty: "medium",
      category: "React"
    },
    {
      question: "What are the lifecycle methods of React class components?",
      answer: "Before React Hooks, Class components relied heavily on lifecycle methods to execute code at specific points in time. The main ones are:\n\n1. **componentDidMount()**: Runs once right after the component is rendered to the screen (perfect for API calls).\n2. **componentDidUpdate()**: Runs after the component re-renders due to a state or prop change.\n3. **componentWillUnmount()**: Runs right before the component is removed from the screen (used for cleanup, like canceling timers).\n\n*(Note: Modern functional components achieve all of this using the `useEffect` hook.)*",
      difficulty: "medium",
      category: "React"
    },
    {
      question: "What is the difference between useDispatch() and useSelector()?",
      answer: "`useDispatch` and `useSelector` are the two primary hooks provided by React-Redux.\n\n- **useDispatch()**: Returns the `dispatch` function from the Redux store. It is used to *send* actions to the store to trigger state changes. (e.g., `dispatch({ type: 'INCREMENT' })`)\n- **useSelector()**: Allows you to *read* and extract data from the Redux store state. It subscribes the component to that specific piece of state, triggering a re-render if it changes.",
      difficulty: "medium",
      category: "React"
    },
    {
      question: "What is React Router?",
      answer: "React Router is the standard library used in React for handling routing in Single-Page Applications (SPAs).\n\nIt enables navigation between different views or \"pages\" without actually reloading the HTML page from the server, maintaining a lightning-fast user experience. \n\nWith React Router, you map URL paths to specific components. For example, you can tell React to render the `<Home />` component when the URL is `/`, and the `<Products />` component when the URL is `/products`.",
      difficulty: "easy",
      category: "React"
    },
    {
      question: "How is MongoDB better than SQL databases?",
      answer: "MongoDB is often preferred over relational SQL databases for dealing with unstructured or semi-structured data because it stores information in a highly flexible, JSON-like format (BSON).\n\nUnlike SQL, where every row must strictly adhere to predefined columns, MongoDB is schemaless. Documents in a single collection can have completely different fields. This allows developers to iterate and change the data structure easily without running complex database migrations.",
      difficulty: "medium",
      category: "MongoDB"
    },
    {
      question: "How do you insert a document into a MongoDB collection?",
      answer: "To insert a document into a MongoDB collection using the native driver or Mongo Shell, you use:\n\n- **`insertOne()`**: Adds a single document to the collection.\n- **`insertMany()`**: Takes an array of documents and inserts them all at once.\n\n*(When using Mongoose in an Express app, you typically use `Model.create()` or `new Model().save()` instead.)*",
      difficulty: "easy",
      category: "MongoDB"
    },
    {
      question: "What is a callback function?",
      answer: "A callback is simply a function that is passed as an argument directly into another function. \n\nThis technique allows the receiving function to execute (or \"call back\") the passed function at a later time. Callbacks are heavily used in JavaScript for asynchronous operations, like executing code after an API response arrives or after a timer finishes.\n\n```javascript\nfunction greet(name, callback) {\n  console.log(\"Hello \" + name);\n  callback(); // Invokes the function passed to it\n}\n```",
      difficulty: "easy",
      category: "JavaScript"
    },
    {
      question: "What is Prop Drilling in React JS?",
      answer: "Prop Drilling is a term used to describe the cumbersome process of passing data from a high-level parent component down to a deeply nested child component by threading it through multiple layers of intermediate components.\n\nEach component in the middle has to receive the prop and pass it down, even if it doesn't need or use the data itself. This makes code hard to maintain. Solutions to avoid prop drilling include using the **Context API** or state management tools like **Redux**.",
      difficulty: "medium",
      category: "React"
    },
    {
      question: "What are buffers in Node.js?",
      answer: "Buffers in Node.js are used to handle streams of raw binary data directly in memory.\n\nSince standard JavaScript originally had no mechanism for reading or manipulating raw streams of binary data (like images, video files, or TCP network streams), Node.js introduced the `Buffer` class. Buffers store data in small chunks in a fixed-size sequence of memory outside the V8 JavaScript engine, making data processing extremely efficient.",
      difficulty: "hard",
      category: "Node & Express"
    }
  ];

  await InterviewQuestion.insertMany(questions);

  console.log(`Successfully seeded ${questions.length} MERN interview questions!`);
  process.exit(0);
};

run().catch(console.error);
