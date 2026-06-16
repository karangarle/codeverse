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

    console.log("Cleaning database...");
    await Course.deleteMany({});
    await CourseTopic.deleteMany({});
    await Revision.deleteMany({});
    await InterviewQuestion.deleteMany({});
    await GitCommand.deleteMany({});
    await ResourcePdf.deleteMany({});
    await YoutubeVideo.deleteMany({});

    // Find or create admin to own the courses
    let admin = await User.findOne({ role: "admin" });
    if (!admin) {
      admin = new User({
        name: "System Admin",
        email: "admin@codeverse.com",
        password: "AdminPassword123",
        role: "admin",
      });
      await admin.save();
      console.log("Admin user created.");
    }

    console.log("Seeding Courses & Topics...");
    const courses = [
      {
        title: "React.js Essentials",
        slug: "react-js-essentials",
        description: "Master the fundamentals of React.js, including components, state, props, and hooks.",
        level: "beginner",
        language: "english",
        duration: 120,
        createdBy: admin._id,
        isPublished: true,
      },
      {
        title: "Node.js & Express Basics",
        slug: "node-js-express-basics",
        description: "Learn how to build scalable server-side applications and REST APIs using Node and Express.",
        level: "intermediate",
        language: "english",
        duration: 180,
        createdBy: admin._id,
        isPublished: true,
      },
    ];

    const seededCourses = await Course.insertMany(courses);

    const topics = [
      // React Topics
      {
        course: seededCourses[0]._id,
        title: "Introduction to JSX",
        slug: "intro-to-jsx",
        shortDescription: "Understand JSX syntax and how it compiles to React elements.",
        content: `JSX is a syntax extension for JavaScript that looks like HTML. It allows you to write UI structure in React components.
        
### Key Concepts:
1. **Expressions in JSX**: Wrap standard JS variables or function calls in curly braces \`{ }\`.
2. **Class to ClassName**: Use \`className\` instead of \`class\` for styling.
3. **Single Root Element**: All JSX must render a single wrapping root element or React Fragment \`<></>\`.
        `,
        videoUrl: "https://www.youtube.com/embed/cM2F5UquSsk",
        order: 1,
        estimatedMinutes: 15,
        isPublished: true,
        createdBy: admin._id,
      },
      {
        course: seededCourses[0]._id,
        title: "Components & Props",
        slug: "components-and-props",
        shortDescription: "Learn about functional components and passing data via props.",
        content: `Components are the building blocks of React applications. Props allow data to be passed down from parent to child components.
        
### Example:
\`\`\`jsx
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}
\`\`\`
Props are read-only (immutable).
        `,
        videoUrl: "https://www.youtube.com/embed/cM2F5UquSsk",
        order: 2,
        estimatedMinutes: 20,
        isPublished: true,
        createdBy: admin._id,
      },
      {
        course: seededCourses[0]._id,
        title: "State & useState Hook",
        slug: "state-and-usestate",
        shortDescription: "Manage component dynamic state using the useState hook.",
        content: `State allows React components to change their output over time in response to user actions, network responses, and everything else.
        
### Usage:
\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
\`\`\`
        `,
        videoUrl: "https://www.youtube.com/embed/cM2F5UquSsk",
        order: 3,
        estimatedMinutes: 25,
        isPublished: true,
        createdBy: admin._id,
      },

      // Node.js Topics
      {
        course: seededCourses[1]._id,
        title: "Introduction to Node.js",
        slug: "intro-to-node",
        shortDescription: "What is Node.js and how does the event loop work?",
        content: `Node.js is a JavaScript runtime built on Chrome's V8 engine. It uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.
        
### Key Aspects:
- Single-threaded event loop.
- Non-blocking asynchronous APIs.
- Perfect for real-time, data-intensive network applications.
        `,
        videoUrl: "https://www.youtube.com/embed/TlB_eWDSMt4",
        order: 1,
        estimatedMinutes: 20,
        isPublished: true,
        createdBy: admin._id,
      },
      {
        course: seededCourses[1]._id,
        title: "Creating an Express Server",
        slug: "creating-express-server",
        shortDescription: "Set up a basic HTTP server using Express.",
        content: `Express is a minimal and flexible Node.js web application framework.
        
### Standard Setup:
\`\`\`javascript
import express from 'express';
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello CodeVerse!');
});

app.listen(PORT, () => {
  console.log(\`Server is running on port \${PORT}\`);
});
\`\`\`
        `,
        videoUrl: "https://www.youtube.com/embed/TlB_eWDSMt4",
        order: 2,
        estimatedMinutes: 25,
        isPublished: true,
        createdBy: admin._id,
      },
    ];

    await CourseTopic.insertMany(topics);

    console.log("Seeding Revision Cards...");
    const revisions = [
      {
        title: "HTML Semantic Elements",
        category: "HTML",
        content: "Semantic elements clearly describe their meaning to both the browser and the developer (e.g. `<header>`, `<main>`, `<article>`, `<footer>`).",
        keyPoints: [
          "Improves SEO by helping search engine crawlers understand structure.",
          "Enhances accessibility (screen readers navigate better).",
          "Makes the code readable and easy to maintain.",
        ],
      },
      {
        title: "CSS Flexbox vs CSS Grid",
        category: "CSS",
        content: "Flexbox is designed for one-dimensional layouts (either a row or a column). CSS Grid is designed for two-dimensional layouts (both rows and columns simultaneously).",
        keyPoints: [
          "Use Flexbox for alignment and distributing space in a single line.",
          "Use CSS Grid for complex, overlapping, page-level grid structures.",
          "They can be used together in harmony.",
        ],
      },
      {
        title: "JavaScript Closures",
        category: "JavaScript",
        content: "A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). In other words, a closure gives an inner function access to the outer function's scope.",
        keyPoints: [
          "Allows data encapsulation (private variables).",
          "Created every time a function is created, at function creation time.",
          "Useful for factory functions and event handlers.",
        ],
      },
      {
        title: "React Virtual DOM",
        category: "React",
        content: "The virtual DOM (VDOM) is a programming concept where an ideal, or 'virtual', representation of a UI is kept in memory and synced with the 'real' DOM by a library such as ReactDOM (reconciliation).",
        keyPoints: [
          "Much faster than direct manipulation of the browser DOM.",
          "Updates only the changed nodes instead of rendering the whole tree.",
          "Enables declarative programming model.",
        ],
      },
      {
        title: "JWT Authentication Flow",
        category: "Node & Express",
        content: "JSON Web Tokens (JWT) are a stateless method to authenticate users. The client stores the token (usually in cookies or local storage) and sends it in the headers for authorized API calls.",
        keyPoints: [
          "Contains three parts: Header, Payload, Signature.",
          "Signed using a secret key on the server to prevent tampering.",
          "Stateless: the server does not need to store sessions in memory.",
        ],
      },
    ];
    await Revision.insertMany(revisions);

    console.log("Seeding Interview Questions...");
    const interviewQuestions = [
      {
        question: "What is the difference between let, const, and var in JavaScript?",
        answer: "`var` is function-scoped and undergoes hoisting with `undefined`. `let` and `const` are block-scoped and exist in a Temporal Dead Zone until initialized. `const` variables cannot be reassigned.",
        difficulty: "easy",
        category: "JavaScript",
      },
      {
        question: "Explain React lifecycle methods or hooks equivalent.",
        answer: "In class components, lifecycles are handled by `componentDidMount`, `componentDidUpdate`, etc. In functional components, `useEffect` hooks replace them. An empty dependency array runs code once on mount, returning a cleanup function acts as unmount.",
        difficulty: "medium",
        category: "React",
      },
      {
        question: "What is CORS and how do you handle it in Express?",
        answer: "Cross-Origin Resource Sharing (CORS) is a security mechanism enforced by browsers. In Express, you use the `cors` middleware to allow/configure cross-origin requests from specific domains.",
        difficulty: "medium",
        category: "Express",
      },
      {
        question: "How does MongoDB indexing improve query performance?",
        answer: "Indexes store a small portion of the collection's data set in an easy-to-traverse form (like B-trees). This avoids collection scans, enabling MongoDB to find documents using indexes much faster.",
        difficulty: "hard",
        category: "MongoDB",
      },
    ];
    await InterviewQuestion.insertMany(interviewQuestions);

    console.log("Seeding Git Commands...");
    const gitCommands = [
      {
        command: "git init",
        description: "Initialize a local Git repository in the current directory.",
        category: "Setup",
        example: "git init",
      },
      {
        command: "git clone <url>",
        description: "Clone a remote repository into a new local directory.",
        category: "Setup",
        example: "git clone https://github.com/user/repo.git",
      },
      {
        command: "git add .",
        description: "Stage all modified and new files for the next commit.",
        category: "Working Files",
        example: "git add .",
      },
      {
        command: "git commit -m '<message>'",
        description: "Record staged files in the version history with a descriptive message.",
        category: "Working Files",
        example: "git commit -m 'feat: add authentication controller'",
      },
      {
        command: "git checkout -b <branch-name>",
        description: "Create a new branch and switch to it immediately.",
        category: "Branches",
        example: "git checkout -b feature/user-profile",
      },
      {
        command: "git push <remote> <branch>",
        description: "Upload local branch commits to the remote repository.",
        category: "Remote",
        example: "git push origin main",
      },
    ];
    await GitCommand.insertMany(gitCommands);

    console.log("Seeding Resource PDFs...");
    const resourcePdfs = [
      {
        title: "HTML & CSS Cheat Sheet",
        description: "A quick reference guide for HTML tags, attributes, CSS properties, selectors, and flexbox.",
        pdfUrl: "https://www.w3.org/2002/08/xmlschema-guide.pdf", // Sample placeholder PDF
        category: "Frontend Essentials",
      },
      {
        title: "JavaScript ES6+ Cheat Sheet",
        description: "Modern JavaScript guide including arrow functions, template literals, destructuring, promises, and modules.",
        pdfUrl: "https://www.w3.org/2002/08/xmlschema-guide.pdf",
        category: "JavaScript",
      },
      {
        title: "MERN Stack Setup Blueprint",
        description: "A complete reference manual to configuring Express, Mongoose, Vite React, and environment variables.",
        pdfUrl: "https://www.w3.org/2002/08/xmlschema-guide.pdf",
        category: "Full Stack",
      },
    ];
    await ResourcePdf.insertMany(resourcePdfs);

    console.log("Seeding Youtube Videos...");
    const youtubeVideos = [
      {
        title: "HTML and CSS Full Course for Beginners",
        videoId: "E3T4H-T0pZ4",
        playlistName: "Web Development Foundations",
        order: 1,
      },
      {
        title: "JavaScript Tutorial for Beginners: Learn JavaScript in 1 Hour",
        videoId: "W6NZfCO5SIk",
        playlistName: "JavaScript Essentials",
        order: 1,
      },
      {
        title: "React JS Full Course for Beginners - 2026 Edition",
        videoId: "bMknfKXIFA8",
        playlistName: "React Mastery",
        order: 1,
      },
      {
        title: "Node.js and Express.js - Full Course",
        videoId: "Oe421EPjeBE",
        playlistName: "Backend Node/Express",
        order: 1,
      },
    ];
    await YoutubeVideo.insertMany(youtubeVideos);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
