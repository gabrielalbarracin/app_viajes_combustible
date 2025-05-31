import mongoose from 'mongoose';
import { Conductor } from '../models/index.js';
import { conductores } from '../seeds/initialData.js';

const testConductor = async () => {
  try {
    // Conectar a MongoDB
    await mongoose.connect('mongodb://localhost:27017/kadre_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conectado a MongoDB');

    // Intentar crear un conductor de prueba
    const conductorPrueba = conductores[0]; // Tomamos el primer conductor del array
    console.log('Intentando crear conductor:', conductorPrueba);

    const nuevoConductor = await Conductor.create(conductorPrueba);
    console.log('Conductor creado exitosamente:', nuevoConductor);

    // Verificar todos los conductores en la base de datos
    const todosLosConductores = await Conductor.find();
    console.log('Total de conductores en la BD:', todosLosConductores.length);

  } catch (error) {
    console.error('Error durante la prueba:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Desconectado de MongoDB');
  }
};

// Ejecutar la prueba
testConductor(); 