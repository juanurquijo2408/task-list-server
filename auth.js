const jwt = require("jsonwebtoken");
require("dotenv").config();

const users = [
  { email: "user@tasksrv.com", name: "user", rol: "user", pass: "USER" },
];
const login = (req, res) => {
  const { email, pass } = req.body;
  const user = users.find((user) => user.email === email && user.pass === pass);
  if (user) {
    const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: "30s" });
    res.status(200).json({ token });
  } else {
    res.status(401).send({ error: "Usuario o contraseña errados" });
  }
};

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ err });
    } else if (decoded.rol === "user") {
      req.rol = "user";
    }
    next();
  });
};

module.exports = { login, auth };
