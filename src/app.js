const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const apiRoutes = require("./routes");
const errorRoutes = require("./routes/error.routes");

const app = express();

const PORT = process.env.PORT ?? 8000;

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

apiRoutes(app);

app.get("/", (req, res) => {
  res.send("Bienvenido a mi server");
});

errorRoutes(app);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puero ${PORT}`);
});

// $2b$10$C/i8/EVDWgZokvsLFtGBi.jv9nT2XrrPX1Z9HtTz5k5eAfcwE17sG
