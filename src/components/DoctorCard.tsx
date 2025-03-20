import React from 'react';

interface Doctor {
  nombre: string;
  imagen: string;
  especialidad: string;
  resumen: string;
  años_experiencia: number;
}

class DoctorClass implements Doctor {
  nombre: string;
  imagen: string;
  especialidad: string;
  resumen: string;
  años_experiencia: number;

  constructor(
    nombre: string,
    imagen: string,
    especialidad: string,
    resumen: string,
    años_experiencia: number
  ) {
    this.nombre = nombre;
    this.imagen = imagen;
    this.especialidad = especialidad;
    this.resumen = resumen;
    this.años_experiencia = años_experiencia;
  }

  getInfo() {
    return `${this.nombre} es especialista en ${this.especialidad}.`;
  }

  updateEspecialidad(newEspecialidad: string) {
    this.especialidad = newEspecialidad;
  }
}

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const doctorInstance = new DoctorClass(
    doctor.nombre,
    doctor.imagen,
    doctor.especialidad,
    doctor.resumen,
    doctor.años_experiencia
  );

  return (
    <div className="card mt-4">
      <img
        src={`src/assets/img/${doctor.imagen}`}
        alt={`Foto de ${doctor.nombre}`}
        className="card-img-top img-fluid" 
      />
      <div className="card-body">
        <h2 className="card-title">{doctor.nombre}</h2>
        <div className='card-info'>
          <h5 style={{ color: '#13628f'}}><strong>Especialidad:</strong> {doctor.especialidad}</h5>
          <p><strong>Resumen:</strong> {doctor.resumen}</p>
          <p><strong>Años de experiencia:</strong> {doctor.años_experiencia}</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
