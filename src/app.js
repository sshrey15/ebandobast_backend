import express from "express";
import cookesParser from "cookie-parser";
import authRouter from "./routes/authRoute.js";
import patrolRoutes from "./routes/patrolRoutes.js"; // From patrolingAndMeeting branch
import bandobastRouter from "./routes/bandobastRoute.js"; // From main branch
import alertInfoRouter from "./routes/alertInfoRoute.js";
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 8001;
const app = express();


// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookesParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/patrols", patrolRoutes); // From patrolingAndMeeting branch
app.use("/api/bandobast", bandobastRouter); // From main branch
app.use("/api/alertinfo", alertInfoRouter);

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
