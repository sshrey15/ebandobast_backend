import express from "express";
import authRouter from "./routes/authRoute.js";
import patrolRoutes from "./routes/patrolRoutes.js"; // From patrolingAndMeeting branch
import bandobastRouter from "./routes/bandobastRoute.js"; // From main branch
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3001;
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/patrols", patrolRoutes); // From patrolingAndMeeting branch
app.use("/api/bandobast", bandobastRouter); // From main branch

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
