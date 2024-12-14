import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login'; // Import Login component
import ProductManager from './components/ProductManager';
import UsersPage from './components/UsersPage';
import DashboardPage from './pages/DashboardPage';


const App = () => {
  return (
    <Router>
      <Routes>


        <Route path="/" element={<Login />} /> {/* Default route */}
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/productos" element={<ProductManager />} />
                <Route path="/usuarios" element={<UsersPage />} />
        
      </Routes>
    </Router>
  );
};

export default App;
