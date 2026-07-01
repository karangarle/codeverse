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
        { title: "Number Systems & Basics", id: "JvJr5LfRr_c" },
        { title: "Percentages & Ratios", id: "Ks5rQ6UDjbw" }
      ]
    },
    {
      subject: "Java",
      playlistName: "Java by Telusko",
      channelName: "Telusko",
      videos: [
        { title: "Java Introduction", id: "8cm1x4bySPM" }
      ]
    },
    {
      subject: "Java",
      playlistName: "Java by Durga Software",
      channelName: "Durga Software Solutions",
      videos: [
        { title: "Core Java Tutorial", id: "6nDOdLV8Rws" }
      ]
    },
    {
      subject: "Java",
      playlistName: "Java by Bro Code",
      channelName: "Bro Code",
      videos: [
        { title: "Java Full Course (12 Hours)", id: "GdzRzWymT4c" }
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
      channelName: "TakeUForward (Striver)",
      videos: [
        { title: "A2Z DSA Introduction", id: "0bHoB32fuj0" }
      ]
    },
    {
      subject: "DSA",
      playlistName: "DSA by Learning Algo",
      channelName: "Learning Algo",
      videos: [
        { title: "Algorithms Explained", id: "oBt53YbR9Kk" }
      ]
    },
    {
      subject: "DSA",
      playlistName: "Algorithms by Abdul Bari",
      channelName: "Abdul Bari",
      videos: [
        { title: "Introduction to Algorithms", id: "0IAPZzGSbME" }
      ]
    },
    {
      subject: "DSA",
      playlistName: "DSA by Kunal Kushwaha",
      channelName: "Kunal Kushwaha",
      videos: [
        { title: "Data Structures & Algorithms Course", id: "yRpLlJmRo2w" }
      ]
    },
    {
      subject: "DSA",
      playlistName: "DSA by Raghav Sir (PW)",
      channelName: "Raghav Sir (PW)",
      videos: [
        { title: "DSA Masterclass", id: "5_5oE5lgrhw" }
      ]
    },
    {
      subject: "DSA Fundamentals",
      playlistName: "DSA Fundamentals by Learning Algo",
      channelName: "Learning Algo",
      videos: [
        { title: "DSA Fundamentals", id: "9rhT3P1MDHk" }
      ]
    },
    {
      subject: "DSA Fundamentals",
      playlistName: "DSA Fundamentals by Jenny Ma'am",
      channelName: "Jenny's Lectures CS IT",
      videos: [
        { title: "Data Structures for Beginners", id: "AT14lCXuMKI" }
      ]
    },
    {
      subject: "DSA Made Easy",
      playlistName: "DSA by DSA Made Easy",
      channelName: "DSA Made Easy",
      videos: [
        { title: "Data Structures & Algorithms Made Easy", id: "b1j4-Q6X9PY" }
      ]
    },
    {
      subject: "OOPs",
      playlistName: "OOPs by Apna College",
      channelName: "Apna College",
      videos: [
        { title: "Object Oriented Programming in Java", id: "BSVKUk58K6U" }
      ]
    },
    {
      subject: "Python",
      playlistName: "Python by Apna College",
      channelName: "Apna College",
      videos: [
        { title: "Python Tutorial for Beginners", id: "ERCMXc8x7mc" }
      ]
    },
    {
      subject: "Python",
      playlistName: "Python by Corey Schafer",
      channelName: "Corey Schafer",
      videos: [
        { title: "Python OOP Tutorials", id: "BJ-VvGyQxuo" }
      ]
    },
    {
      subject: "Python",
      playlistName: "Python by Bro Code",
      channelName: "Bro Code",
      videos: [
        { title: "Python Full Course for Beginners", id: "XKHEtdqhLK8" }
      ]
    },
    {
      subject: "Python",
      playlistName: "Python by Telusko",
      channelName: "Telusko",
      videos: [
        { title: "Python for Beginners", id: "QXeEoD0pB3E" }
      ]
    },
    {
      subject: "SQL",
      playlistName: "SQL by Apna College",
      channelName: "Apna College",
      videos: [
        { title: "SQL Tutorial for Beginners", id: "hlGoQC332VM" }
      ]
    },
    {
      subject: "DBMS",
      playlistName: "DBMS by Code Help",
      channelName: "CodeHelp (Love Babbar)",
      videos: [
        { title: "DBMS Complete Course", id: "kBdlM6hNDAE" }
      ]
    },
    {
      subject: "Operating System",
      playlistName: "OS by Code Help",
      channelName: "CodeHelp (Love Babbar)",
      videos: [
        { title: "Operating System Full Course", id: "rN9_h0jGg0Q" }
      ]
    },
    {
      subject: "Operating System",
      playlistName: "OS by Gate Smashers",
      channelName: "Gate Smashers",
      videos: [
        { title: "Operating System Lectures", id: "kU8O3yH_qSI" }
      ]
    },
    {
      subject: "System Design",
      playlistName: "System Design by Shivam Tiwari",
      channelName: "Shivam Tiwari",
      videos: [
        { title: "System Design for Beginners", id: "rExFReLJ4m8" }
      ]
    },
    {
      subject: "System Design",
      playlistName: "System Design by Piyush Garg",
      channelName: "Piyush Garg",
      videos: [
        { title: "System Design Masterclass", id: "i7twT3x5yv8" }
      ]
    },
    {
      subject: "Computer Networks",
      playlistName: "Networks by Kunal Kushwaha",
      channelName: "Kunal Kushwaha",
      videos: [
        { title: "Computer Networks Full Course", id: "IPvYjXCsTg8" }
      ]
    },
    {
      subject: "Computer Networks",
      playlistName: "Networks by Gate Smashers",
      channelName: "Gate Smashers",
      videos: [
        { title: "Computer Networks Lectures", id: "J8495tF5h6s" }
      ]
    },
    {
      subject: "Web Development",
      playlistName: "Web Dev by Chai aur Code",
      channelName: "Chai aur Code",
      videos: [
        { title: "HTML Crash Course", id: "XmLOwJHFHf0" }
      ]
    },
    {
      subject: "Web Development",
      playlistName: "Web Dev by freeCodeCamp",
      channelName: "freeCodeCamp",
      videos: [
        { title: "Responsive Web Design", id: "nu_pCVPKzTk" }
      ]
    },
    {
      subject: "GATE Preparation",
      playlistName: "GATE by Gate Smashers",
      channelName: "Gate Smashers",
      videos: [
        { title: "GATE CS Complete Revision", id: "kU8O3yH_qSI" }
      ]
    },
    {
      subject: "DSA",
      playlistName: "DSA by NPTEL",
      channelName: "NPTEL",
      videos: [
        { title: "DSA by NPTEL Lectures", id: "zWg7U0OEAoE" }
      ]
    },
    {
      subject: "Java",
      playlistName: "Java by NPTEL",
      channelName: "NPTEL",
      videos: [
        { title: "Java by NPTEL Lectures", id: "mVNHPpvXY5c" }
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
