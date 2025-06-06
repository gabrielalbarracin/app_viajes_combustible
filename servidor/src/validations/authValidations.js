import { body } from 'express-validator';

export const loginValidations = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('La contraseña es requerida')
]; 