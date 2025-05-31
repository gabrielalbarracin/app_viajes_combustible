import jwt from 'jsonwebtoken';
//import User from '../models/User.js';

const auth = (req, res, next) => {
  try {
    // Obtener el token de las cookies
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ message: 'No se proporcionó token de autenticación' });
    }

    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu_jwt_secret');
    
    // Agregar el usuario al request
    req.user = decoded;
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

export default auth; 