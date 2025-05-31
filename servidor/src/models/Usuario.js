import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const usuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

// Método para comparar contraseñas
usuarioSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    //console.log('Comparando contraseñas para:', this.email);
    //console.log('Contraseña candidata:', candidatePassword);
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    //console.log('¿Contraseñas coinciden?:', isMatch);
    return isMatch;
  } catch (error) {
    console.error('Error al comparar contraseñas:', error);
    return false;
  }
};

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario; 