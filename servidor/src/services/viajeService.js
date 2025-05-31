/*import Viaje from '../models/Viaje.js';
import Conductor from '../models/Conductor.js';
import Destino from '../models/Destino.js';
import Combustible from '../models/Combustible.js';
import Estado from '../models/Estado.js';

class ViajeService {
  // Validaciones de negocio
  static validarReglas = async (data) => {
    const errores = [];

    // Validar cantidad de litros
    if (data.litros > 30000) {
      errores.push('No se pueden registrar viajes con más de 30.000 litros');
    }

    if (errores.length > 0) {
      throw new Error(errores.join('. '));
    }
  }

  // Validar existencia de referencias
  static validarReferencias = async (data) => {
    console.log('Validando referencias con datos:', data);
    
    const [conductorExiste, origenExiste, destinoExiste, combustibleExiste, estadoExiste] = 
      await Promise.all([
        Conductor.findOne({ codigo: data.conductor, activo: true }),
        Destino.findOne({ codigo: data.origen, activo: true }),
        Destino.findOne({ codigo: data.destino, activo: true }),
        Combustible.findOne({ codigo: data.combustible, activo: true }),
        Estado.findOne({ codigo: data.estadoId, activo: true })
      ]);

    console.log('Resultados de validación:', {
      conductorExiste: !!conductorExiste,
      origenExiste: !!origenExiste,
      destinoExiste: !!destinoExiste,
      combustibleExiste: !!combustibleExiste,
      estadoExiste: !!estadoExiste
    });

    const errores = [];

    if (!conductorExiste) errores.push('Conductor no encontrado');
    if (!origenExiste) errores.push('Origen no encontrado');
    if (!destinoExiste) errores.push('Destino no encontrado');
    if (!combustibleExiste) errores.push('Combustible no encontrado');
    if (!estadoExiste) errores.push('Estado no encontrado');

    if (errores.length > 0) {
      console.log('Errores encontrados:', errores);
      throw new Error(errores.join('. '));
    }

    console.log('Validación de referencias completada exitosamente');
  }

  // Obtener todos los viajes
  static obtenerViajes = async () => {
    const viajes = await Viaje.find({ activo: true })
      .sort({ fecha_salida: -1 });

    return Promise.all(viajes.map(async (viaje) => {
      const [conductor, origen, destino, combustible, estado] = await Promise.all([
        Conductor.findOne({ codigo: viaje.conductor }),
        Destino.findOne({ codigo: viaje.origen }),
        Destino.findOne({ codigo: viaje.destino }),
        Combustible.findOne({ codigo: viaje.combustible }),
        Estado.findOne({ codigo: viaje.estado })
      ]);

      return {
        ...viaje.toObject(),
        conductor: conductor ? {
          codigo: conductor.codigo,
          nombre: conductor.nombre,
          apellido: conductor.apellido
        } : null,
        origen: origen ? {
          codigo: origen.codigo,
          descripcion: origen.descripcion
        } : null,
        destino: destino ? {
          codigo: destino.codigo,
          descripcion: destino.descripcion
        } : null,
        combustible: combustible ? {
          codigo: combustible.codigo,
          descripcion: combustible.descripcion
        } : null,
        estado: estado ? {
          codigo: estado.codigo,
          descripcion: estado.descripcion
        } : null
      };
    }));
  }

  // Crear un nuevo viaje
  static crearViaje = async (data) => {
    // Validar reglas de negocio
    await this.validarReglas(data);
    
    // Validar referencias
    await this.validarReferencias(data);

    const viaje = new Viaje(data);
    await viaje.save();
    return viaje;
  }

  // Actualizar un viaje
  static actualizarViaje = async (id, data) => {
    // Si hay datos que requieren validación de reglas de negocio
    if (data.litros) {
      await this.validarReglas(data);
    }

    // Validar referencias si se están actualizando
    if (data.conductor || data.origen || data.destino || data.combustible || data.estadoId) {
      await this.validarReferencias({
        conductor: data.conductor,
        origen: data.origen,
        destino: data.destino,
        combustible: data.combustible,
        estadoId: data.estadoId
      });
    }

    const viaje = await Viaje.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );

    if (!viaje) {
      throw new Error('Viaje no encontrado');
    }

    return viaje;
  }

  // Cancelar un viaje
  static cancelarViaje = async (id) => {
    const viaje = await Viaje.findById(id);
    if (!viaje) {
      throw new Error('Viaje no encontrado');
    }

    const estadoCancelado = await Estado.findOne({ codigo: 'CANCELADO' });
    if (!estadoCancelado) {
      throw new Error('Estado "Cancelado" no encontrado en el sistema');
    }

    viaje.estado = estadoCancelado.codigo;
    viaje.activo = false;
    await viaje.save();

    return viaje;
  }
}

export default ViajeService; 

*/