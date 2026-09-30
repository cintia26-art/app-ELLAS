import { Link } from 'react-router-dom';

// 1. IMPORTAMOS LAS IMÁGENES EXACTAMENTE COMO SE LLAMAN EN TU CARPETA
import iconoDoc from '../assets/doc.png'; 
import iconoApoyo from '../assets/apoyo.png';
import iconoFertilidad from '../assets/fertilidad.png';

function Home() {
  return (
    <div className="page fade-in">
      <div className="welcome-section">
        <h2>Bienvenida</h2>
        <p className="subtitle">Sin sesgos, sin juicios, sin riesgos. Solo ellas.</p>
      </div>

      {/* TARJETA 1: CENTROS DE SALUD */}
      <Link to="/centros-salud" className="menu-card">
        <div className="card-icon">
          <img src={iconoDoc} alt="Centros de Salud" className="custom-icon-img" />
        </div>
        <div className="card-text">
          <h3>Centros de Salud</h3>
          <p>Encuentra médicos especialistas privados.</p>
        </div>
        <div className="arrow-icon">→</div>
      </Link>

      {/* TARJETA 2: CENTROS DE APOYO */}
      <Link to="/centros-apoyo" className="menu-card">
        <div className="card-icon">
          <img src={iconoApoyo} alt="Centros de Apoyo" className="custom-icon-img" />
        </div>
        <div className="card-text">
          <h3>Centros de Apoyo</h3>
          <p>Refugios, apoyo a madres y guarderías.</p>
        </div>
        <div className="arrow-icon">→</div>
      </Link>

      {/* TARJETA 3: SALUD REPRODUCTIVA (Antes Fertilidad) */}
      <Link to="/control-fertilidad" className="menu-card">
        <div className="card-icon">
          <img src={iconoFertilidad} alt="Salud Reproductiva" className="custom-icon-img" />
        </div>
        <div className="card-text">
          <h3>Salud Reproductiva</h3>
          <p>Monitorea tu ciclo y prevén enfermedades.</p>
        </div>
        <div className="arrow-icon">→</div>
      </Link>
      
    </div>
  );
}

export default Home;