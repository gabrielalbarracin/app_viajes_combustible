import { Estado } from '../models/index.js';

export const getEstados = async (req, res) => {
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
}; 