import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("❌ Fatal: MONGO_URI environment variable is not defined.");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
      maxPoolSize: 10, // AWS production pool sizing
    });

    console.log(`✅ MongoDB connected successfully: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    console.log("👉 Please verify your network access (IP whitelist 0.0.0.0/0 on MongoDB Atlas).");
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
  }
};

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB disconnected. Attempting to reconnect...");
});

mongoose.connection.on("reconnected", () => {
  console.log("🔄 MongoDB reconnected successfully.");
});

export default connectDB;
