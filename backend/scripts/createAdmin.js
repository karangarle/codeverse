import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import connectDB from "../config/db.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    // Default admin credentials (feel free to change these)
    const adminName = "System Admin";
    const adminEmail = "admin@codeverse.com";
    const adminPassword = "AdminPassword123";

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log(`\n[!] Admin user with email "${adminEmail}" already exists.`);
      process.exit(0);
    }

    const admin = new User({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: "admin",
    });

    // Password will be hashed automatically by the pre-save hook in User.js
    await admin.save();

    console.log("\n=========================================");
    console.log("🎉 Admin user created successfully!");
    console.log(`Name:     ${adminName}`);
    console.log(`Email:    ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    console.log("=========================================");
    
    process.exit(0);
  } catch (error) {
    console.error("\n[X] Error creating admin user:", error.message);
    process.exit(1);
  }
};

createAdmin();
