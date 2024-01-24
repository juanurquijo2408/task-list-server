const express = require("express");
const app = express();
const port = 3000;
const listView = require("./list-view-router.js");
const listEdit = require("./list-edit-router.js");

app.use(express.json());

app.use("/tareas", listView);

app.use("/tareas", listEdit);

app.listen(port, () => {
  console.log("Listening on port " + port);
});
