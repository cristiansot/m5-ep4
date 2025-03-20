require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const appointmentRoutes = require("./routes/appointments"); 

const app = express();
const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes); 
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
