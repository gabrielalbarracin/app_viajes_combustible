import { useState, useEffect, useCallback } from 'react';
import { viajesApi } from '../services/api';
import { COMBUSTIBLES } from '../constants/combustibles';

export const useViajesData = () => {
  const [viajes, setViajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [estados, setEstados] = useState([]);
  const [filters, setFilters] = useState({
    estado: '',
    combustible: ''
  });
  const [viajesOriginales, setViajesOriginales] = useState([]);

  // Obtener estados
  const fetchEstados = useCallback(async () => {
    try {
      const response = await viajesApi.getEstados();
      //console.log('Respuesta completa de estados:', response);
      
      // Si la respuesta es directamente el array de estados
      if (Array.isArray(response)) {
        console.log('Estados es un array directo:', response);
        setEstados(response);
        return;
      }
      
      // Si la respuesta tiene estructura {success, data}
      if (response.success && Array.isArray(response.data)) {
        //console.log('Estados dentro de response.data:', response.data);
        setEstados(response.data);
        return;
      }

      // Si llegamos aquí, el formato es inválido
      console.error('Formato de estados inválido. Respuesta:', response);
      setEstados([]);
    } catch (error) {
      console.error('Error al obtener estados:', error);
      setEstados([]);
    }
  }, []);

  // Obtener viajes
  const fetchViajes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await viajesApi.getViajes();
      if (response.success && Array.isArray(response.data)) {
        setViajesOriginales(response.data);
        setError(null);
      } else if (Array.isArray(response)) {
        setViajesOriginales(response);
        setError(null);
      }
    } catch (error) {
      setError(error.message || 'Error al cargar los viajes');
      console.error('Error al obtener viajes:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // filtro sobre la tabla 
  useEffect(() => {
    let viajesFiltrados = [...viajesOriginales];
    
    // Aplicar filtro de estado
    if (filters.estado) {
      viajesFiltrados = viajesFiltrados.filter(viaje => 
        viaje.estado?.codigo === filters.estado
      );
    }

    // Aplicar filtro de combustible
    if (filters.combustible) {
      viajesFiltrados = viajesFiltrados.filter(viaje => 
        viaje.combustible === filters.combustible
      );
    }

    setViajes(viajesFiltrados);
    setTotalPages(Math.ceil(viajesFiltrados.length / 10));
  }, [filters, viajesOriginales]);

  // Cargar datos iniciales
  useEffect(() => {
    fetchEstados();
    fetchViajes();
  }, [fetchEstados, fetchViajes]);

  // Debug: Monitorear cambios en estados
  useEffect(() => {
    console.log('Estado actual de estados:', estados);
  }, [estados]);

  // Manejar cambios en los filtros
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    setPage(1);
  };

  return {
    viajes,
    loading,
    error,
    page,
    totalPages,
    filters,
    estados,
    combustibles: COMBUSTIBLES,
    setPage,
    handleFilterChange,
    fetchViajes
  };
}; 