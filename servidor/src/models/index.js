import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Configuración de la conexión a MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/app_viajes_combustibles', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Exportar modelos
export { default as Usuario } from './Usuario.js';
export { default as Estado } from './Estado.js';
export { default as Combustible } from './Combustible.js';
export { default as Viaje } from './Viaje.js';

export { connectDB }; 