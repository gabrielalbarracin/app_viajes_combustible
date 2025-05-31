import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/index.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //console.log('Intento de login con:', { email, password });
    
    // Buscar usuario por email (sintaxis MongoDB)
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      console.log('Usuario no encontrado');
      return res.status(401).json({ message: 'Email inválido' });
    }

    // Verificar contraseña usando el método del modelo
    const passwordValida = await usuario.comparePassword(password);
    if (!passwordValida) {
      console.log('Contraseña inválida');
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      process.env.JWT_SECRET || 'tu_jwt_secret',
      { expiresIn: '1h' }
    );

    console.log('Login exitoso para:', usuario.email);

    // Enviar respuesta
    res.json({
      token,
      user: {
        id: usuario._id,
        email: usuario.email,
        nombre: usuario.nombre
      }
    });
  } catch (error) {
    console.error('Error en login: ', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};


/*
export const getProfile = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.user.id, {
      attributes: ['id', 'email', 'nombre']
    });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
}; 
*/