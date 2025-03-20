import React, { useState } from "react";


interface AppointmentValues {
  id: number;
  patientName: string;
  doctor: string;
  appointmentDate: string;
}

interface AppointmentListProps {
  appointments: AppointmentValues[];
  onDelete: (id: number) => void;
  onUpdate: (id: number, updatedName: string) => void;
}

const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments,
  onDelete,
  onUpdate,
}) => {
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<number | null>(null);
  const [updatedName, setUpdatedName] = useState<string>("");

  return (
    <div>
      <h2>Citas Agendadas</h2>
      <div>
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div key={appointment.id} className="appointment-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{appointment.patientName}</strong> - {appointment.doctor} -{" "}
                {new Date(appointment.appointmentDate).toLocaleDateString()}
              </div>
              <div>
                <button
                  onClick={() => setSelectedAppointmentId(appointment.id)}
                  className="btn btn-warning btn-sm me-2"
                >
                  Actualizar
                </button>

                <button
                  onClick={() => onDelete(appointment.id)}
                  className="btn btn-danger btn-sm me-2"
                >
                  Eliminar
                </button>
              </div>

              {selectedAppointmentId === appointment.id && (
                <div className="mt-3">
                  <input
                    type="text"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    placeholder="Nuevo nombre"
                    className="form-control mb-2"
                  />
                  <button
                    onClick={() => {
                      onUpdate(appointment.id, updatedName);
                      setUpdatedName(""); 
                      setSelectedAppointmentId(null); 
                    }}
                    className="btn btn-success btn-sm"
                  >
                    Guardar cambios
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div>No hay citas agendadas.</div>
        )}
      </div>
    </div>
  );
};

export default AppointmentList;
