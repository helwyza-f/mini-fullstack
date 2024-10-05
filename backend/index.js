import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({});

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
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
  }
};

// Initialize Routers
const userRouter = express.Router();
const companyRouter = express.Router();
const jobRouter = express.Router();
const applicationRouter = express.Router();

// User routes
userRouter.get("/", (req, res) => {
  res.json({ message: "Get all users" });
});
userRouter.post("/", (req, res) => {
  res.json({ message: "Create new user" });
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

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
