import { Router } from 'express';
import { getViajes, getViajeById, createViaje, updateViaje, deleteViaje } from '../controllers/viajeController.js';
import auth from '../middleware/auth.js';

const router = Router();

// Todas las rutas requieren autenticación
router.use(auth);

// Rutas de viajes
router.get('/', getViajes);
router.get('/:id', getViajeById);
router.post('/', createViaje);
router.put('/:id', updateViaje);
router.delete('/:id', deleteViaje);

export default router; 