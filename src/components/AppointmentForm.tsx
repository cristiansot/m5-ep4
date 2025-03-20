import React, { useRef, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../assets/css/form.css";

interface Doctor {
  nombre: string;
  especialidad: string;
}

interface AppointmentValues {
  patientName: string;
  doctor: string;
  appointmentDate: string;
}

interface AppointmentFormProps {
  doctors: Doctor[];
  onAppointmentSubmit: (values: AppointmentValues) => void;
  token: string;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  doctors,
  onAppointmentSubmit,
  token,
}) => {
  const patientNameRef = useRef<HTMLInputElement>(null);
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (patientNameRef.current) {
      patientNameRef.current.focus();
    }
  }, []);

  const validationSchema = Yup.object({
    patientName: Yup.string()
      .required("El nombre del paciente es obligatorio")
      .min(3, "Debe tener al menos 3 caracteres"),
    doctor: Yup.string().required("Debes seleccionar un doctor"),
    appointmentDate: Yup.date()
      .required("Debes seleccionar una fecha")
      .min(new Date().toISOString().split("T")[0], "La fecha no puede ser en el pasado"),
  });

  const submitAppointment = async (values: AppointmentValues) => {
    setIsSubmitting(true);
    setApiResponse(null);

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
        const errorData = await response.json();
        throw new Error(errorData?.message || "Error al enviar la cita");
      }

      const data = await response.json();
      setApiResponse("Cita creada con éxito");
      console.log("Cita creada:", data);
      onAppointmentSubmit(values);
    } catch (error: any) {
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
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          submitAppointment(values);
          resetForm();
        }}
      >
        {({ errors, touched }) => (
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
              {errors.patientName && touched.patientName && (
                <div style={{ color: "red" }}>{errors.patientName}</div>
              )}
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
              {errors.doctor && touched.doctor && (
                <div style={{ color: "red" }}>{errors.doctor}</div>
              )}
            </div>

            <div>
              <label className="titleLabel" htmlFor="appointmentDate">
                Fecha de la Cita
              </label>
              <Field type="date" id="appointmentDate" name="appointmentDate" />
              {errors.appointmentDate && touched.appointmentDate && (
                <div style={{ color: "red" }}>{errors.appointmentDate}</div>
              )}
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
