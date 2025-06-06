import express from 'express';
import { login, logout, checkAuth } from '../controllers/authController.js';
import { loginValidations } from '../validations/authValidations.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Rutas
router.post('/login', loginValidations, login);
router.post('/logout', logout);
router.get('/check', auth, checkAuth);

export default router; 