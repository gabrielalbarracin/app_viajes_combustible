import mongoose from 'mongoose';

const combustibleSchema = new mongoose.Schema({
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

const Combustible = mongoose.model('Combustible', combustibleSchema);

export default Combustible; 