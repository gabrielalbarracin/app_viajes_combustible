import { Menu } from '@headlessui/react';
import { FunnelIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';
import { memo } from 'react';

const FilterDropdown = memo(({ title, options, value, onChange }) => (
  <Menu as="div" className="relative inline-block text-left">
    <Menu.Button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
      <FunnelIcon className="h-4 w-4 mr-2" />
      {title}
      <ChevronDownIcon className="h-4 w-4 ml-2" />
    </Menu.Button>
    <Menu.Items className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div className="py-1">
        <Menu.Item>
          <button
            className={`block px-4 py-2 text-sm w-full text-left ${!value ? 'bg-primary/10 text-primary' : 'text-gray-700'}`}
            onClick={() => onChange('')}
          >
            Todos
          </button>
        </Menu.Item>
        {options.map((option) => (
          <Menu.Item key={option.codigo}>
            <button
              className={`block px-4 py-2 text-sm w-full text-left ${value === option.codigo ? 'bg-primary/10 text-primary' : 'text-gray-700'}`}
              onClick={() => onChange(option.codigo)}
            >
              {option.descripcion}
            </button>
          </Menu.Item>
        ))}
      </div>
    </Menu.Items>
  </Menu>
));

FilterDropdown.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      codigo: PropTypes.string.isRequired,
      descripcion: PropTypes.string.isRequired
    })
  ).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

FilterDropdown.displayName = 'FilterDropdown';

export default FilterDropdown; 