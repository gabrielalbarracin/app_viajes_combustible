import express from 'express';
import { login } from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Rutas publicas
router.post('/login', login);


// Rutas protegidas
//router.get('/profile', auth, getProfile);

export default router; 