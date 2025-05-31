//import express from 'express';
//import cors from 'cors';
import dotenv from 'dotenv';
//import routes from './routes/index.js';
import { connectDB } from './models/index.js';
import { seedData } from './seeds/index.js';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 4000;


async function start() {
  try {
    // Conectar a MongoDB
    await connectDB();
    console.log('Base de datos conectada');

    // Ejecutar seeding
    await seedData();
    console.log('Seeding completado');

    // Inicia servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor: ', error);
    process.exit(1);
  }
}

start(); 