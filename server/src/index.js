// src/index.js

require("dotenv").config({ path: require("path").resolve(__dirname, "..", ".env") });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

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

// --- CORS Configuration ---
const allowedOrigins = [
  "http://localhost:5173", // Local frontend
  "https://satyam-sawant.netlify.app" // Netlify deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, mobile apps, server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// --- Handle preflight requests ---
app.options("*", cors());

// --- Middleware ---
app.use(express.json()); // parse JSON bodies

// --- Root endpoint ---
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

// --- MongoDB Connection ---
if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI in .env file. Ensure .env exists in server folder.");
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Mongo connection error:", err);
    process.exit(1);
  });




