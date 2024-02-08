const express = require("express");
const app = express();
require("dotenv").config();
const listView = require("./list-view-router.js");
const listEdit = require("./list-edit-router.js");
const auth = require("./auth.js");

app.use(express.json());

app.use((req, res, next) => {
  const metodo = req.method.toLowerCase();
  const metodos = ["get", "post", "put", "delete"];
  if (!metodos.includes(metodo)) {
    return res
      .status(400)
      .json({ message: "El método HTTP usado no es válido" });
  }
  next();
});

app.post("/login", auth.login);

app.use("/tareas", auth.auth);

app.use("/tareas", listView);

app.use("/tareas", listEdit);

app.listen(process.env.PORT, () => {
  console.log("Listening on port " + process.env.PORT);
});
