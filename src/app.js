import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoute.js";
import patrolRoutes from "./routes/patrolRoutes.js";
import bandobastRouter from "./routes/bandobastRoute.js";
import meetingRoutes from "./routes/meetingRoutes.js";
import alertInfoRouter from "./routes/alertInfoRoute.js";
import bandoAssRouter from "./routes/bandoAssRoute.js";
import coordinatesRouter from "./routes/coordinatesRoute.js"; // Import the new router
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 8001;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/patrols", patrolRoutes);
app.use("/api/bandobast", bandobastRouter);
app.use("/api/meetings", meetingRoutes);
app.use("/api/alertinfo", alertInfoRouter);
app.use("/api/bandoass", bandoAssRouter);
app.use("/api/coordinates", coordinatesRouter); // Use the new router

app.get("/", (req, res) => {
  res.send("eBandobast");
  console.log("eBandobast");
});

app.listen(port, () => {
  console.log("eBandobast");
  console.log(`Server is running at http://localhost:${port}`);
});