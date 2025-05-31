import { Link, useLocation } from 'react-router-dom';
import {
  TruckIcon,
  UserGroupIcon,
  BeakerIcon,
  MapPinIcon,
  ClipboardDocumentListIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { authApi } from '../services/api';

const navigation = [
  { name: 'Viajes', icon: TruckIcon, href: '/dashboard' },
  { name: 'Conductores', icon: UserGroupIcon, href: '/' },
  { name: 'Combustibles', icon: BeakerIcon, href: '/' },
  { name: 'Destinos', icon: MapPinIcon, href: '/' },
  //{ name: 'Estados', icon: ClipboardDocumentListIcon, href: '/' },
];

const Navbar = () => {
  const location = useLocation();
  
  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <img src="/images/logo.png" alt="Logo" className="h-8 w-auto" />
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      inline-flex items-center px-1 pt-1 text-sm font-medium
                      ${isActive 
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    <item.icon className="h-5 w-5 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 