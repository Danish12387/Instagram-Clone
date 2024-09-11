import express from "express";
import messageRoute from "../routes/message.route.js";
import connectDB from "../utils/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { urlencoded } from "express";

// Initialize the app
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:5173", // Adjust origin as needed
  credentials: true,
};
app.use(cors(corsOptions));

// Connect to the DB
connectDB();

// Use the message route
app.use("/api/v1/message", messageRoute);

// Export the express app as a handler for serverless function
export default app;
