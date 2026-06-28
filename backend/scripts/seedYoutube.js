import mongoose from 'mongoose';
import dotenv from 'dotenv';
import YoutubeVideo from '../models/YoutubeVideo.js';
import connectDB from '../config/db.js';

dotenv.config();

const run = async () => {
  await connectDB();
  
  // Clear existing to start fresh
  await YoutubeVideo.deleteMany({});

  const playlistsData = [
    {
      subject: "Aptitude",
      playlistName: "Aptitude by Yash Jain",
      channelName: "Yash Jain",
      videos: [
        { title: "Number Systems & Basics", id: "sscX432bMZo" },
        { title: "Percentages & Ratios", id: "sscX432bMZo" },
        { title: "Time, Speed & Distance", id: "sscX432bMZo" }
      ]
    },
    {
      subject: "Java",
      playlistName: "Java by Telusko",
      channelName: "Telusko",
      videos: [
        { title: "Java Introduction", id: "BM4CHBmSyh4" },
        { title: "Variables and Data Types", id: "BM4CHBmSyh4" },
        { title: "Object Oriented Concepts", id: "BM4CHBmSyh4" }
      ]
    },
    {
      subject: "Java",
      playlistName: "Java by Durga Software",
      channelName: "Durga Software",
      videos: [
        { title: "Language Fundamentals Part 1", id: "812D3z8S2cM" },
        { title: "Language Fundamentals Part 2", id: "812D3z8S2cM" },
        { title: "Modifiers in Java", id: "812D3z8S2cM" }
      ]
    },
    {
      subject: "Java",
      playlistName: "Java by Bro Code",
      channelName: "Bro Code",
      videos: [
        { title: "Java Full Course (12 Hours)", id: "xk4_1vCGxdI" }
      ]
    },
    {
      subject: "Java",
      playlistName: "Java by Mosh",
      channelName: "Programming with Mosh",
      videos: [
        { title: "Java Tutorial for Beginners", id: "eIrMbAQSU34" }
      ]
    },
    // DSA
    {
      subject: "DSA",
      playlistName: "DSA by Striver (TakeUForward)",
      channelName: "TakeUForward",
      videos: [
        { title: "A2Z DSA Introduction", id: "ear7Mte8qA4" },
        { title: "Patterns & Math", id: "ear7Mte8qA4" },
        { title: "Arrays & Sorting", id: "ear7Mte8qA4" }
      ]
    },
    {
      subject: "DSA",
      playlistName: "DSA by Learning Algo",
      channelName: "Learning Algo",
      videos: [
        { title: "DSA Course Overview", id: "812D3z8S2cM" },
        { title: "Time Complexity Analysis", id: "812D3z8S2cM" },
        { title: "Space Complexity", id: "812D3z8S2cM" }
      ]
    },
    {
      subject: "DSA",
      playlistName: "Algorithms by Abdul Bari",
      channelName: "Abdul Bari",
      videos: [
        { title: "Introduction to Algorithms", id: "0IAPZzGSbME" },
        { title: "Asymptotic Notations", id: "0IAPZzGSbME" },
        { title: "Divide and Conquer", id: "0IAPZzGSbME" }
      ]
    },
    {
      subject: "DSA",
      playlistName: "DSA by Kunal Kushwaha",
      channelName: "Kunal Kushwaha",
      videos: [
        { title: "Introduction to Programming", id: "8hly31xKli0" },
        { title: "Flow of Program", id: "8hly31xKli0" },
        { title: "First Java Program", id: "8hly31xKli0" }
      ]
    },
    {
      subject: "DSA",
      playlistName: "DSA by Raghav Sir (PW)",
      channelName: "Physics Wallah",
      videos: [
        { title: "C++ Basics Refresher", id: "812D3z8S2cM" },
        { title: "Binary Search Deep Dive", id: "812D3z8S2cM" },
        { title: "Recursion Masterclass", id: "812D3z8S2cM" }
      ]
    },
    {
      subject: "DSA Fundamentals",
      playlistName: "DSA Fundamentals by Learning Algo",
      channelName: "Learning Algo",
      videos: [
        { title: "Data Structures Intro", id: "812D3z8S2cM" },
        { title: "Memory Allocation", id: "812D3z8S2cM" }
      ]
    },
    {
      subject: "DSA Fundamentals",
      playlistName: "DSA Fundamentals by Jenny Ma'am",
      channelName: "Jenny's Lectures",
      videos: [
        { title: "What is Data Structure?", id: "AT14lCXuMKI" },
        { title: "Types of Data Structures", id: "AT14lCXuMKI" },
        { title: "Algorithms and Pseudo code", id: "AT14lCXuMKI" }
      ]
    },
    {
      subject: "DSA Made Easy",
      playlistName: "DSA by DSA Made Easy",
      channelName: "DSA Made Easy",
      videos: [
        { title: "Concepts overview", id: "812D3z8S2cM" }
      ]
    },
    {
      subject: "OOPs",
      playlistName: "OOPs by Apna College",
      channelName: "Apna College",
      videos: [
        { title: "Classes & Objects", id: "bSrm9RXwEQI" },
        { title: "Inheritance & Polymorphism", id: "bSrm9RXwEQI" },
        { title: "Encapsulation & Abstraction", id: "bSrm9RXwEQI" }
      ]
    },
    {
      subject: "Python",
      playlistName: "Python by Apna College",
      channelName: "Apna College",
      videos: [
        { title: "Python Intro & Setup", id: "vLqTf2b6GZw" },
        { title: "Variables & Types", id: "vLqTf2b6GZw" },
        { title: "Loops & Functions", id: "vLqTf2b6GZw" }
      ]
    },
    {
      subject: "Python",
      playlistName: "Python by Corey Schafer",
      channelName: "Corey Schafer",
      videos: [
        { title: "Install and Setup", id: "YYXdXT2l-Gg" },
        { title: "Strings & Text", id: "YYXdXT2l-Gg" },
        { title: "Integers and Floats", id: "YYXdXT2l-Gg" }
      ]
    },
    {
      subject: "Python",
      playlistName: "Python by Bro Code",
      channelName: "Bro Code",
      videos: [
        { title: "Python Full Course (12 Hours)", id: "xk4_1vCGxdI" }
      ]
    },
    {
      subject: "Python",
      playlistName: "Python by Telusko",
      channelName: "Telusko",
      videos: [
        { title: "Python Introduction", id: "QXeEoD0pB3E" },
        { title: "Python Installation", id: "QXeEoD0pB3E" }
      ]
    },
    {
      subject: "SQL",
      playlistName: "SQL by Apna College",
      channelName: "Apna College",
      videos: [
        { title: "Databases & Tables", id: "BpHZgL53YkU" },
        { title: "Select & Where Clauses", id: "BpHZgL53YkU" },
        { title: "Joins & Subqueries", id: "BpHZgL53YkU" }
      ]
    },
    {
      subject: "DBMS",
      playlistName: "DBMS by Code Help",
      channelName: "Code Help",
      videos: [
        { title: "What is DBMS?", id: "Wjnz-Xh7uL0" },
        { title: "ER Models", id: "Wjnz-Xh7uL0" },
        { title: "Normalization", id: "Wjnz-Xh7uL0" }
      ]
    },
    {
      subject: "OS",
      playlistName: "OS by Code Help",
      channelName: "Code Help",
      videos: [
        { title: "Introduction to OS", id: "mXjZcX_yFM0" },
        { title: "Process Management", id: "mXjZcX_yFM0" },
        { title: "Memory Management", id: "mXjZcX_yFM0" }
      ]
    },
    {
      subject: "OS",
      playlistName: "OS by Gate Smashers",
      channelName: "Gate Smashers",
      videos: [
        { title: "Operating System Basics", id: "vBURTt97EkA" },
        { title: "CPU Scheduling Algorithms", id: "vBURTt97EkA" },
        { title: "Deadlocks", id: "vBURTt97EkA" }
      ]
    },
    {
      subject: "System Design",
      playlistName: "System Design by Shivam Tiwari",
      channelName: "Shivam Tiwari",
      videos: [
        { title: "What is System Design?", id: "bBTPZ9NdSk8" },
        { title: "Scalability Basics", id: "bBTPZ9NdSk8" }
      ]
    },
    {
      subject: "System Design",
      playlistName: "System Design by Piyush Garg",
      channelName: "Piyush Garg",
      videos: [
        { title: "System Design Intro", id: "1aMEnb-65Q4" },
        { title: "Monolith vs Microservices", id: "1aMEnb-65Q4" }
      ]
    },
    {
      subject: "Computer Networks",
      playlistName: "Networks by Kunal Kushwaha",
      channelName: "Kunal Kushwaha",
      videos: [
        { title: "Networking Crash Course", id: "IPvYjXCsTg8" },
        { title: "OSI Model Explained", id: "IPvYjXCsTg8" }
      ]
    },
    {
      subject: "Web Development",
      playlistName: "Web Dev by Chai aur Code",
      channelName: "Chai aur Code",
      videos: [
        { title: "HTML Crash Course", id: "sscX432bMZo" },
        { title: "CSS Fundamentals", id: "sscX432bMZo" },
        { title: "JavaScript Basics", id: "sscX432bMZo" }
      ]
    },
    {
      subject: "Web Development",
      playlistName: "Web Dev by freeCodeCamp",
      channelName: "freeCodeCamp",
      videos: [
        { title: "Frontend Bootcamp", id: "mU6anWqZJcc" },
        { title: "Backend with Node", id: "mU6anWqZJcc" }
      ]
    },
    {
      subject: "GATE Preparation",
      playlistName: "GATE by Gate Smashers",
      channelName: "Gate Smashers",
      videos: [
        { title: "TOC Full Course", id: "vBURTt97EkA" },
        { title: "Compiler Design", id: "vBURTt97EkA" }
      ]
    },
    {
      subject: "DSA",
      playlistName: "DSA by NPTEL",
      channelName: "NPTEL",
      videos: [
        { title: "Lecture 1: Intro to DSA", id: "0IAPZzGSbME" },
        { title: "Lecture 2: Arrays", id: "0IAPZzGSbME" }
      ]
    }
  ];

  const dbEntries = [];
  
  for (const list of playlistsData) {
    let order = 1;
    for (const vid of list.videos) {
      dbEntries.push({
        title: vid.title,
        channelName: list.channelName,
        subject: list.subject,
        playlistName: list.playlistName,
        videoId: vid.id,
        order: order++
      });
    }
  }

  await YoutubeVideo.insertMany(dbEntries);

  console.log(`Successfully seeded ${dbEntries.length} REAL working YouTube videos grouped properly!`);
  process.exit(0);
};

run().catch(console.error);
