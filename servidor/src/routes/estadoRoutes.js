import { Router } from 'express';
import { getEstados } from '../controllers/estadoController.js';
import auth from '../middleware/auth.js';

const router = Router();

// Rutas con autenticación
router.use(auth);

// Rutas
router.get('/', getEstados);

export default router; 