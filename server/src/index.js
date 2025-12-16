// src/index.js

require("dotenv").config({ path: require('path').resolve(__dirname, '..', '.env') });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path'); // Added for path resolution

// --- Route Imports ---
const serviceRoutes = require("./routes/services");
const skillRoutes = require("./routes/skills");
const projectRoutes = require("./routes/projects");
const contactRoutes = require("./routes/contacts");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

const app = express();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// --- Middleware Setup ---
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// --- Root Endpoint ---
app.get("/", (_req, res) => {
  res.json({ ok: true, message: "Portfolio API running" });
});

// --- API Routes ---
app.use("/api/services", serviceRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// --- MongoDB Connection & Server Start ---
if (!MONGODB_URI) {
  // Better error message reflecting the fix
  console.error(
    "Missing MONGODB_URI in .env file. Ensure .env is in the server directory."
  );
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`API server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Mongo connection error", err);
    process.exit(1);
  });
