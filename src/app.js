import express from "express";

const port = 3000;
const app = express();

app.get("/", (req, res) => {
  res.send("eBandobast");
  console.log("eBandobast");
});

app.listen(port, () => {
  console.log("eBandobasddt");
  console.log(`Server is running at http://localhost:${port}`);
});
