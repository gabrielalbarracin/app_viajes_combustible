import { useState, useEffect } from 'react';
import { format, isValid } from 'date-fns';

const initialFormState = {
  camion: '',
  conductor: '',
  origen: '',
  destino: '',
  combustible: '',
  litros: '',
  fecha_salida: '',
  estadoId: ''
};

export const useViajeForm = (initialTrip = null, mode = 'create', relatedData) => {
  const [formData, setFormData] = useState(mode === 'create' ? initialFormState : initialTrip || initialFormState);
  const [errors, setErrors] = useState({});

  const resetForm = () => {
    setFormData(initialFormState);
    setErrors({});
  };

  useEffect(() => {
    if (initialTrip && (mode === 'edit' || mode === 'view')) {
      setFormData({
        _id: initialTrip._id,
        camion: initialTrip.camion || '',
        conductor: initialTrip.conductor || '',
        origen: initialTrip.origen || '',
        destino: initialTrip.destino || '',
        combustible: initialTrip.combustible || '',
        litros: initialTrip.litros || '',
        fecha_salida: initialTrip.fecha_salida 
          ? format(new Date(initialTrip.fecha_salida), "yyyy-MM-dd'T'HH:mm")
          : '',
        estadoId: initialTrip.estado?.codigo || '',
      });
    }
  }, [initialTrip, mode]);

  const validateForm = () => {
    const newErrors = {};
    
    // Validaciones básicas de campos requeridos
    if (!formData.camion) newErrors.camion = 'El camión es requerido';
    if (!formData.conductor) newErrors.conductor = 'El conductor es requerido';
    if (!formData.origen) newErrors.origen = 'El origen es requerido';
    if (!formData.destino) newErrors.destino = 'El destino es requerido';
    if (!formData.combustible) newErrors.combustible = 'El combustible es requerido';
    
    // Validación de litros
    if (!formData.litros) {
      newErrors.litros = 'Los litros son requeridos';
    } else {
      const litros = Number(formData.litros);
      if (isNaN(litros) || litros <= 0) {
        newErrors.litros = 'Los litros deben ser un número positivo';
      } else if (litros > 30000) {
        newErrors.litros = 'No puede exceder los 30,000 litros';
      }
    }
    
    // Validación de fecha de salida
    if (!formData.fecha_salida) {
      newErrors.fecha_salida = 'La fecha de salida es requerida';
    } else {
      const selectedDate = new Date(formData.fecha_salida);
      if (!isValid(selectedDate)) {
        newErrors.fecha_salida = 'Fecha inválida';
      } else if (mode === 'create') {
        const today = new Date();
        if (selectedDate < today) {
          newErrors.fecha_salida = 'La fecha de salida no puede ser en el pasado';
        }
      }
    }

    // Validación de estado
    if (!formData.estadoId) {
      newErrors.estadoId = 'El estado es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validación específica para litros
    if (name === 'litros') {
      const numValue = value === '' ? '' : Number(value);
      if (!isNaN(numValue)) {
        setFormData(prev => ({
          ...prev,
          [name]: numValue
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return {
    formData,
    errors,
    validateForm,
    handleChange,
    resetForm
  };
}; 