import axios from 'axios';
import { API_URL } from '../constants/urls';

// Configuración por defecto
axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true; // Importante para cookies

// Manejar la estructura de respuesta y errores de autenticación
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Si es error de autenticación
    if (error.response?.status === 401) {
      // Redirigir al login
      window.location.href = '/login';
      return Promise.reject({
        success: false,
        error: 'Sesión expirada'
      });
    }

    if (error.response?.data) {
      return Promise.reject({
        success: false,
        error: error.response.data.message || 'Error en la petición',
        errors: error.response.data.errors
      });
    }
    return Promise.reject({
      success: false,
      error: 'Error de conexión'
    });
  }
);

export const viajesApi = {
  // Viajes
  getViajes: async () => {
    const response = await axios.get('/viajes');
    return response;
  },

  createViaje: async (viajeData) => {
    const response = await axios.post('/viajes', viajeData);
    return response;
  },

  updateViaje: async (id, viajeData) => {
    const response = await axios.put(`/viajes/${id}`, viajeData);
    return response;
  },

  deleteViaje: async (id) => {
    const response = await axios.delete(`/viajes/${id}`);
    return response;
  },

  // Endpoints para obtener datos relacionados
  getCombustibles: async () => {
    const response = await axios.get('/combustibles');
    return response;
  },

  // Estados
  getEstados: async () => {
    const response = await axios.get('/estados');
    return response;
  },
};

export const authApi = {
  login: async (credentials) => {
    const response = await axios.post('/auth/login', credentials);
    return response;
  },

  logout: async () => {
    await axios.post('/auth/logout');
    window.location.href = '/login';
  }
};

export default axios; 