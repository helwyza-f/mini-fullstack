import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { User } from "./models/userModel.js";

dotenv.config({});

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "https://mini-fullstack-ecru.vercel.app/",
  credentials: true,
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit process jika koneksi gagal
  }
};

// Initialize Routers
const userRouter = express.Router();
const companyRouter = express.Router();
const jobRouter = express.Router();
const applicationRouter = express.Router();

// User routes
userRouter.get("/", (req, res) => {
  res.json({ message: "Get users" });
});
userRouter.post("/", (req, res) => {
  res.json({ message: "Create new user" });
});
userRouter.get("/users", async (req, res) => {
  try {
    console.log("Request received at /users");
    const users = await User.find();
    console.log("Users fetched successfully");

    res.status(200).json({
      users,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({
      message: "Failed to get users",
      error: error.message,
    });
  }
});

// Company routes
companyRouter.get("/", (req, res) => {
  res.json({ message: "Get all companies" });
});
companyRouter.post("/", (req, res) => {
  res.json({ message: "Create new company" });
});

// Job routes
jobRouter.get("/", (req, res) => {
  res.json({ message: "Get all jobs" });
});
jobRouter.post("/", (req, res) => {
  res.json({ message: "Create new job" });
});

// Application routes
applicationRouter.get("/", (req, res) => {
  res.json({ message: "Get all applications" });
});
applicationRouter.post("/", (req, res) => {
  res.json({ message: "Create new application" });
});

// Register routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

// Root route
app.get("/", (req, res) => {
  return res.status(201).json({
    message: "Account created successfully.",
    success: true,
  });
});

app.get("/check-db", async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.json({ message: "Database connected successfully" });
  } catch (error) {
    console.error("Database connection error:", error); // Log error ke console
    res.status(500).json({
      message: `Failed to connect to the database ${process.env.MONGODB_URI}`,
      error: error.message, // Kirim pesan error ke client
    });
  }
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
