import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginWithGoogle from './components/login/LoginWithGoogle'; 
import Home from './components/home/home'; 
import Index from "./components/create_login/index";

const AppRoutes = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <Router>
      <Routes>
      
        <Route path="Login" element={<LoginWithGoogle setIsLoggedIn={setIsLoggedIn} />} />

        {/* Rota para a tela do Home, com redirecionamento se não estiver logado */}
        <Route path="Home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />

        {/* Rota para a tela de registro */}
        <Route path="Index" element={<Index />} />

        {/* Rota padrão: redirecionar para o login se não estiver logado */}
        <Route path="/" element={isLoggedIn ? <Navigate to="/Home" /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
