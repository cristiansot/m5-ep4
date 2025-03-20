import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

import testimonio1 from '../assets/img/testimonio_1.jpg';
import testimonio2 from '../assets/img/testimonio_2.jpg';
import testimonio3 from '../assets/img/testimonio_3.jpg';

interface Testimonio {
  id: number;
  img: string;
  title: string;
  text: string;
  author: string;
}

const Testimonios: React.FC = () => {
  const testimoniosData: Testimonio[] = [
    {
      id: 1,
      img: testimonio1,
      title: "Testimonio 1",
      text: `"Durante años sufrí de problemas digestivos sin saber qué los causaba. Después de consultar a un gastroenterólogo y hacerme las pruebas necesarias, me diagnosticaron con síndrome del intestino irritable. Gracias al tratamiento y a los cambios en mi dieta que me recomendó, finalmente puedo vivir sin dolor constante y entender mejor cómo cuidar mi salud digestiva."`,
      author: "Carolina, 34 años",
    },
    {
      id: 2,
      img: testimonio2,
      title: "Testimonio 2",
      text: `"Después de ser diagnosticado con una arritmia cardíaca, me sentía asustado y confundido. Mi cardiólogo no solo me explicó el tratamiento de manera clara, sino que me guió paso a paso en el proceso. Gracias a su atención y a los cuidados que recibí, hoy me siento mucho más seguro y mi calidad de vida ha mejorado significativamente."`,
      author: "Ana, 22 años",
    },
    {
      id: 3,
      img: testimonio3,
      title: "Testimonio 3",
      text: `"Durante años sufrí de problemas digestivos sin saber qué los causaba. Después de consultar a un gastroenterólogo y hacerme las pruebas necesarias, me diagnosticaron con síndrome del intestino irritable. Gracias al tratamiento y a los cambios en mi dieta que me recomendó, finalmente puedo vivir sin dolor constante y entender mejor cómo cuidar mi salud digestiva."`,
      author: "Claudio, 29 años",
    },
  ];

  return (
    <div className="container my-5">
      <h2 className="text-center mb-5" style={{ color: "#5f6061" }}>Testimonios de Nuestros Pacientes</h2>
      <Row>
        {testimoniosData.map((testimonio) => (
          <Col key={testimonio.id} sm={12} md={6} lg={4} className="mb-4 d-flex justify-content-center">
            <Card style={{ width: '20rem', borderColor: 'white', color: "#444444", boxShadow: 'none'  }}>
              <Card.Img variant="top" src={testimonio.img} style={{ borderRadius: 150 }} />
              <Card.Body>
                <Card.Text style={{ color: "#5f6061" }}>
                  {testimonio.text}
                  <br />
                  <b>{testimonio.author}</b>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Testimonios;