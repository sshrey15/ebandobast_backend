import express from "express";
import authRouter from "./routes/authRoute.js";
import bandobastRouter from "./routes/bandobastRoute.js";

const port = process.env.PORT || 3001;
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/bandobast", bandobastRouter);


app.get("/", (req, res) => {
  res.send("eBandobast");
  console.log("eBandobast");
});

app.listen(port, () => {
  console.log("eBandobasddt");
  console.log(`Server is running at http://localhost:${port}`);
});