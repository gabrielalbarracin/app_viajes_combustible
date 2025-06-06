// URLs base
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
export const FRONTEND_URL = 'http://localhost:3000';

// URLs de API
export const API_URL = API_BASE_URL;
export const AUTH_CHECK_URL = `${API_URL}/auth/check`; 