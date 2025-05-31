import { Viaje } from '../models/index.js';
import { createViajeValidations, updateViajeValidations } from '../validations/viajeValidations.js';
import { validationResult } from 'express-validator';

// Crear un nuevo viaje
export const createViaje = async (req, res) => {
  try {
    console.log('Creando viaje con datos:', req.body);

    // Ejecutar validaciones
    await Promise.all(createViajeValidations.map(validation => validation.run(req)));
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: errors.array().map(error => ({
          field: error.path,
          message: error.msg
        }))
      });
    }

    const {
      camion,
      conductor,
      origen,
      destino,
      combustible,
      litros,
      fecha_salida,
      estadoId
    } = req.body;

    const viaje = new Viaje({
      camion,
      conductor,
      origen,
      destino,
      combustible,
      litros,
      fecha_salida,
      estadoId
    });

    await viaje.save();

    // Poblar el estado antes de enviar la respuesta
    await viaje.populate('estado');

    res.status(201).json({
      success: true,
      data: viaje
    });
  } catch (error) {
    console.error('Error al crear el viaje:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });

    res.status(500).json({
      success: false,
      message: 'Error al crear el viaje',
      error: error.message
    });
  }
};

// Obtener todos los viajes
export const getViajes = async (req, res) => {
  try {
    //console.log('1. búsqueda de viajes');
    
    console.log('2 -> Creando query ');
    const viajes = await Viaje.find({ estadoId: { $ne: 'CANC' } })
      .populate('estado')
      .sort({ fecha_salida: -1 })
      .lean();
    
    console.log('3 -> Viajes encontrados: ', viajes.length);
    
    res.json({
      success: true,
      data: viajes
    });
  } catch (error) {
    console.error('Error al obtener los viajes: ', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });

    res.status(500).json({
      success: false,
      message: 'Error al obtener los viajes',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Obtener un viaje por ID
export const getViajeById = async (req, res) => {
  try {
    const viaje = await Viaje.findById(req.params.id)
      .populate('estado');

    if (!viaje) {
      return res.status(404).json({
        success: false,
        message: 'Viaje no encontrado'
      });
    }

    res.json({
      success: true,
      data: viaje
    });
  } catch (error) {
    console.error('Error al obtener el viaje:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener el viaje',
      error: error.message
    });
  }
};

// Actualizar un viaje
export const updateViaje = async (req, res) => {
  try {
    console.log('Actualizando viaje. ID:', req.params.id, 'Datos:', req.body);

    // Validar que el ID del viaje exista
    const viajeExistente = await Viaje.findById(req.params.id);
    if (!viajeExistente) {
      return res.status(404).json({
        success: false,
        message: 'Viaje no encontrado'
      });
    }

    // Ejecutar validaciones
    await Promise.all(updateViajeValidations.map(validation => validation.run(req)));
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: errors.array().map(error => ({
          field: error.path,
          message: error.msg
        }))
      });
    }

    // Actualizar solo los campos proporcionados
    const updateData = {};
    const allowedFields = ['estadoId', 'litros', 'fecha_salida', 'combustible', 'conductor', 'destino', 'origen', 'camion'];
    
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const viajeActualizado = await Viaje.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('estado');

    res.json({
      success: true,
      data: viajeActualizado
    });
  } catch (error) {
    console.error('Error al actualizar el viaje:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });

    res.status(500).json({
      success: false,
      message: 'Error al actualizar el viaje',
      error: error.message
    });
  }
};

// Eliminar un viaje (cambiar estado a cancelado)
export const deleteViaje = async (req, res) => {
  try {
    const viaje = await Viaje.findById(req.params.id);

    if (!viaje) {
      return res.status(404).json({
        success: false,
        message: 'Viaje no encontrado'
      });
    }

    // actualizar el estado a cancelado
    viaje.estadoId = 'CANC';
    await viaje.save();

    // Poblar los datos relacionados
    await viaje.populate('estado');

    res.json({
      success: true,
      message: 'Viaje eliminado correctamente'
    });
  } catch (error) {
    console.error('Error al eliminar el viaje:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el viaje',
      error: error.message
    });
  }
}; 