import axios from "axios";

// Crear una instancia de Axios
const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
});

// Interceptor para añadir el token JWT a las solicitudes
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Manejo de errores en la solicitud
        console.error("Error en la solicitud:", error);
        return Promise.reject(error);
    }
);

// Interceptor para manejar respuestas y errores globalmente
axiosInstance.interceptors.response.use(
    (response) => {
        // Puedes realizar alguna acción con la respuesta aquí si es necesario
        return response;
    },
    (error) => {
        // Manejo de errores global
        if (error.response) {
            // El servidor respondió con un código de estado fuera del rango de 2xx
            console.error("Error en la respuesta:", error.response.data);
        } else if (error.request) {
            // La solicitud fue realizada pero no se recibió respuesta
            console.error("No se recibió respuesta del servidor:", error.request);
        } else {
            // Algo sucedió al configurar la solicitud
            console.error("Error al configurar la solicitud:", error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;