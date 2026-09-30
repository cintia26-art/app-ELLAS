import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CentrosSalud from './pages/CentrosSalud';
import CentrosApoyo from './pages/CentrosApoyo';
import ControlFertilidad from './pages/ControlFertilidad';
import './App.css';
import logo from './assets/Ellas.LOGO.png'; 

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <div className="header-top">
            <img src={logo} alt="EllAS.LOGO" className="brand-logo" />
            <span className="header-date">290926</span>
          </div>
        </header>
        
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/centros-salud" element={<CentrosSalud />} />
            <Route path="/centros-apoyo" element={<CentrosApoyo />} />
            <Route path="/control-fertilidad" element={<ControlFertilidad />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;