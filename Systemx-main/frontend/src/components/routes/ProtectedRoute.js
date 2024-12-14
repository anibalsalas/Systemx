import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // Inicializa como null para manejar el estado de carga

    useEffect(() => {
        const token = localStorage.getItem("token");
        // Aquí podrías agregar lógica para verificar la validez del token
        setIsAuthenticated(!!token); // Convierte el token a booleano
    }, []);

    if (isAuthenticated === null) {
        // Puedes mostrar un loader o un componente de carga mientras verificas la autenticación
        return <div>Loading...</div>;
    }

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default ProtectedRoute;