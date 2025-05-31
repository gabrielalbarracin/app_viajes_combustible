import mongoose from 'mongoose';

const estadoSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  },
  descripcion: {
    type: String,
    required: true,
    trim: true
  },
  activo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Estado = mongoose.model('Estado', estadoSchema);

export default Estado; 