import { useState } from "react";

interface FormErrors {
  patientName?: string;
  doctor?: string;
  appointmentDate?: string;
}

function useAppointmentFormValidation() {
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (values: any) => {
    const newErrors: FormErrors = {};

    if (!values.patientName) {
      newErrors.patientName = "El nombre del paciente es obligatorio";
    } else if (values.patientName.length < 3) {
      newErrors.patientName = "Debe tener al menos 3 caracteres";
    }

    if (!values.doctor) {
      newErrors.doctor = "Debes seleccionar un doctor";
    }

    if (!values.appointmentDate) {
      newErrors.appointmentDate = "La fecha de la cita es obligatoria";
    } else if (new Date(values.appointmentDate) < new Date()) {
      newErrors.appointmentDate = "La fecha no puede ser en el pasado";
    }

    setErrors(newErrors);
    return newErrors;
  };

  return {
    errors,
    validate,
  };
}

export default useAppointmentFormValidation;
