import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";

const app = express();

dotenv.config();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const corsOption = {
  origin: "http://localhost:5174",
  credentials: true,
};
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/test", (req, res) => {
  res.send("Hello test");
});

app.use("/api/v1/user", userRoute);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected...`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

app.listen(port, () => {
  connectDB();
  console.log(`Server running on port ${port}`);
});
