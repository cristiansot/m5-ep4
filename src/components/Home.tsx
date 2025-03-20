import React from 'react';
import Carousel from '../components/Carousel';

const Home: React.FC = () => {
  return (
    <div>
      <Carousel />
      <h2 style={{ marginTop: 30, color: "#5f6061" }}>Nuestra Historia</h2>
      <p style={{ marginTop: 30, fontSize: 18, color: "#868686" }}>
        Nursing Hospital es la red de atención médica más importante del país, reconocida por su compromiso con la excelencia en salud y la formación integral de futuros profesionales. Con un vasto campo clínico que abarca especialidades y niveles de atención de alta complejidad, esta institución no solo se dedica a ofrecer cuidados de calidad, sino también a liderar programas de capacitación avanzada para los médicos del mañana. Desde sus modernos hospitales hasta sus clínicas y centros de especialidades, Nursing Hospital fomenta la innovación, el aprendizaje práctico y una atención humanizada que impacta positivamente en la salud de miles de personas en todo el país.<br />
        <br />
      </p>
      <h2 style={{ color: "#5f6061" }}>Nuestra Misión</h2>
      <p>
        Nuestra Misión es entregar a la persona y a su familia una Atención de Salud Integral y de calidad que contribuya a su bienestar, respetando su dignidad, por equipos de gran calidad humana y excelencia profesional y académica.<br />
      </p>
      <br />
      <h2 style={{ color: "#5f6061" }}>Nuestra Visión</h2>
      <p>
        Nuestra Visión es ser la Red de Salud líder en Latinoamérica en la práctica clínica de excelencia y en el desarrollo de conocimientos para el cuidado de la persona, en colaboración con otras instituciones nacionales y extranjeras.
      </p>
    </div>
  );
};

export default Home;
