import express from "express";
import authRouter from "./routes/authRoute.js";

const port = 3000;
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("eBandobast");
  console.log("eBandobast");
});

app.listen(port, () => {
  console.log("eBandobasddt");
  console.log(`Server is running at http://localhost:${port}`);
});