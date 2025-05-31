import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';
import { useViajeForm } from '../hooks/useViajeForm';
import { COMBUSTIBLES } from '../constants/combustibles';
import { ORIGENES } from '../constants/origenes';

const TripModal = ({ 
  isOpen, 
  onClose, 
  mode = 'create',
  trip = null,
  onSave,
  relatedData 
}) => {
  const {
    formData,
    errors,
    validateForm,
    handleChange,
    resetForm
  } = useViajeForm(trip, mode, relatedData);

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      if (mode === 'create') {
        resetForm();
      }
    }
  };

  const modalTitle = {
    create: 'Crear Nuevo Viaje',
    edit: 'Editar Viaje',
    view: 'Ver Detalles del Viaje'
  }[mode];

  const isViewMode = mode === 'view';

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-8 shadow-xl transition-all">
                <div className="flex justify-between items-center mb-6">
                  <Dialog.Title className="text-xl font-medium text-gray-900">
                    {modalTitle}
                  </Dialog.Title>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500"
                    onClick={handleClose}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Primera fila: Camión, Conductor, Fecha de salida */}
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-3">
                      <label className="block text-base font-medium text-gray-700 mb-2">
                        Camión
                      </label>
                      <input
                        type="text"
                        name="camion"
                        value={formData.camion || ''}
                        onChange={handleChange}
                        disabled={isViewMode}
                        className={`h-12 text-base input-field ${errors.camion ? 'border-red-500' : ''}`}
                        placeholder="Patente del camión"
                      />
                      {errors.camion && (
                        <p className="mt-2 text-sm text-red-500">{errors.camion}</p>
                      )}
                    </div>

                    <div className="col-span-5">
                      <label className="block text-base font-medium text-gray-700 mb-2">
                        Conductor
                      </label>
                      <input
                        type="text"
                        name="conductor"
                        value={formData.conductor || ''}
                        onChange={handleChange}
                        disabled={isViewMode}
                        className={`h-12 text-base input-field ${errors.conductor ? 'border-red-500' : ''}`}
                        placeholder="Nombre del conductor"
                      />
                      {errors.conductor && (
                        <p className="mt-2 text-sm text-red-500">{errors.conductor}</p>
                      )}
                    </div>

                    <div className="col-span-4">
                      <label className="block text-base font-medium text-gray-700 mb-2">
                        Fecha de Salida
                      </label>
                      <input
                        type="datetime-local"
                        name="fecha_salida"
                        value={formData.fecha_salida}
                        onChange={handleChange}
                        disabled={isViewMode}
                        className={`h-12 text-base input-field ${errors.fecha_salida ? 'border-red-500' : ''}`}
                      />
                      {errors.fecha_salida && (
                        <p className="mt-2 text-sm text-red-500">{errors.fecha_salida}</p>
                      )}
                    </div>
                  </div>

                  {/* Segunda fila: Origen, Destino, Estado */}
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <label className="block text-base font-medium text-gray-700 mb-2">
                        Origen
                      </label>
                      <select
                        name="origen"
                        value={formData.origen || ''}
                        onChange={handleChange}
                        disabled={isViewMode}
                        className={`h-12 text-base input-field ${errors.origen ? 'border-red-500' : ''}`}
                      >
                        <option value="">Seleccionar origen</option>
                        {ORIGENES.map(origen => (
                          <option key={origen.codigo} value={origen.codigo}>
                            {origen.descripcion}
                          </option>
                        ))}
                      </select>
                      {errors.origen && (
                        <p className="mt-2 text-sm text-red-500">{errors.origen}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-base font-medium text-gray-700 mb-2">
                        Destino
                      </label>
                      <input
                        type="text"
                        name="destino"
                        value={formData.destino || ''}
                        onChange={handleChange}
                        disabled={isViewMode}
                        className={`h-12 text-base input-field ${errors.destino ? 'border-red-500' : ''}`}
                        placeholder="Ingrese el destino"
                      />
                      {errors.destino && (
                        <p className="mt-2 text-sm text-red-500">{errors.destino}</p>
                      )}
                    </div>

                    {/* {(mode === 'edit' || mode === 'create') && ( */}
                      <div>
                        <label className="block text-base font-medium text-gray-700 mb-2">
                          Estado
                        </label>
                        <select
                          name="estadoId"
                          value={formData.estadoId}
                          onChange={handleChange}
                          disabled={isViewMode}
                          className={`h-12 text-base input-field ${errors.estadoId ? 'border-red-500' : ''}`}
                        >
                          <option value="">Seleccionar estado</option>
                          {relatedData?.estados?.map(estado => (
                            <option key={estado.codigo} value={estado.codigo}>
                              {estado.descripcion}
                            </option>
                          ))}
                        </select>
                        {errors.estadoId && (
                          <p className="mt-2 text-sm text-red-500">{errors.estadoId}</p>
                        )}
                      </div>
                    {/* )} */}
                  </div>

                  {/* Tercera fila: Combustible, Litros */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-base font-medium text-gray-700 mb-2">
                        Combustible
                      </label>
                      <select
                        name="combustible"
                        value={formData.combustible || ''}
                        onChange={handleChange}
                        disabled={isViewMode}
                        className={`h-12 text-base input-field ${errors.combustible ? 'border-red-500' : ''}`}
                      >
                        <option value="">Seleccionar combustible</option>
                        {COMBUSTIBLES.map(combustible => (
                          <option key={combustible.codigo} value={combustible.codigo}>
                            {combustible.descripcion}
                          </option>
                        ))}
                      </select>
                      {errors.combustible && (
                        <p className="mt-2 text-sm text-red-500">{errors.combustible}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-base font-medium text-gray-700 mb-2">
                        Litros
                      </label>
                      <input
                        type="number"
                        name="litros"
                        value={formData.litros}
                        onChange={handleChange}
                        disabled={isViewMode}
                        className={`h-12 text-base input-field ${errors.litros ? 'border-red-500' : ''}`}
                        min="1"
                        max="30000"
                      />
                      {errors.litros && (
                        <p className="mt-2 text-sm text-red-500">{errors.litros}</p>
                      )}
                    </div>
                  </div>

                  {!isViewMode && (
                    <div className="flex justify-end space-x-4 mt-8">
                      <button
                        type="button"
                        className="btn-secondary px-6 py-3 text-base"
                        onClick={handleClose}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="btn-primary px-6 py-3 text-base"
                      >
                        {mode === 'create' ? 'Crear' : 'Guardar'}
                      </button>
                    </div>
                  )}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

TripModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(['create', 'edit', 'view']),
  trip: PropTypes.shape({
    id: PropTypes.string,
    camion: PropTypes.string,
    conductor: PropTypes.string,
    origen: PropTypes.string,
    destino: PropTypes.string,
    combustible: PropTypes.string,
    estado: PropTypes.shape({
      codigo: PropTypes.string,
      descripcion: PropTypes.string
    }),
    litros: PropTypes.number,
    fecha_salida: PropTypes.string
  }),
  onSave: PropTypes.func.isRequired,
  relatedData: PropTypes.shape({
    estados: PropTypes.array.isRequired
  }).isRequired
};

export default TripModal; 