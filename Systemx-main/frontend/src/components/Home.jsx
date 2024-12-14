import React from 'react';
import { Link } from 'react-router-dom';
import './../assets/styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Gestión de Sistema</h1>
      </header>
      <nav className="home-menu">
        <ul>
          <li>
            <Link to="/productos">Gestión de Productos</Link>
          </li>
          <li>
            <Link to="/usuarios">Gestión de Usuarios</Link>
          </li>
        </ul>
      </nav>
      <main className="home-content">
        <p>Bienvenido al sistema de gestión. Selecciona una opción del menú para continuar.</p>
      </main>
    </div>
  );
};

export default Home;
