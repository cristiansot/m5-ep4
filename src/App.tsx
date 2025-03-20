import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import EquipoMedico from "./components/EquipoMedico";
import Testimonios from "./components/Testimonios";
import AppNavbar from "./components/Navbar";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AppointmentForm from "./components/AppointmentForm";
import AppointmentList from "./components/AppointmentList";
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

  const handleDeleteAppointment = (id: number) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
  };

  const handleUpdateAppointment = (id: number, updatedName: string) => {
    setAppointments((prevAppointments) => 
      prevAppointments.map((appointment) => 
        appointment.id === id 
          ? { ...appointment, patientName: updatedName } 
          : appointment
      )
    );
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
                <AppointmentList 
                  appointments={appointments}
                  onDelete={handleDeleteAppointment}
                  onUpdate={handleUpdateAppointment}
                />
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
