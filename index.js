const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const toDoRoutes = require("./routes/todos");
app.use("/", toDoRoutes);

app.listen(3000, () => {
  console.log("Application running on http://localhost:3000");
});
