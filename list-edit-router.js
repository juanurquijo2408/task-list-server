const { Router } = require("express");
const router = Router();
const tareas = require("./tareas.json");

const validar = (req, res, next) => {
  const { id, isCompleted, description } = req.body;
  if (!id && !isCompleted && !description) {
    return res
      .status(400)
      .json({ message: "No hay información de la tarea para agregar" });
  } else if (
    id === undefined ||
    isCompleted === undefined ||
    description === undefined
  ) {
    return res.status(400).json({
      message: "La información debe estar completa para crear la tarea",
    });
  } else if (
    typeof id !== "number" ||
    typeof isCompleted !== "boolean" ||
    typeof description !== "string"
  ) {
    return res.status(400).json({ message: "Verifique los datos ingresados" });
  }
  next();
};

router.post("/nuevaTarea", validar, (req, res) => {
  const nuevaTarea = req.body;
  tareas.push(nuevaTarea);
  res.json({ message: "Tarea creada" });
});

router.delete("/eliminarTarea/:id", validar, (req, res) => {
  const id = parseInt(req.params.id);
  const filtro = tareas.findIndex((tarea) => tarea.id === id);
  if (filtro !== -1) {
    tareas.splice(filtro, 1);
    res.json({ message: "Se eliminó la tarea de id:" + id });
  } else {
    res
      .status(404)
      .json({ message: "No se encontró ninguna tarea con el id:" + id });
  }
});

router.put("/modificarTarea/:id", validar, (req, res) => {
  const id = parseInt(req.params.id);
  const filtro = tareas.findIndex((tarea) => tarea.id === id);
  if (filtro !== -1) {
    const actualizacion = req.body;
    tareas.splice(filtro, 1, actualizacion);
    res.json({ message: "Se modificó la tarea con los nuevos datos." });
  } else {
    res
      .status(404)
      .json({ message: "No se encontró ninguna tarea con el id: " + id });
  }
});

module.exports = router;
