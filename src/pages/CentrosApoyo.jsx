import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './CentrosApoyo.css';
import iconoRefugio from '../assets/refugio.png'; 
import iconoGuarderia from '../assets/guarderia.png';
import iconoCasa from '../assets/casa.emer.png';

// Solución para iconos del mapa
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function CentrosApoyo() {
  const [categoriaActiva, setCategoriaActiva] = useState(null);
  const [refugioDetalle, setRefugioDetalle] = useState(null);

  const refugiosData = [
    { id: 1, titulo: 'Refugio Casa Gaviota', texto: 'Asociación civil. Contención emocional, legal y resguardo seguro.', direccion: 'Alcaldía Cuauhtémoc, CDMX', telefono: '55-5564-2011', servicios: ['Alojamiento seguro', 'Atención médica', 'Asesoría legal'], lat: 19.4326, lng: -99.1332 },
    { id: 2, titulo: 'Red Nacional de Refugios (Sede CDMX)', texto: 'Rescate y protección a mujeres, sus hijas e hijos en situación de violencia.', direccion: 'Alcaldía Coyoacán, CDMX', telefono: '55-5674-9695', servicios: ['Línea de rescate', 'Alta seguridad', 'Trabajo social'], lat: 19.3467, lng: -99.1617 },
    { id: 3, titulo: 'Centro de Apoyo a la Mujer (CAM)', texto: 'Atención multidisciplinaria de emergencia y canalización a refugios.', direccion: 'Roma Sur, CDMX', telefono: '55-5264-5318', servicios: ['Asesoría jurídica', 'Terapias', 'Acompañamiento'], lat: 19.4060, lng: -99.1624 }
  ];

  const categorias = [
    { id: 'refugios', titulo: 'Refugios Cercanos (CDMX)', descripcion: 'Encuentra refugios seguros y cercanos a tu ubicación.', icono: '🗺️', tipoContenido: 'mapa' },
    { id: 'guarderias', titulo: 'Guarderías Seguras (CDMX)', descripcion: 'Directorio de CENDIs y guarderías certificadas.', icono: '🧸', tipoContenido: 'lista',
      datos: [
        { titulo: 'Guardería IMSS Ordinaria No. 10', texto: 'Ubicación: Col. Roma. Atención gratuita para madres aseguradas, control estricto de accesos y circuito cerrado.', extra: '📞 55-5574-8899' },
        { titulo: 'CENDI "Alternativa de Cuidado Infantil"', texto: 'Ubicación: Cuauhtémoc. Seguridad verificada por Protección Civil. Ingreso con huella dactilar para tutores.', extra: '📞 55-5512-3456' },
        { titulo: 'Estancia Infantil "El Tren del Saber"', texto: 'Ubicación: Coyoacán. Personal capacitado en primeros auxilios y psicología infantil.', extra: '📞 55-5689-1122' }
      ]
    },
    { id: 'casas', titulo: 'Casas de Emergencia (CDMX)', descripcion: 'Espacios de protección de la Secretaría de las Mujeres.', icono: '🛡️', tipoContenido: 'lista',
      datos: [
        { titulo: 'Línea Mujeres (SOS CDMX)', texto: 'Para acceder a una casa de emergencia temporal (LUNAS o refugios de SEMUJERES), contacta a la línea directa que brinda atención inmediata 24/7.', extra: '📞 Marcar al *765' },
        { titulo: 'Centros de Justicia para las Mujeres (CJM)', texto: 'Ofrecen espacios seguros temporales de 72 horas mientras se gestiona el ingreso a un refugio de alta seguridad. Sedes en Azcapotzalco, Iztapalapa y Tlalpan.', extra: '📍 Ver sedes CJM' }
      ]
    }
  ];

  const cerrarModal = () => {
    setCategoriaActiva(null);
    setRefugioDetalle(null);
  };

  return (
    <div className="page fade-in">
      <Link to="/" className="back-button">← Volver al inicio</Link>
      <h2>Centros de Apoyo</h2>
      <p className="subtitle">Selecciona una opción para acceder a la red de ayuda.</p>
      
      <div className="list-container">
        {categorias.map((cat) => (
          <div key={cat.id} className="support-card" onClick={() => setCategoriaActiva(cat)}>
            <div className="support-icon">{cat.icono}</div>
            <div className="support-info">
              <h3>{cat.titulo}</h3>
              <p>{cat.descripcion}</p>
            </div>
            <div className="arrow-icon">→</div>
          </div>
        ))}
      </div>

      {categoriaActiva && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-content forum-modal" onClick={e => e.stopPropagation()}>
            
            {!refugioDetalle ? (
              <>
                <div className="modal-header">
                  <span className="modal-header-icon">{categoriaActiva.icono}</span>
                  <h3>{categoriaActiva.titulo}</h3>
                </div>
                
                <div className="modal-body scrollable">
                  
                  {categoriaActiva.tipoContenido === 'mapa' && (
                    <>
                      <div className="map-container">
                        <MapContainer center={[19.4326, -99.1332]} zoom={11} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                          {refugiosData.map(refugio => (
                            <Marker key={refugio.id} position={[refugio.lat, refugio.lng]}>
                              <Popup>
                                <strong>{refugio.titulo}</strong><br/>
                                <button className="popup-btn" onClick={() => setRefugioDetalle(refugio)}>Ver detalles</button>
                              </Popup>
                            </Marker>
                          ))}
                        </MapContainer>
                      </div>

                      <div className="list-data-container">
                        {refugiosData.map((refugio) => (
                          <div key={refugio.id} className="data-item">
                            <h4>{refugio.titulo}</h4>
                            <p>{refugio.texto}</p>
                            <button className="action-link" onClick={() => setRefugioDetalle(refugio)}>📍 Ver más detalles</button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {categoriaActiva.tipoContenido === 'lista' && (
                    <div className="list-data-container">
                      {categoriaActiva.datos.map((item, i) => (
                        <div key={i} className="data-item">
                          <h4>{item.titulo}</h4>
                          <p>{item.texto}</p>
                          {item.extra && <span className="action-link">{item.extra}</span>}
                        </div>
                      ))}
                    </div>
                  )}

                </div>
                <button className="close-modal-btn" onClick={cerrarModal}>Cerrar</button>
              </>
            ) : (
              <div className="detalle-view fade-in">
                <button className="back-btn-text" onClick={() => setRefugioDetalle(null)}>← Volver a la lista</button>
                <div className="detalle-header">
                  <h3>{refugioDetalle.titulo}</h3>
                  <span className="status-badge">Abierto Ahora</span>
                </div>
                
                <div className="detalle-seccion">
                  <h4>Información General</h4>
                  <p>{refugioDetalle.texto}</p>
                </div>

                <div className="detalle-seccion">
                  <h4>Ubicación Aproximada</h4>
                   <img src={iconDocss} alt="Icono refugio" className="custom-icon-img" />
                              </div>

                <div className="detalle-seccion">
                  <h4>Servicios Ofrecidos</h4>
                  <ul className="servicios-lista">
                    {refugioDetalle.servicios.map((srv, idx) => (
                      <li key={idx}>✓ {srv}</li>
                    ))}
                  </ul>
                </div>

                <div className="detalle-actions">
                  <button className="call-btn"> Contactar ({refugioDetalle.telefono})</button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

export default CentrosApoyo;