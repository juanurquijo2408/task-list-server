const express = require("express");
const app = express();
const port = 3000;

let tareas = require("./tareas.json");

app.use(express.json());

app.get("/tareas", (req, res) => {
  res.json(tareas);
});

app.post("/nuevaTarea", (req, res) => {
  const nuevaTarea = req.body;
  tareas.push(nuevaTarea);
  console.log(nuevaTarea);

  res.send("Tarea creada");
});

app.listen(port, () => {
  console.log("Listening on port " + port);
});
