import express from "express";
import authRouter from "./routes/authRoute.js";
import patrolRoutes from "./routes/patrolRoutes.js";
import bandobastRouter from "./routes/bandobastRoute.js";
import meetingRoutes from "./routes/meetingRoutes.js"; // Import meetingRoutes
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

dotenv.config();

const port = process.env.PORT || 3001;
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/patrols", patrolRoutes);
app.use("/api/bandobast", bandobastRouter);
app.use("/api/meetings", meetingRoutes); // Use meetingRoutes

// Root route
app.get("/", (req, res) => {
  res.send("eBandobast");
  console.log("eBandobast");
});

// Start the server
app.listen(port, () => {
  console.log("eBandobast");
  console.log(`Server is running at http://localhost:${port}`);
});