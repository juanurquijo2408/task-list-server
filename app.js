const express = require("express");
const app = express();
const port = 3000;

const tareas = {
  id: 123456,
  isCompleted: false,
  description: "Walk the dog",
};

app.get("/", (req, res) => {
  res.json(tareas);
});

app.listen(port, () => {
  console.log("Listening on port " + port);
});
