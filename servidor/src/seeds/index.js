import { Usuario, Estado, Combustible } from '../models/index.js';
import { estados, combustibles } from './initialData.js';
import bcrypt from 'bcrypt';

// Configuración del usuario por defecto
const DEFAULT_USER = {
  email: 'admin@email.com',
  password: 'admin123',
  nombre: 'Administrador'
};

export const seedData = async () => {
  try {
    // Verificar si ya existen datos
    const userCount = await Usuario.countDocuments();
    const estadoCount = await Estado.countDocuments();
    const combustibleCount = await Combustible.countDocuments();

    if (userCount === 0) {
      // Crear usuario administrador por defecto
      const hashedPassword = await bcrypt.hash(DEFAULT_USER.password, 10);
      await Usuario.create({
        email: DEFAULT_USER.email,
        password: hashedPassword,
        nombre: DEFAULT_USER.nombre
      });
      console.log('Usuario administrador creado:', DEFAULT_USER.email);
    }

    if (estadoCount === 0) {
      // Crear estados
      await Estado.insertMany(estados);
      console.log('Estados creados');
    }

    if (combustibleCount === 0) {
      // Crear tipos de combustible
      await Combustible.insertMany(combustibles);
      console.log('Tipos de combustible creados');
    }



    console.log('Seeding completado exitosamente');
  } catch (error) {
    console.error('Error durante el seeding:', error);
    throw error;
  }
}; 