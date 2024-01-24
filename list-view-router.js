const { Router } = require("express");
const router = Router();
const tareas = require("./tareas.json");

router.get("/lista", (req, res) => {
  res.json(tareas);
});

router.get("/filtroId/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const filtro = tareas.find((tarea) => tarea.id === id);
  if (filtro) {
    res.send("La tarea de id:" + id + " es " + JSON.stringify(filtro));
  } else {
    res.status(404).send("No se encontró ninguna tarea con el id:" + id);
  }
});

router.get("/filtroEstado/:isCompleted", (req, res) => {
  const isCompleted = req.params.isCompleted.toLowerCase();
  if (isCompleted === "true") {
    const filtro = tareas.filter((tarea) => tarea.isCompleted == true);
    res.send("Tareas completadas: " + JSON.stringify(filtro));
  } else if (isCompleted === "false") {
    const filtro = tareas.filter((tarea) => tarea.isCompleted == false);
    res.send("Tareas no completadas: " + JSON.stringify(filtro));
  } else {
    res
      .status(404)
      .send("El filtro de búsqueda " + isCompleted + " es inválido");
  }
});

module.exports = router;
