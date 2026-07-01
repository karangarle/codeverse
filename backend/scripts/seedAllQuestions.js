import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { interviewQuestions } from './questionsData.js';
import InterviewQuestion from '../models/InterviewQuestion.js';
import connectDB from '../config/db.js';

dotenv.config();

const run = async () => {
  await connectDB();
  
  // Clear the collection to ensure no duplicate entries
  await InterviewQuestion.deleteMany({});

  await InterviewQuestion.insertMany(interviewQuestions);

  console.log(`Successfully seeded ${interviewQuestions.length} total curated MERN interview questions covering both fresher and experienced levels!`);
  process.exit(0);
};

run().catch(console.error);
