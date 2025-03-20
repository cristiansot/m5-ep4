const express = require("express");
const router = express.Router();

// Middleware para CORS específico
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Definir las rutas
router.get("/", (req, res) => {
  res.json({ message: "Lista de citas" });
});

router.post("/", (req, res) => {
  const { patientName, date, time } = req.body;
  if (!patientName || !date || !time) {
    return res.status(400).json({ error: "Faltan datos" });
  }
  res.status(201).json({ message: "Cita creada con éxito" });
});

module.exports = router;
