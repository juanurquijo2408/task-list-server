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

app.delete("/tareas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const filtro = tareas.findIndex((tarea) => tarea.id === id);
  if (filtro !== -1) {
    tareas.splice(filtro, 1);
    res.send("Se eliminó la tarea de id:" + id);
  } else {
    res.status(404).send("No se encontró ninguna tarea con el id:" + id);
  }
});

app.listen(port, () => {
  console.log("Listening on port " + port);
});
