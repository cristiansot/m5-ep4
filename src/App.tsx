import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import EquipoMedico from "./components/EquipoMedico";
import Testimonios from "./components/Testimonios";
import AppNavbar from "./components/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AppointmentForm from "./components/AppointmentForm";
import Carousel from './components/Carousel';
import './App.css';

interface Doctor {
  nombre: string;
  especialidad: string;
}

interface AppointmentValues {
  patientName: string;
  doctor: string;
  appointmentDate: string;
}

function App() {
  const { token } = useAuth(); 
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<AppointmentValues[]>([]);

  useEffect(() => {
    fetch("/equipo.json") 
      .then((response) => response.json())
      .then((data) => setDoctors(data))
      .catch((error) => console.error("Error al cargar los doctores:", error));
  }, []);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";

  useEffect(() => {
    if (!token) {
      console.warn("No hay token, no se pueden cargar las citas.");
      return;
    }

    console.log("Cargando citas desde el backend...");
    console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
    console.log("URL de la API usada:", apiUrl);

    fetch(`${apiUrl}/appointments`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "x-api-key": "tu_api_key_segura", 
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Citas recibidas del backend:", data);
        setAppointments(data);
      })
      .catch((error) => console.error("Error al cargar las citas:", error));
  }, [token]);

  const handleAppointmentSubmit = (values: AppointmentValues) => {
    setAppointments((prevAppointments) => [...prevAppointments, values]);
  };

  return (
    <AuthProvider>
      <Router>
        <AppNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/testimonios" element={<Testimonios />} />
          <Route path="/equipo-medico" element={<EquipoMedico />} />
          
          <Route
            path="/citas"
            element={
              <div>
                <Carousel />
                <h2>Citas Agendadas</h2>
                <ul>
                  {appointments.length > 0 ? (
                    appointments.map((appointment, index) => (
                      <li key={index}>
                        <strong>{appointment.patientName}</strong> - {appointment.doctor} -{" "}
                        {new Date(appointment.appointmentDate).toLocaleDateString()}
                      </li>
                    ))
                  ) : (
                    <li>No hay citas agendadas.</li>
                  )}
                </ul>

                <AppointmentForm
                  doctors={doctors}
                  onAppointmentSubmit={handleAppointmentSubmit}
                  token={token} 
                />
              </div>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
