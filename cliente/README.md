# Frontend - Sistema de Gestión de Viajes

## Descripción
Aplicación web desarrollada en React para la gestión de viajes de transporte de combustible. Interfaz moderna y responsive que permite administrar viajes, visualizar estados y gestionar la información de manera eficiente.

## Estructura del Proyecto
```
cliente/
├── src/
│   ├── components/           # Componentes React reutilizables
│   │   ├── TripModal.jsx    # Modal para crear/editar viajes
│   │   ├── TripsTable.jsx   # Tabla principal de viajes
│   │   └── FilterDropdown.jsx # Componente de filtrado
│   ├── constants/           # Constantes y configuraciones
│   │   ├── combustibles.js  # Tipos de combustible
│   │   └── origenes.js      # Ubicaciones de origen
│   ├── hooks/              # Custom hooks
│   │   ├── useViajeForm.js # Lógica del formulario
│   │   └── useViajesData.js # Gestión de datos
│   ├── services/          # Servicios y APIs
│   │   └── api.js        # Cliente API
│   ├── styles/           # Estilos CSS
│   └── App.jsx          # Componente principal
```

## Funcionalidades Principales

### Gestión de Viajes
- **Lista de Viajes**
  - Visualización en tabla con ordenamiento
  - Filtros por estado y combustible
  - Paginación de resultados
  - Visualización de últimos 6 caracteres del ID

- **Creación de Viajes**
  - Formulario validado
  - Selección de origen predefinido
  - Selección de tipo de combustible
  - Validación de litros (1-30000)
  - Selección de fecha y hora de salida

- **Edición de Viajes**
  - Modificación de todos los campos
  - Preservación de datos existentes
  - Validaciones en tiempo real

- **Cancelación de Viajes**
  - Confirmación antes de cancelar
  - Actualización automática de la tabla
  - Feedback visual del resultado

### Filtros y Búsqueda
- Filtrado por estado de viaje
- Filtrado por tipo de combustible
- Actualización en tiempo real de resultados

## Componentes Principales

### TripsTable
- Tabla principal con las siguientes columnas:
  - ID (últimos 6 caracteres)
  - Camión
  - Conductor
  - Origen
  - Destino
  - Combustible
  - Litros
  - Estado
  - Fecha de Salida
  - Acciones (Editar, Ver, Cancelar)

### TripModal
- Modal responsive para crear/editar viajes
- Organizado en tres filas:
  1. Camión, Conductor, Fecha de Salida
  2. Origen, Destino, Estado
  3. Combustible, Litros

### FilterDropdown
- Componente reutilizable para filtros
- Soporte para múltiples tipos de filtrado
- Diseño consistente con la UI

## Tecnologías Utilizadas
- React 18
- Tailwind CSS
- Date-fns para manejo de fechas
- React Hot Toast para notificaciones
- Headless UI para componentes accesibles
- Heroicons para iconografía

## Configuración y Despliegue

### Requisitos Previos
- Node.js >= 14.x
- npm o yarn
- Backend en ejecución

### Variables de Entorno


### Instalación
```bash
# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

### Scripts Disponibles
- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run preview`: Previsualiza el build de producción
- `npm run lint`: Ejecuta el linter

## Características de UX/UI
- Diseño responsive
- Feedback visual inmediato
- Mensajes de error claros
- Confirmaciones para acciones importantes
- Indicadores de carga


## Validaciones del Formulario
- Campos requeridos
- Formato de patente de camión
- Rango válido de litros
- Fecha de salida válida
- Selección de origen válido
- Tipo de combustible válido

## Manejo de Errores
- Mensajes de error descriptivos
- Fallbacks para datos no disponibles
- Manejo de estados de carga

## Integración con Backend
- Comunicación mediante API REST
- Manejo de tokens JWT
- Refresco automático de datos
- Manejo de errores de red

## Mejores Prácticas Implementadas
- Componentes reutilizables
- Custom hooks para lógica común
- Manejo de estado eficiente
- Code splitting
- Optimización de rendimiento

