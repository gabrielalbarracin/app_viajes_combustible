import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Usuario } from '../models/index.js';

class AuthService {
  static generarToken = (userId) => {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET || 'tu_super_secreto_seguro_aqui_123',
      { expiresIn: '1h' }
    );
  };

  static login = async (email, password) => {
    
    // Buscar usuario
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      console.log('Usuario no encontrado:', email);
      throw new Error('Credenciales inválidas');
    }


    // Verificar contraseña
    const isMatch = await usuario.comparePassword(password);
    if (!isMatch) {
      console.log('Contraseña incorrecta para:', email);
      throw new Error('Credenciales inválidas');
    }

    //console.log('Login exitoso para:', email);

    // Generar token
    const token = this.generarToken(usuario._id);

    return {
      token,
      user: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    };
  };

  /*static register = async (userData) => {
    const { email } = userData;

    // Verificar si el usuario ya existe
    const existingUser = await Usuario.findOne({ email });
    if (existingUser) {
      throw new Error('El usuario ya existe');
    }

    // Crear nuevo usuario
    const user = new Usuario(userData);
    await user.save();

    // Generar token
    const token = this.generarToken(user._id);

    return {
      token,
      user: {
        id: user._id,
        nombre: user.nombre,
        email: user.email
      }
    };
  };*/
}

export default AuthService; 