const { Router } = require("express");
const router = Router();
const tareas = require("./tareas.json");

const validarId = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || typeof id !== "number") {
    return res
      .status(400)
      .json({ message: "El parámetro de búsqueda por Id es incorrecto" });
  }
  next();
};

const validarIsCompleted = (req, res, next) => {
  const isCompleted = req.params.isCompleted.toLowerCase();
  if (isCompleted !== "true" && isCompleted !== "false") {
    return res.status(400).json({
      message: "El parámetro de búsqueda por tarea completada es incorrecto",
    });
  }
  next();
};

router.get("/lista", (req, res) => {
  res.json(tareas);
});

router.get("/filtroId/:id", validarId, (req, res) => {
  const id = parseInt(req.params.id);
  const filtro = tareas.find((tarea) => tarea.id === id);
  if (filtro) {
    res.json({
      message: "La tarea de id:" + id + " es " + JSON.stringify(filtro),
    });
  } else {
    res
      .status(404)
      .json({ message: "No se encontró ninguna tarea con el id: " + id });
  }
});

router.get(
  "/filtroIsCompleted/:isCompleted",
  validarIsCompleted,
  (req, res) => {
    const isCompleted = req.params.isCompleted.toLowerCase();
    if (isCompleted === "true") {
      const filtro = tareas.filter((tarea) => tarea.isCompleted == true);
      res.json({ message: "Tareas completadas: " + JSON.stringify(filtro) });
    } else if (isCompleted === "false") {
      const filtro = tareas.filter((tarea) => tarea.isCompleted == false);
      res.json({ message: "Tareas no completadas: " + JSON.stringify(filtro) });
    } else {
      res.status(404).json({
        message: "El filtro de búsqueda " + isCompleted + " es inválido",
      });
    }
  }
);

module.exports = router;
