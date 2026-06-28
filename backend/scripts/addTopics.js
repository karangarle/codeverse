import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from '../models/Course.js';
import CourseTopic from '../models/CourseTopic.js';
import User from '../models/User.js';
import connectDB from '../config/db.js';

dotenv.config();

const run = async () => {
  await connectDB();
  
  let admin = await User.findOne({ role: 'admin' });
  if (!admin) {
    admin = await User.findOne({});
  }

  // Fetch or Create Courses
  let jsCourse = await Course.findOne({ title: { $regex: /javascript/i } });
  let reactCourse = await Course.findOne({ title: { $regex: /react/i } });
  let nodeCourse = await Course.findOne({ title: { $regex: /node/i } });
  let dsaCourse = await Course.findOne({ title: { $regex: /data structures/i } });

  // Clear existing topics for these courses to avoid duplicates
  await CourseTopic.deleteMany({ 
    course: { $in: [jsCourse?._id, reactCourse?._id, nodeCourse?._id, dsaCourse?._id].filter(Boolean) } 
  });

  const allTopics = [];

  // ================= JAVASCRIPT TOPICS (5) =================
  if (jsCourse) {
    allTopics.push(
      {
        course: jsCourse._id,
        title: 'Variables & Data Types 📦',
        slug: 'js-variables',
        shortDescription: 'Think of variables as named boxes where you can store different types of information.',
        content: `Welcome to JavaScript! 🚀 \n\n**What is a variable?**\nImagine you are moving to a new house and packing boxes. You label one box "Books" and put books inside it. In programming, a variable is just a labeled box in the computer's memory where you store data!\n\n**How to create boxes in JavaScript:**\n- \`let\` — Use this for a box whose contents might change later.\n- \`const\` — Use this for a box whose contents are permanently sealed. (Best practice!)\n- \`var\` — The old way of making boxes. Try to avoid using this!\n\n**What can you put in these boxes? (Data Types)**\n1. **String** ("Hello"): Text wrapped in quotes.\n2. **Number** (42): Math numbers. No quotes needed!\n3. **Boolean** (true/false): Like a light switch.\n4. **Null**: An intentionally empty box.\n5. **Undefined**: A box that was created but never filled with anything.`,
        codeSnippet: `// 📦 Using 'const' for things that don't change\nconst myName = "Alice"; // String\nconst birthYear = 1998; // Number\n\n// 🔄 Using 'let' for things that will change\nlet age = 25;\nlet isHungry = true; // Boolean\n\n// Updating a 'let' variable\nage = 26; \n\nconsole.log("My name is", myName, "and I am", age);`,
        codeLanguage: 'javascript',
        order: 1, estimatedMinutes: 10, isPublished: true, createdBy: admin._id
      },
      {
        course: jsCourse._id,
        title: 'Functions & Arrow Functions 🏭',
        slug: 'js-functions',
        shortDescription: 'Functions are like little factories. You give them raw materials, they do work, and they give you a finished product.',
        content: `If variables are boxes of data, **Functions** are the machines that do work on that data! 🏭\n\n**Why do we need functions?**\nImagine having to write the exact same 10 lines of code every time a user clicks a button. That would be exhausting! Instead, you write those 10 lines *once* inside a function, and just "call" the function whenever you need it.\n\n**Two ways to write functions:**\n1. **Traditional Function:** The classic way. Uses the \`function\` keyword.\n2. **Arrow Function:** A modern, shorter way to write functions. They look like arrows \`=>\` and are very popular in React!`,
        codeSnippet: `// 1. Traditional Function 🏭\nfunction makeCoffee(beans, water) {\n  const coffee = beans + " and " + water;\n  return coffee;\n}\n\n// 2. Modern Arrow Function 🏹 (Shorter & cleaner)\nconst makeTea = (leaves, water) => {\n  return leaves + " and " + water;\n};\n\n// If an arrow function is just one line, you can make it even shorter!\nconst addNumbers = (a, b) => a + b;\n\nconsole.log(addNumbers(5, 10)); // Outputs: 15`,
        codeLanguage: 'javascript',
        order: 2, estimatedMinutes: 15, isPublished: true, createdBy: admin._id
      },
      {
        course: jsCourse._id,
        title: 'Arrays & High-Order Methods 📚',
        slug: 'js-arrays',
        shortDescription: 'Master map, filter, and reduce array methods.',
        content: `Arrays are like bookshelves where you can store lists of items. \n\n**High-Order Array Methods:**\nThese are built-in superpowers that allow you to transform and filter data elegantly without writing clunky \`for\` loops.\n\n- **.map()**: Creates a brand new bookshelf where every item has been transformed.\n- **.filter()**: Creates a new bookshelf containing only the items that pass a specific test.\n- **.reduce()**: Takes all the items on the bookshelf and squashes them down into a single value (like a total sum).`,
        codeSnippet: `const nums = [1, 2, 3, 4];\n\n// 🗺️ Map: Multiply everything by 2\nconst doubled = nums.map(n => n * 2); // [2, 4, 6, 8]\n\n// 🗄️ Filter: Keep only even numbers\nconst evens = nums.filter(n => n % 2 === 0); // [2, 4]\n\n// ➕ Reduce: Add them all up\nconst sum = nums.reduce((acc, curr) => acc + curr, 0); // 10`,
        codeLanguage: 'javascript',
        order: 3, estimatedMinutes: 20, isPublished: true, createdBy: admin._id
      },
      {
        course: jsCourse._id,
        title: 'Objects & Destructuring 🗂️',
        slug: 'js-objects',
        shortDescription: 'Work with object literals and extract properties easily.',
        content: `Objects are like filing cabinets. Instead of storing data in a numbered list (like Arrays), you store them using "keys" (labels) and "values".\n\n**Destructuring** is a magical syntax that lets you open the filing cabinet and pull out exactly the folders you need in a single line of code!`,
        codeSnippet: `const user = { name: "Bob", role: "admin", age: 30 };\n\n// 🗑️ The old way of getting data:\n// const name = user.name;\n// const role = user.role;\n\n// ✨ The modern Destructuring way:\nconst { name, role } = user;\nconsole.log(name, role); // Bob admin\n\n// 📝 Spread operator (Copying objects)\nconst updatedUser = { ...user, isOnline: true };`,
        codeLanguage: 'javascript',
        order: 4, estimatedMinutes: 15, isPublished: true, createdBy: admin._id
      },
      {
        course: jsCourse._id,
        title: 'Asynchronous JS (Promises & Async/Await) ⏱️',
        slug: 'js-async',
        shortDescription: 'Handle asynchronous operations without freezing your application.',
        content: `JavaScript is single-threaded, meaning it can only do one thing at a time. So what happens if you need to fetch data from a server that takes 3 seconds? You don't want the whole app to freeze!\n\n**Promises** are like a restaurant buzzer. You place your order (request data), get a buzzer (Promise), and you can keep doing other things. When the data is ready, the buzzer goes off!\n\n**Async/Await** is just a cleaner, easier way to read Promises so your asynchronous code looks like normal, top-to-bottom synchronous code.`,
        codeSnippet: `// ⏱️ Using Async / Await to handle a Promise\nasync function fetchUserProfile() {\n  try {\n    console.log("Fetching user...");\n    \n    // The code "pauses" here until the data arrives\n    const response = await fetch("https://api.example.com/user");\n    const data = await response.json();\n    \n    console.log("Data received!", data);\n  } catch (error) {\n    // If the server crashes, we catch the error here\n    console.error("Oops!", error);\n  }\n}`,
        codeLanguage: 'javascript',
        order: 5, estimatedMinutes: 25, isPublished: true, createdBy: admin._id
      }
    );
  }

  // ================= REACT TOPICS (5) =================
  if (reactCourse) {
    allTopics.push(
      {
        course: reactCourse._id,
        title: 'Introduction to JSX 🎨',
        slug: 'intro-to-jsx', // MAPPED TO VISUALIZER
        shortDescription: 'JSX is a magical syntax that lets you write HTML directly inside your JavaScript code!',
        content: `React makes building user interfaces incredibly easy using something called **JSX**. 🎨\n\n**What is JSX?**\nIt looks exactly like HTML, but it lives inside your JavaScript files. It allows you to build your UI structure and add JS logic in the exact same place!\n\n**The Golden Rules of JSX:**\n1. **Return a single parent element:** A component can't return multiple sibling elements without a parent wrapping them.\n2. **Close all tags:** Unlike HTML, every tag in JSX must be closed (e.g., \`<img />\`).\n3. **camelCase properties:** Attributes like \`class\` become \`className\`, and \`onclick\` becomes \`onClick\`.\n4. **Use curly braces \`{}\` for JS:** Want to inject a JavaScript variable into your HTML? Just wrap it in curly braces!\n\n👇 **Check out the interactive Visualizer below to see how JSX transforms!**`,
        codeSnippet: `// A simple React Component using JSX\nfunction WelcomeProfile() {\n  const userName = "Alex";\n  const unreadMessages = 3;\n\n  return (\n    // 1. Single parent wrapper\n    <div className="profile-card"> \n      \n      {/* 2. Injecting JS variables with {} */}\n      <h1>Welcome back, {userName}! 👋</h1>\n      \n      {/* 3. Conditional rendering inside JSX */}\n      {unreadMessages > 0 ? (\n        <p>You have {unreadMessages} new messages.</p>\n      ) : (\n        <p>You are all caught up!</p>\n      )}\n\n      {/* 4. Self-closing tags are mandatory */}\n      <img src="/avatar.png" alt="Profile pic" />\n    </div>\n  );\n}`,
        codeLanguage: 'jsx',
        order: 1, estimatedMinutes: 15, isPublished: true, createdBy: admin._id
      },
      {
        course: reactCourse._id,
        title: 'Components & Props 🧩',
        slug: 'components-and-props', // MAPPED TO VISUALIZER
        shortDescription: 'Build reusable UI blocks (Components) and pass custom data to them (Props).',
        content: `Think of a React app like a Lego castle. The castle isn't just one giant piece of plastic; it's made up of hundreds of tiny, reusable Lego blocks. 🧩\n\n**Components (The Lego Blocks)**\nA component is just a JS function that returns UI. Instead of writing the same button HTML 50 times, you build a \`<Button />\` component once, and reuse it everywhere!\n\n**Props (Customizing the Blocks)**\nWhat if you want one button to say "Login" and another to say "Sign Up"? You use **Props** (Properties)! Props allow a Parent component to pass data down to a Child component. \n\n*Props are read-only! A child component is never allowed to modify the props it receives.*\n\n👇 **Interact with the Component Visualizer below to see data flow in action!**`,
        codeSnippet: `// 👶 CHILD COMPONENT: Receives 'props'\nfunction CustomButton(props) {\n  return (\n    <button className={props.color}>\n      {props.text}\n    </button>\n  );\n}\n\n// 👩 PARENT COMPONENT: Uses the child multiple times with different props!\nfunction App() {\n  return (\n    <div>\n      <h2>Please select an option:</h2>\n      \n      {/* Reusing the same component, but making it look different! */}\n      <CustomButton text="Log In" color="blue" />\n      <CustomButton text="Sign Up" color="green" />\n      <CustomButton text="Cancel" color="red" />\n    </div>\n  );\n}`,
        codeLanguage: 'jsx',
        order: 2, estimatedMinutes: 20, isPublished: true, createdBy: admin._id
      },
      {
        course: reactCourse._id,
        title: 'The useState Hook ⚡',
        slug: 'use-state-hook', // MAPPED TO VISUALIZER
        shortDescription: 'useState gives your components a memory, allowing them to react to user interactions.',
        content: `Standard variables in React do not trigger screen updates. If you change a normal \`let\` variable, React doesn't care.\n\nIf you want the screen to visually update when data changes (like clicking a counter or typing in an input), you MUST use **State**! ⚡\n\n**How \`useState\` works:**\nWhen you call \`useState\`, it gives you an array with two things:\n1. **The current value:** (e.g., \`count\`)\n2. **A magic setter function:** (e.g., \`setCount\`). When you use this function to change the value, React instantly re-renders the screen to show the new data!\n\n👇 **Play with the State Visualizer below to see how React re-renders the UI!**`,
        codeSnippet: `import { useState } from "react";\n\nfunction LikeButton() {\n  // 1. Create state. Initial value is 0.\n  const [likes, setLikes] = useState(0);\n\n  const handleLike = () => {\n    // 2. ALWAYS use the setter function to update state!\n    // React sees this and instantly re-renders the screen.\n    setLikes(likes + 1);\n  };\n\n  return (\n    <div className="post">\n      <h3>Cute Cat Picture 🐱</h3>\n      <p>This post has {likes} likes.</p>\n      \n      {/* 3. Attach the event listener to the button */}\n      <button onClick={handleLike}>\n        👍 Like\n      </button>\n    </div>\n  );\n}`,
        codeLanguage: 'jsx',
        order: 3, estimatedMinutes: 20, isPublished: true, createdBy: admin._id
      },
      {
        course: reactCourse._id,
        title: 'The useEffect Hook 🔄',
        slug: 'react-use-effect',
        shortDescription: 'Handle side effects like data fetching, subscriptions, and timers.',
        content: `While \`useState\` handles data that changes based on user clicks, \`useEffect\` handles things that happen *automatically* in the background, like fetching data from a database when the page loads.\n\n**The Dependency Array \`[]\`**\nThe second argument to \`useEffect\` is an array that controls WHEN the effect runs:\n- **No array**: Runs after *every* single render (Warning: Can cause infinite loops!).\n- **Empty array \`[]\`**: Runs exactly *once* when the component first appears.\n- **Array with variables \`[userId]\`**: Runs whenever the \`userId\` changes.`,
        codeSnippet: `import { useEffect, useState } from "react";\n\nfunction DataFetcher() {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  \n  useEffect(() => {\n    // This will run exactly once when the component mounts!\n    fetch("/api/data")\n      .then(res => res.json())\n      .then(data => {\n         setData(data);\n         setLoading(false);\n      });\n  }, []); // <-- The empty dependency array is crucial here!\n  \n  if (loading) return <p>Loading...</p>;\n  return <div>{data.message}</div>;\n}`,
        codeLanguage: 'jsx',
        order: 4, estimatedMinutes: 25, isPublished: true, createdBy: admin._id
      },
      {
        course: reactCourse._id,
        title: 'Context API 🌍',
        slug: 'react-context-api',
        shortDescription: 'Manage global state without prop drilling.',
        content: `Sometimes you have data (like a User Profile or a Dark Mode Theme) that almost every component in your app needs to know about. \n\nInstead of passing that data down through props 10 levels deep (called "Prop Drilling"), React gives us the **Context API**. \n\nContext acts like a global speaker system. You broadcast the data at the top, and any component anywhere in the app can just "tune in" to listen to it!`,
        codeSnippet: `import { createContext, useContext } from "react";\n\n// 1. Create the Context (The Radio Station)\nconst ThemeContext = createContext("light");\n\nfunction App() {\n  return (\n    // 2. Wrap your app in the Provider (The Broadcaster)\n    <ThemeContext.Provider value="dark">\n      <Toolbar />\n    </ThemeContext.Provider>\n  );\n}\n\nfunction Toolbar() {\n  // 3. Consume the context anywhere! (The Listener)\n  const theme = useContext(ThemeContext);\n  return <div>Current theme: {theme}</div>;\n}`,
        codeLanguage: 'jsx',
        order: 5, estimatedMinutes: 30, isPublished: true, createdBy: admin._id
      }
    );
  }

  // ================= NODE & EXPRESS TOPICS (5) =================
  if (nodeCourse) {
    allTopics.push(
      {
        course: nodeCourse._id,
        title: 'How Node.js Works ⚙️',
        slug: 'how-nodejs-works', // MAPPED TO VISUALIZER
        shortDescription: 'Understand the magic behind Node.js: The Event Loop and Non-Blocking I/O.',
        content: `Node.js is incredibly fast and powers massive apps like Netflix and Uber. But how does it handle millions of requests on a single thread? ⚙️\n\n**The Waiter Analogy 🍽️**\nTraditional servers are like restaurants where a waiter (a thread) takes your order, walks to the kitchen, and **stands there doing absolutely nothing** until your food is ready. Then they bring it to you. If 100 people arrive, you need 100 waiters.\n\n**Node.js is different!** It has only **one** super-fast waiter. \nThis waiter takes your order, hands it to the kitchen, and IMMEDIATELY goes to the next table to take their order. When the kitchen finishes your food, they ring a bell (an **Event**), and the waiter drops it off.\n\nThis is called **Non-Blocking, Event-Driven I/O**.\n\n👇 **Watch the Node.js Architecture Visualizer below to see the Event Loop in action!**`,
        codeSnippet: `const fs = require('fs');\n\nconsole.log("1. Waiter takes table 1's order.");\n\n// ⏱️ Non-Blocking Operation (Handed to the kitchen)\nfs.readFile('large-file.txt', 'utf8', (err, data) => {\n  // This callback runs when the kitchen rings the bell!\n  console.log("3. Kitchen is done! Waiter delivers table 1's food.");\n});\n\nconsole.log("2. Waiter IMMEDIATELY goes to take table 2's order.");\n\n// Console Output:\n// 1. Waiter takes table 1's order.\n// 2. Waiter IMMEDIATELY goes to take table 2's order.\n// 3. Kitchen is done! Waiter delivers table 1's food.`,
        codeLanguage: 'javascript',
        order: 1, estimatedMinutes: 20, isPublished: true, createdBy: admin._id
      },
      {
        course: nodeCourse._id,
        title: 'Building REST APIs with Express 🌐',
        slug: 'rest-api-express', // MAPPED TO VISUALIZER
        shortDescription: 'Express.js makes setting up a backend server and handling HTTP requests incredibly easy.',
        content: `Node.js by itself is great, but setting up web servers from scratch is tedious. **Express.js** is a fast, minimalist framework that makes building APIs a breeze. 🌐\n\n**What is a REST API?**\nAn API is simply a bridge that allows two applications to talk to each other. Your React frontend asks for data, and your Express backend responds with it.\n\n**The 4 main HTTP Methods (CRUD):**\n- **GET** (Read): "Give me the user profile."\n- **POST** (Create): "Save this new user to the database."\n- **PUT** (Update): "Update this user's email address."\n- **DELETE** (Delete): "Remove this user."\n\n👇 **Play with the Express Request Pipeline Visualizer below!**`,
        codeSnippet: `import express from 'express';\nconst app = express();\n\n// Middleware to automatically parse incoming JSON data\napp.use(express.json());\n\n// 🟢 GET Request: Sending data back to the frontend\napp.get('/api/greeting', (req, res) => {\n  res.status(200).json({ \n    message: "Hello from the Express server!" \n  });\n});\n\n// 🟡 POST Request: Receiving data from the frontend\napp.post('/api/users', (req, res) => {\n  const newUser = req.body; // Extract data sent by frontend\n  \n  // (In a real app, you'd save it to a database here)\n  \n  res.status(201).json({ \n    message: "User created successfully!", \n    user: newUser \n  });\n});\n\n// Start the server\napp.listen(5000, () => {\n  console.log("🚀 Server running on http://localhost:5000");\n});`,
        codeLanguage: 'javascript',
        order: 2, estimatedMinutes: 25, isPublished: true, createdBy: admin._id
      },
      {
        course: nodeCourse._id,
        title: 'Express Middleware 🛡️',
        slug: 'node-middleware',
        shortDescription: 'Intercept requests before they reach your route handlers.',
        content: `Middleware are functions that run right in the middle of a request, before it reaches your final route handler. 🛡️\n\nThink of middleware as bouncers or ticket checkers at a concert. Before you are allowed into the main area (your route), the bouncer checks your ticket. If your ticket is fake, the bouncer kicks you out and you never reach the stage!\n\n**Common uses for Middleware:**\n- Authentication (checking if the user is logged in)\n- Logging requests to the console\n- Handling CORS (Cross-Origin Resource Sharing)`,
        codeSnippet: `// 🛡️ A custom Middleware function\nconst verifyTicket = (req, res, next) => {\n  if (req.headers.authorization === "VALID_TICKET") {\n    next(); // Pass control to the actual route\n  } else {\n    res.status(401).json({ error: "Access Denied! Fake ticket." });\n  }\n};\n\n// Applying the middleware to a specific route\napp.get('/api/vip-lounge', verifyTicket, (req, res) => {\n  // If we reach this point, the middleware called next()!\n  res.json({ message: "Welcome to the VIP Lounge!" });\n});`,
        codeLanguage: 'javascript',
        order: 3, estimatedMinutes: 20, isPublished: true, createdBy: admin._id
      },
      {
        course: nodeCourse._id,
        title: 'Connecting to MongoDB with Mongoose 🍃',
        slug: 'node-mongoose',
        shortDescription: 'Model your application data elegantly and securely.',
        content: `MongoDB is a NoSQL database that stores data as JSON-like documents. It pairs beautifully with Node.js! 🍃\n\n**Mongoose** is an incredibly popular library that acts as a translator between your Express server and your MongoDB database.\n\nIt allows you to create **Schemas**. A Schema is like a blueprint for your data, enforcing rules (like "the age must be a number" or "the email must be unique").`,
        codeSnippet: `import mongoose from "mongoose";\n\n// 1. Define the Blueprint (Schema)\nconst userSchema = new mongoose.Schema({\n  name: { type: String, required: true },\n  email: { type: String, unique: true },\n  age: Number\n});\n\n// 2. Create the Model\nconst User = mongoose.model("User", userSchema);\n\n// 3. Connect to DB and Save a new User!\nawait mongoose.connect(process.env.MONGO_URI);\n\nconst newUser = await User.create({\n  name: "Alice Wonderland",\n  email: "alice@example.com",\n  age: 28\n});`,
        codeLanguage: 'javascript',
        order: 4, estimatedMinutes: 30, isPublished: true, createdBy: admin._id
      },
      {
        course: nodeCourse._id,
        title: 'JWT Authentication 🔐',
        slug: 'node-jwt',
        shortDescription: 'Secure your APIs with JSON Web Tokens.',
        content: `How do you know if a user making a request is actually logged in? You give them a digital ID card when they log in! 🔐\n\nA **JSON Web Token (JWT)** is basically an encrypted string that acts as an ID card. \n\nWhen a user logs in, the server generates a JWT and sends it to the client. The client saves it and attaches it to the headers of every future request. The server's middleware checks the token, verifies it hasn't been tampered with, and lets the user in!`,
        codeSnippet: `import jwt from "jsonwebtoken";\n\n// 1. Generate a token when user logs in\nconst generateToken = (userId) => {\n  return jwt.sign({ id: userId }, "MY_SECRET_KEY", { expiresIn: "1d" });\n};\n\n// 2. Verify token middleware for protected routes\nconst protect = (req, res, next) => {\n  const token = req.headers.authorization?.split(" ")[1];\n  if (!token) return res.status(401).json({ error: "No token provided" });\n\n  try {\n    const decoded = jwt.verify(token, "MY_SECRET_KEY");\n    req.user = decoded; // Attach user ID to request\n    next();\n  } catch (error) {\n    res.status(401).json({ error: "Invalid token" });\n  }\n};`,
        codeLanguage: 'javascript',
        order: 5, estimatedMinutes: 35, isPublished: true, createdBy: admin._id
      }
    );
  }

  // ================= DSA TOPICS (5) =================
  if (dsaCourse) {
    allTopics.push(
      {
        course: dsaCourse._id,
        title: 'Arrays — The Foundation 🧱',
        slug: 'arrays-foundation', // MAPPED TO VISUALIZER
        shortDescription: 'Arrays are the most fundamental data structure. Understand memory layout and the Two Pointers technique.',
        content: `An **Array** is a collection of items stored in a straight line inside the computer's memory. 🧱\n\nBecause they are stored tightly together in a sequence, accessing any item by its index (like \`arr[3]\`) is lightning fast! However, if you want to insert a new item at the very beginning of the array, the computer has to physically push every single other item to the right to make room, which is very slow.\n\n**The Two Pointers Technique:**\nA common trick to solve array problems in coding interviews is to use "Two Pointers". You place one tracker at the beginning, and one at the end, and move them towards the middle to find pairs or reverse arrays efficiently!\n\n👇 **Interact with the Array Visualizer below to see how elements shift in memory!**`,
        codeSnippet: `// 💡 Array Reversal using Two Pointers (O(n) time, O(1) space)\nfunction reverseArray(arr) {\n  let left = 0;                  // Pointer at the start\n  let right = arr.length - 1;    // Pointer at the end\n  \n  while (left < right) {\n    // Swap the elements\n    let temp = arr[left];\n    arr[left] = arr[right];\n    arr[right] = temp;\n    \n    // Move pointers towards the middle\n    left++;\n    right--;\n  }\n  \n  return arr;\n}\n\nconsole.log(reverseArray([1, 2, 3, 4, 5])); \n// Output: [5, 4, 3, 2, 1]`,
        codeLanguage: 'javascript',
        order: 1, estimatedMinutes: 30, isPublished: true, createdBy: admin._id
      },
      {
        course: dsaCourse._id,
        title: 'Linked Lists 🔗',
        slug: 'linked-lists', // MAPPED TO VISUALIZER
        shortDescription: 'A sequence of nodes scattered in memory, where each node points to the next one like a treasure map.',
        content: `Unlike Arrays, **Linked Lists** are NOT stored together in a straight line. They can be scattered anywhere in the computer's memory! 🔗\n\n**How do they stay connected?**\nEvery item in a Linked List is called a **Node**. A Node contains two things:\n1. The actual data (like the number 5).\n2. A pointer (a memory address) that says "The next piece of data is located over *there*."\n\nIt's like a treasure hunt. You start at the head, and each clue tells you where to find the next box!\n\n**Why use them?**\nBecause they aren't forced into a straight line, inserting a new item at the beginning is instant! You just create a new Node and point it to the old start. No shifting required!\n\n👇 **Check out the Linked List Visualizer below to see pointers in action!**`,
        codeSnippet: `// 1. Defining what a single "Node" looks like\nclass Node {\n  constructor(data) {\n    this.data = data; // The value\n    this.next = null; // The pointer to the next node\n  }\n}\n\n// 2. Creating scattered nodes\nlet head = new Node("Alice");\nlet secondNode = new Node("Bob");\nlet thirdNode = new Node("Charlie");\n\n// 3. Linking them together like a chain!\nhead.next = secondNode;\nsecondNode.next = thirdNode;\n\n// 4. Traversing (walking through) the list\nlet current = head;\nwhile (current !== null) {\n  console.log(current.data); // Prints Alice, then Bob, then Charlie\n  current = current.next;    // Jump to the next node using the pointer\n}`,
        codeLanguage: 'javascript',
        order: 2, estimatedMinutes: 40, isPublished: true, createdBy: admin._id
      },
      {
        course: dsaCourse._id,
        title: 'Stacks & Queues 🥞',
        slug: 'dsa-stacks-queues',
        shortDescription: 'LIFO vs FIFO logic structures.',
        content: `Stacks and Queues are simple rules for how data should be added and removed from a list. 🥞\n\n**Stack (LIFO: Last-In, First-Out)**\nThink of a stack of pancakes. You add a new pancake to the top of the pile. When you want to eat, you take the pancake off the TOP of the pile. The last one added is the first one removed! This is exactly how your browser's "Back" button works.\n\n**Queue (FIFO: First-In, First-Out)**\nThink of a line at a grocery store. The first person to get in line is the first person to be served. Data queues are used everywhere, like sending jobs to a printer!`,
        codeSnippet: `// 🥞 STACK IMPLEMENTATION (Using an Array)\nconst stack = [];\n\nstack.push("Pancake 1");\nstack.push("Pancake 2");\n\nconsole.log(stack.pop()); // Removes & prints "Pancake 2" (The top one!)\n\n// 🛒 QUEUE IMPLEMENTATION (Using an Array)\nconst queue = [];\n\nqueue.push("Alice");\nqueue.push("Bob");\n\nconsole.log(queue.shift()); // Removes & prints "Alice" (The first in line!)`,
        codeLanguage: 'javascript',
        order: 3, estimatedMinutes: 25, isPublished: true, createdBy: admin._id
      },
      {
        course: dsaCourse._id,
        title: 'Trees & Binary Search Trees 🌳',
        slug: 'dsa-trees',
        shortDescription: 'Hierarchical data structures optimized for lightning-fast lookups.',
        content: `Arrays and Linked Lists are linear (straight lines). Trees are hierarchical! 🌳\n\nYour computer's file system is a Tree. The root is the \`C:\\\` drive, and folders branch out from there.\n\n**Binary Search Trees (BST)**\nA BST is a special tree with a strict rule:\n1. Everything to the LEFT of a node must be SMALLER.\n2. Everything to the RIGHT of a node must be LARGER.\n\nBecause of this rule, searching for a number is incredibly fast (O(log n)). It's like finding a word in a dictionary by splitting it in half repeatedly!`,
        codeSnippet: `class TreeNode {\n  constructor(value) {\n    this.value = value;\n    this.left = null;  // Pointer to smaller child\n    this.right = null; // Pointer to larger child\n  }\n}\n\n// Searching a BST for a specific target\nfunction searchBST(root, target) {\n  if (root === null) return false;\n  if (root.value === target) return true;\n  \n  // If target is smaller, go left!\n  if (target < root.value) {\n    return searchBST(root.left, target);\n  }\n  \n  // If target is larger, go right!\n  return searchBST(root.right, target);\n}`,
        codeLanguage: 'javascript',
        order: 4, estimatedMinutes: 45, isPublished: true, createdBy: admin._id
      },
      {
        course: dsaCourse._id,
        title: 'Dynamic Programming Basics 🧠',
        slug: 'dsa-dp',
        shortDescription: 'Trading memory space for extreme execution speed.',
        content: `Dynamic Programming (DP) sounds scary, but it's really just **remembering the past so you don't repeat yourself**. 🧠\n\nImagine you calculate \`100 + 100 = 200\`. If someone asks you a minute later what \`100 + 100\` is, you don't calculate it again. You just remember the answer!\n\nIn programming, this is called **Memoization**. By storing the answers to expensive function calls in an object or array, you can turn a program that takes 10,000 years to run into a program that runs in 1 millisecond.`,
        codeSnippet: `// ❌ Slow Fibonacci (Calculates same things repeatedly)\nfunction fib(n) {\n  if (n <= 2) return 1;\n  return fib(n - 1) + fib(n - 2);\n}\n\n// ✅ Fast Fibonacci with Memoization (Dynamic Programming)\nfunction fastFib(n, memo = {}) {\n  // 1. Did we already calculate this? Just return the answer!\n  if (n in memo) return memo[n];\n  \n  // 2. Base cases\n  if (n <= 2) return 1;\n  \n  // 3. Calculate it ONCE and save it in the memo object\n  memo[n] = fastFib(n - 1, memo) + fastFib(n - 2, memo);\n  return memo[n];\n}\n\nconsole.log(fastFib(50)); // Instantly returns 12586269025`,
        codeLanguage: 'javascript',
        order: 5, estimatedMinutes: 50, isPublished: true, createdBy: admin._id
      }
    );
  }

  await CourseTopic.insertMany(allTopics);

  console.log(`Successfully seeded ${allTopics.length} comprehensive topics with visualizers!`);
  process.exit(0);
};

run().catch(console.error);
