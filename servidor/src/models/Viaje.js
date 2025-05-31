import mongoose from 'mongoose';

const viajeSchema = new mongoose.Schema({
  conductor: {
    type: String,
    required: true
  },
  camion: {
    type: String,
    required: true
  },
  origen: {
    type: String,
    required: true
  },
  destino: {
    type: String,
    required: true
  },
  combustible: {
    type: String,
    required: true
  },
  litros: {
    type: Number,
    required: true
  },
  fecha_salida: {
    type: Date,
    required: true
  },
  estadoId: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  },
  toObject: { 
    virtuals: true,
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// Virtual populate para estado
viajeSchema.virtual('estado', {
  ref: 'Estado',
  localField: 'estadoId',
  foreignField: 'codigo',
  justOne: true
});

// índices para mejorar las búsquedas
viajeSchema.index({ fecha_salida: -1 });
viajeSchema.index({ estadoId: 1 });

const Viaje = mongoose.model('Viaje', viajeSchema);

export default Viaje; 