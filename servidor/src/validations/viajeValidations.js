import { body } from 'express-validator';

export const createViajeValidations = [
  body('camion')
    .notEmpty()
    .withMessage('El camión es requerido')
    .trim()
    .isString()
    .withMessage('El camión debe ser un texto válido'),

  body('conductor')
    .notEmpty()
    .withMessage('El conductor es requerido')
    .trim()
    .isString()
    .withMessage('El conductor debe ser un texto válido'),

  body('origen')
    .notEmpty()
    .withMessage('El origen es requerido')
    .trim()
    .isString()
    .withMessage('El origen debe ser un texto válido'),

  body('destino')
    .notEmpty()
    .withMessage('El destino es requerido')
    .trim()
    .isString()
    .withMessage('El destino debe ser un texto válido'),

  body('combustible')
    .notEmpty()
    .withMessage('El combustible es requerido')
    .trim()
    .isString()
    .withMessage('El combustible debe ser un texto válido'),

  body('litros')
    .isNumeric().withMessage('Litros debe ser un número')
    .isFloat({ min: 1, max: 30000 }).withMessage('Litros debe estar entre 1 y 30000'),

  body('fecha_salida')
    .notEmpty()
    .withMessage('La fecha de salida es requerida')
    .isISO8601()
    .withMessage('La fecha de salida debe ser una fecha válida')
    .custom((value) => {
      const fecha = new Date(value);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      if (fecha < hoy) {
        throw new Error('La fecha no puede ser anterior a la fecha actual');
      }
      return true;
    }),

  body('estadoId')
    .notEmpty()
    .withMessage('El estado es requerido')
    .trim()
    .isString()
    .withMessage('El estado debe ser un texto válido')
];

export const updateViajeValidations = [
  body('camion')
    .optional()
    .trim()
    .isString()
    .withMessage('El camión debe ser un texto válido'),

  body('conductor')
    .optional()
    .trim()
    .isString()
    .withMessage('El conductor debe ser un texto válido'),

  body('origen')
    .optional()
    .trim()
    .isString()
    .withMessage('El origen debe ser un texto válido'),

  body('destino')
    .optional()
    .trim()
    .isString()
    .withMessage('El destino debe ser un texto válido'),

  body('combustible')
    .optional()
    .trim()
    .isString()
    .withMessage('El combustible debe ser un texto válido'),

  body('litros')
    .optional()
    .isNumeric()
    .withMessage('Los litros deben ser un número')
    .custom((value) => {
      if (value <= 0) {
        throw new Error('Los litros deben ser mayores a 0');
      }
      if (value > 30000) {
        throw new Error('Los litros no pueden exceder 30,000');
      }
      return true;
    }),

  body('fecha_salida')
    .optional()
    .isISO8601()
    .withMessage('La fecha de salida debe ser una fecha válida'),

  body('estadoId')
    .optional()
    .trim()
    .isString()
    .withMessage('El estado debe ser un texto válido')
]; 