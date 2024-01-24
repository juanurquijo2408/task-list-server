const { Router } = require("express");
const router = Router();
const tareas = require("./tareas.json");

router.post("/nuevaTarea", (req, res) => {
  const nuevaTarea = req.body;
  tareas.push(nuevaTarea);
  res.send("Tarea creada");
});

router.delete("/eliminarTarea/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const filtro = tareas.findIndex((tarea) => tarea.id === id);
  if (filtro !== -1) {
    tareas.splice(filtro, 1);
    res.send("Se eliminó la tarea de id:" + id);
  } else {
    res.status(404).send("No se encontró ninguna tarea con el id:" + id);
  }
});

router.put("/modificarTarea/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const filtro = tareas.findIndex((tarea) => tarea.id === id);
  if (filtro !== -1) {
    const actualizacion = req.body;
    tareas.splice(filtro, 1, actualizacion);
    res.send("Se modificó la tarea con los nuevos datos.");
  } else {
    res.status(404).send("No se encontró ninguna tarea con el id: " + id);
  }
});

module.exports = router;
