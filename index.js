import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 5000;

// Initialize Database then start Server
const startServer = async () => {
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(` Doctor-B Backend running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    console.log(` Health check ready at http://localhost:${PORT}/api/health`);
  });

  // ── Graceful Shutdown (AWS SIGTERM / SIGINT handling) ────────────────
  const gracefulShutdown = async (signal) => {
    console.log(`\n Received ${signal}. Starting graceful shutdown...`);
    server.close(async () => {
      console.log("🔌 HTTP server closed.");
      try {
        await mongoose.connection.close(false);
        console.log(" MongoDB connection closed.");
        process.exit(0);
      } catch (err) {
        console.error("Error closing MongoDB connection:", err);
        process.exit(1);
      }
    });

    // Force close after 10s if graceful close hangs
    setTimeout(() => {
      console.error(" Forced shutdown due to timeout.");
      process.exit(1);
    }, 10000);
  };

  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  process.on("SIGINT", () => gracefulShutdown("SIGINT"));
};

startServer();
