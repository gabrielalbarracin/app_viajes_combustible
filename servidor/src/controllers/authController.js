import AuthService from '../services/authService.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);
    
    // Configuración de la cookie
    res.cookie('token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true en producción
      sameSite: 'strict',
      maxAge: 3600000 // 1 hora en milisegundos
    });

    // Enviar respuesta sin incluir el token
    res.json({ user: result.user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  res.json({ message: 'Logout exitoso' });
};

export const checkAuth = async (req, res) => {
  // 
  res.json({ message: 'Token válido' });
};

