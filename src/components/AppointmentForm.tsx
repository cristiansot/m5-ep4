import React, { useRef, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import useAppointmentFormValidation from "../hooks/useAppointmentFormValidation";  
import "../assets/css/form.css";

interface Doctor {
  nombre: string;
  especialidad: string;
}

interface AppointmentFormProps {
  doctors: Doctor[];
  onAppointmentSubmit: (values: AppointmentValues) => void;
  token: string;
}

interface AppointmentValues {
  patientName: string;
  doctor: string;
  appointmentDate: string;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  doctors,
  onAppointmentSubmit,
  token,
}) => {
  const patientNameRef = useRef<HTMLInputElement>(null);
  const { errors, validate } = useAppointmentFormValidation();  
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (patientNameRef.current) {
      patientNameRef.current.focus();
    }
  }, []);

  const submitAppointment = async (values: any) => {
    setIsSubmitting(true);
    setApiResponse(null); 

    const validationErrors = validate(values);

    if (Object.keys(validationErrors).length > 0) {
      setApiResponse("Por favor corrige los errores del formulario");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Error al enviar la cita");
      }

      const data = await response.json();
      setApiResponse("Cita creada con éxito");
      console.log("Cita creada:", data);
      onAppointmentSubmit(values); 
    } catch (error) {
      setApiResponse(`Error: ${error.message}`);
      console.error("Error al enviar la cita:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="formContainer">
      <h2 style={{ marginTop: 40, padding: 20, color: "#5f6061" }}>Agendar Cita</h2>
      <Formik
        initialValues={{
          patientName: "",
          doctor: "",
          appointmentDate: "",
        }}
        onSubmit={(values, { resetForm }) => {
          submitAppointment(values);
          resetForm(); 
        }}
      >
        {() => (
          <Form className="appointmentForm">
            <div>
              <label className="titleLabel" htmlFor="patientName">
                Nombre del Paciente
              </label>
              <Field
                type="text"
                id="patientName"
                name="patientName"
                placeholder="Nombre completo"
                innerRef={patientNameRef}
              />
              <ErrorMessage
                name="patientName"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            <div>
              <label className="titleLabel" htmlFor="doctor">
                Seleccionar Doctor
              </label>
              <Field as="select" id="doctor" name="doctor">
                <option value="" label="Seleccionar doctor" />
                {doctors.map((doc, index) => (
                  <option key={index} value={doc.nombre}>
                    {doc.nombre} ({doc.especialidad})
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="doctor"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            <div>
              <label className="titleLabel" htmlFor="appointmentDate">
                Fecha de la Cita
              </label>
              <Field type="date" id="appointmentDate" name="appointmentDate" />
              <ErrorMessage
                name="appointmentDate"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                marginTop: 20,
                borderRadius: 10,
                opacity: isSubmitting ? 0.6 : 1,
              }}
            >
              {isSubmitting ? "Enviando..." : "Agendar"}
            </button>

            {apiResponse && (
              <div
                style={{
                  marginTop: 20,
                  color: apiResponse.startsWith("Error") ? "red" : "green",
                }}
              >
                {apiResponse}
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AppointmentForm;
