import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("🎓 Student Management API is running...");
});

// Routes
app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
