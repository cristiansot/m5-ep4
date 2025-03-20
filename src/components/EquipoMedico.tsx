import React, { useEffect, useState } from "react";
import DoctorCard from "./DoctorCard";

interface Doctor {
    nombre: string;
    imagen: string;
    especialidad: string;
    resumen: string;
    años_experiencia: number;
    valor_consulta: number;
    informacion_adicional: {
      horarios_disponibles: string[];
      contacto: {
        telefono: string;
        email: string;
      };
    };
}

const EquipoMedico: React.FC = () => {
  const [equipo, setEquipo] = useState<Doctor[]>([]);

  useEffect(() => {
    fetch('/equipo.json')
      .then((response) => response.json())
      .then((data) => setEquipo(data))
      .catch((error) => console.error('Error al cargar los datos:', error));
  }, []);

  return (
    <div className="container" style={{ marginBottom: 40 }}>
      <div className="row">
        {equipo.map((doctor, index) => (
          <div className="col-md-4" key={index}>
            <DoctorCard doctor={doctor} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipoMedico;
