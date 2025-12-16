/**
 * Seed script to create admin user 'satyam' in MongoDB
 * Run: node seed.js
 */

require("dotenv").config({ path: require('path').resolve(__dirname, '.env') });
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./src/models/User");

async function seed() {
  try {
    console.log("🌱 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✓ MongoDB connected");

    // Check if satyam already exists
    const existing = await User.findOne({ username: "satyam" });
    if (existing) {
      console.log("✓ Admin user 'satyam' already exists");
      process.exit(0);
    }

    // Create satyam user
    const hashedPassword = await bcrypt.hash("satyam", 10);
    const satyam = new User({
      username: "satyam",
      password: hashedPassword,
      role: "admin"
    });

    await satyam.save();
    console.log("✓ Admin user created successfully!");
    console.log("  Username: satyam");
    console.log("  Password: satyam");
    console.log("  Role: admin");

    process.exit(0);
  } catch (err) {
    console.error("✗ Error:", err.message);
    process.exit(1);
  }
}

seed();
