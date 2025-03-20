import React, { useEffect, useState } from "react";

interface AppointmentValues {
  patientName: string;
  doctor: string;
  appointmentDate: string;
}

const AppointmentList: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentValues[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/appointments");
        const data = await response.json();
        if (response.ok) {
          setAppointments(data); 
        } else {
          console.error("Error al cargar las citas:", data.message);
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div>
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
    </div>
  );
};

export default AppointmentList;
