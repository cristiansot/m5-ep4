const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Lista de citas" });
});

router.post("/", (req, res) => {
  const { patientName, doctor, appointmentDate } = req.body;
  console.log("Datos recibidos:", req.body); 

  if (!patientName || !doctor || !appointmentDate) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  res.status(201).json({ message: "Cita creada con éxito" });
});


module.exports = router;
