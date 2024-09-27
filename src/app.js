import express from "express";
import cookieParser from "cookie-parser"; // Fix the typo here from 'cookesParser' to 'cookieParser'
import authRouter from "./routes/authRoute.js";
import patrolRoutes from "./routes/patrolRoutes.js"; // Patrol routes from both branches
import bandobastRouter from "./routes/bandobastRoute.js"; // Bandobast route from both branches
import meetingRoutes from "./routes/meetingRoutes.js"; // Meeting route from 'patrolingAndMeeting' branch
import alertInfoRouter from "./routes/alertInfoRoute.js"; // Alert info route from 'main' branch
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 8001;
const app = express();

// Middleware to parse JSON bodies and cookies
app.use(express.json());
app.use(cookieParser()); // No conflict here, keep correct cookie parser

// Routes
app.use("/api/auth", authRouter);
app.use("/api/patrols", patrolRoutes); // Patrol routes from both branches
app.use("/api/bandobast", bandobastRouter); // Bandobast route from both branches
app.use("/api/meetings", meetingRoutes); // Meeting route from 'patrolingAndMeeting' branch
app.use("/api/alertinfo", alertInfoRouter); // Alert info route from 'main' branch

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
