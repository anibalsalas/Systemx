import '@coreui/coreui/dist/css/coreui.min.css';
import { useNavigate } from "react-router-dom";

import {
    CAlert,
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CForm,
    CFormInput,
    CFormLabel,
    CInputGroup,
} from '@coreui/react';
import React, { useState } from "react";

import axiosInstance from "../services/axiosInstance"; // Importar la instancia configurada

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate(); // Inicializa el hook

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post("/auth/login", {
                username,
                password,
            });
            const token = response.data.token;
            localStorage.setItem("token", token); // Guardar el token en localStorage

            console.log("Redirigiendo a /dashboard");

            // Redirigir al usuario al dashboard
            navigate('/dashboard');
        } catch (error) {
            setErrorMessage("Credenciales inválidas, por favor intenta de nuevo");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <CCard style={{ width: '400px' }}>
                <CCardHeader>
                    <h4>Iniciar Sesión</h4>
                </CCardHeader>
                <CCardBody>
                    <CForm onSubmit={handleSubmit}>
                        <CInputGroup  >
                            <CFormLabel   htmlFor="username">Usuario</CFormLabel  >
                            <CFormInput
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </CInputGroup  >
                        <CInputGroup  >
                            <CFormLabel   htmlFor="password">Contraseña</CFormLabel  >
                            <CFormInput
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </CInputGroup  >
                     
                      
                            <CButton type="submit"  color="primary">Iniciar Sesión</CButton>
                      
                    </CForm>
                    {errorMessage && <CAlert color="danger">{errorMessage}</CAlert>}
                </CCardBody>
            </CCard>
        </div>
    );
};

export default Login;