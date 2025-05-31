import express from 'express';
import { login, logout, checkAuth } from '../controllers/authController.js';
import { body } from 'express-validator';
import auth from '../middleware/auth.js';

const router = express.Router();

// Validaciones
const loginValidations = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('La contraseña es requerida')
];



// Rutas
router.post('/login', loginValidations, login);
router.post('/logout', logout);
router.get('/check', auth, checkAuth);

export default router; 