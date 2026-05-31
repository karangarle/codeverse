import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri || mongoUri === "your_mongodb_connection_string") {
      throw new Error(
        "Please set MONGODB_URI in backend/.env to a valid MongoDB connection string"
      );
    }

    await mongoose.connect(mongoUri);

    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
