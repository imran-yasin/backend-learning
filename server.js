const express = require("express");

const sectorRoutes = require("./src/sectors/routes");

const app = express();
const port = 8000;

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1/sectors", sectorRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
