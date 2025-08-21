import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "./model/user.model.js";

dotenv.config();
console.log("MONGODB_URL:", process.env.MONGODB_URL); // ✅ Debug log

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    const hashedPassword = await bcrypt.hash("Durgesh@2005", 10);

    const adminUser = new User({
      name: "Durgesh Thakur",
      email: "tdurgesh664@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    await adminUser.save();
    console.log("✅ Admin user created successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();
