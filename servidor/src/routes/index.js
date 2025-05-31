import express from 'express';
import userRoutes from './userRoutes.js';
import viajeRoutes from './viajeRoutes.js';
import authRoutes from './authRoutes.js';
import { Combustible, Estado } from '../models/index.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Rutas públicas
router.use('/auth', authRoutes);

// Middleware de autenticación para todas las rutas protegidas
router.use(auth);

// Rutas protegidas
router.use('/users', userRoutes);
router.use('/viajes', viajeRoutes);

router.get('/combustibles', async (req, res) => {
  try {
    const combustibles = await Combustible.find();
    res.json({
      success: true,
      data: combustibles
    });
  } catch (error) {
    console.error('Error al obtener combustibles:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener combustibles'
    });
  }
});

router.get('/estados', async (req, res) => {
  try {
    const estados = await Estado.find();
    res.json({
      success: true,
      data: estados
    });
  } catch (error) {
    console.error('Error al obtener estados:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener estados'
    });
  }
});

// Add more routes here as needed

export default router; 