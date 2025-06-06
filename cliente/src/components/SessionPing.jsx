import { useEffect } from 'react';
import axios from 'axios';
import { AUTH_CHECK_URL } from '../constants/urls';

const PING_INTERVAL = 5 * 60 * 1000; // 5 minutos en milisegundos

const SessionPing = () => {
  useEffect(() => {
    const checkSession = async () => {
      try {
        await axios.get(AUTH_CHECK_URL);
      } catch (error) {
        // El interceptor de axios manejará el error 401
        console.log('Error en ping de sesión');
      }
    };

    // check después de 5 minutos
    const intervalId = setInterval(checkSession, PING_INTERVAL);

    // Limpiar cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);

  // no renderiza nada
  return null;
};

export default SessionPing; 