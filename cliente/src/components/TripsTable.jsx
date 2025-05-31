import { useState, useCallback, useEffect } from 'react';
import { format, parseISO, isValid } from 'date-fns';
import { es } from 'date-fns/locale';
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { viajesApi } from '../services/api';
import TripModal from './TripModal';
import FilterDropdown from './FilterDropdown';
import { useViajesData } from '../hooks/useViajesData';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import { ORIGENES } from '../constants/origenes';
import { COMBUSTIBLES } from '../constants/combustibles';

const formatDate = (dateString) => {
  try {
    if (!dateString) return 'N/A';
    const date = parseISO(dateString);
    if (!isValid(date)) return 'Fecha inválida';
    return format(date, 'PPP HH:mm', { locale: es });
  } catch (error) {
    console.error('Error formateando fecha:', error);
    return 'Error en fecha';
  }
};

const TripsTable = ({ showNewTripModal, onCloseNewTripModal }) => {
  const {
    viajes,
    loading,
    error,
    page,
    totalPages,
    filters,
    estados,
    combustibles,
    setPage,
    handleFilterChange,
    fetchViajes
  } = useViajesData();

  // Estado para el modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedTrip, setSelectedTrip] = useState(null);

  // Efecto para manejar el modal de nuevo viaje desde props
  useEffect(() => {
    if (showNewTripModal) {
      setModalMode('create');
      setSelectedTrip(null);
      setModalOpen(true);
    }
  }, [showNewTripModal]);

  const handleCreateTrip = useCallback(() => {
    setModalMode('create');
    setSelectedTrip(null);
    setModalOpen(true);
  }, []);

  const handleEditTrip = useCallback((trip) => {
    setModalMode('edit');
    setSelectedTrip(trip);
    setModalOpen(true);
  }, []);

  const handleViewTrip = useCallback((trip) => {
    setModalMode('view');
    setSelectedTrip(trip);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    if (modalMode === 'create') {
      onCloseNewTripModal();
    }
  }, [modalMode, onCloseNewTripModal]);

  const handleDeleteTrip = useCallback(async (trip) => {
    if (window.confirm('¿Está seguro de que desea eliminar este viaje?')) {
      try {
        // Verificar que tenemos un ID válido
        if (!trip || !trip._id) {
          throw new Error('ID de viaje no válido');
        }

        // deleteViaje
        await viajesApi.deleteViaje(trip._id);

        toast.success('Viaje cancelado exitosamente');
        fetchViajes(); // Recargar la tabla
      } catch (error) {
        console.error('Error al cancelar el viaje:', error);
        toast.error(error.message || 'Error al cancelar el viaje');
      }
    }
  }, [fetchViajes]);

  const handleSaveTrip = useCallback(async (formData) => {
    try {
      if (modalMode === 'create') {
        await viajesApi.createViaje(formData);
        toast.success('Viaje creado exitosamente');
      } else if (modalMode === 'edit') {
        // Asegurarnos de que tenemos un ID válido
        if (!selectedTrip || !selectedTrip._id) {
          toast.error('Error: ID de viaje no válido');
          return;
        }
        await viajesApi.updateViaje(selectedTrip._id, formData);
        toast.success('Viaje actualizado correctamente!');
      }
      handleCloseModal();
      fetchViajes(); // Recargar la tabla
    } catch (error) {
      console.error('Error al guardar el viaje:', error);
      toast.error(error.response?.data?.message || 'Error al guardar el viaje');
    }
  }, [modalMode, selectedTrip, fetchViajes, handleCloseModal]);

  if (loading) return <div className="text-center py-4">Cargando...</div>;
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

  return (
    <>
      <div className="space-y-4">
        <div className="flex gap-4 mb-4">
          <FilterDropdown
            title="Estado"
            options={estados.filter(e => e.codigo !== 'CANC')}
            value={filters.estado}
            onChange={(value) => handleFilterChange('estado', value)}
          />
          <FilterDropdown
            title="Combustible"
            options={combustibles}
            value={filters.combustible}
            onChange={(value) => handleFilterChange('combustible', value)}
          />
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">ID</th>
                <th className="table-header">Camión</th>
                <th className="table-header">Conductor</th>
                <th className="table-header">Origen</th>
                <th className="table-header">Destino</th>
                <th className="table-header">Combustible</th>
                <th className="table-header">Litros</th>
                <th className="table-header">Estado</th>
                <th className="table-header">Fecha Salida</th>
                <th className="table-header">Acciones</th>
              </tr>
            </thead>
            
            {/*Tabla de viajes*/}
            <tbody className="bg-white divide-y divide-gray-200">
              {viajes.map(viaje => (
                <tr key={viaje._id} className="hover:bg-gray-50">
                  <td className="table-cell">
                    {/*Mostramos sólo los últimos 6 caracteres del ID o N/A si no hay ID*/}
                    {viaje._id ? viaje._id.substring(viaje._id.length - 6) : 'N/A'}
                  </td>
                  <td className="table-cell">{viaje.camion || 'N/A'}</td>
                  <td className="table-cell">{viaje.conductor || 'N/A'}</td>
                  <td className="table-cell">
                    {ORIGENES.find(o => o.codigo === viaje.origen)?.descripcion || viaje.origen || 'N/A'}
                  </td>
                  <td className="table-cell">{viaje.destino || 'N/A'}</td>
                  <td className="table-cell">
                    {COMBUSTIBLES.find(c => c.codigo === viaje.combustible)?.descripcion || viaje.combustible || 'N/A'}
                  </td>
                  <td className="table-cell">{viaje.litros || 'N/A'}</td>
                  <td className="table-cell">
                    <span className={`px-2 py-1 rounded-full text-xs
                      ${viaje.estado?.codigo === 'COMP' ? 'bg-green-100 text-green-800' :
                        viaje.estado?.codigo === 'PROG' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'}`}>
                      {viaje.estado?.descripcion || 'N/A'}
                    </span>
                  </td>
                  <td className="table-cell">
                    {formatDate(viaje.fecha_salida)}
                  </td>
                  {/*Acciones de editar, ver y eliminar*/}
                  <td className="table-cell">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => handleEditTrip(viaje)}
                        title="Editar"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        className="text-gray-600 hover:text-gray-900"
                        onClick={() => handleViewTrip(viaje)}
                        title="Ver detalles"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteTrip(viaje)}
                        title="Cancelar"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/*Paginador*/}
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-700">
            Página {page} de {totalPages}
          </div>
          <div className="space-x-2">
            <button
              className="btn-secondary"
              disabled={page === 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
            >
              Anterior
            </button>
            <button
              className="btn-primary"
              disabled={page === totalPages}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>

      <TripModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        mode={modalMode}
        trip={selectedTrip}
        onSave={handleSaveTrip}
        relatedData={{
          estados: estados,
        }}
      />
    </>
  );
};

TripsTable.propTypes = {
  showNewTripModal: PropTypes.bool,
  onCloseNewTripModal: PropTypes.func
};

export default TripsTable; 