import { useState } from 'react';
import Navbar from '../components/Navbar';
import TripsTable from '../components/TripsTable';

const Dashboard = () => {
  const [showNewTripModal, setShowNewTripModal] = useState(false);
  // Después separar componente viajes en otro archivo 
  return (
    <div className="min-h-screen bg-background-secondary">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Gestión de Viajes</h2>
            <button 
              className="btn-primary"
              onClick={() => setShowNewTripModal(true)}
            >
              Nuevo Viaje
            </button>
          </div>
          <TripsTable showNewTripModal={showNewTripModal} onCloseNewTripModal={() => setShowNewTripModal(false)} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 