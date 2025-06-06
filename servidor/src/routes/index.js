import express from 'express';
import userRoutes from './userRoutes.js';
import viajeRoutes from './viajeRoutes.js';
import authRoutes from './authRoutes.js';
import estadoRoutes from './estadoRoutes.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Rutas públicas
router.use('/auth', authRoutes);

// Middleware de autenticación para todas las rutas protegidas
router.use(auth);

// Rutas protegidas
router.use('/users', userRoutes);
router.use('/viajes', viajeRoutes);
router.use('/estados', estadoRoutes);

export default router; 