# Backend - Sistema de Gestión de Viajes

## Descripción
API REST para la gestión de viajes de transporte de combustible. Permite administrar viajes, conductores, destinos y estados de viajes.

## Estructura del Proyecto
```
servidor/
├── src/
│   ├── config/           # Configuraciones (base de datos, variables de entorno)
│   ├── controllers/      # Controladores de la aplicación
│   │   ├── viajeController.js
│   │   └── estadoController.js
│   ├── models/          # Modelos de datos
│   │   ├── index.js
│   │   ├── Estado.js
│   │   └── Viaje.js
│   ├── routes/          # Rutas de la API
│   │   ├── viajeRoutes.js
│   │   └── estadoRoutes.js
│   ├── validations/     # Validaciones de datos
│   │   └── viajeValidations.js
│   ├── middlewares/     # Middlewares personalizados
│   │   └── auth.js
│   └── app.js          # Punto de entrada de la aplicación
```

## Funcionalidades Principales

### Gestión de Viajes
- **Crear Viaje**: POST `/api/viajes`
  - Campos requeridos:
    - camion (string)
    - conductor (string)
    - origen (string, selección de ubicaciones predefinidas)
    - destino (string)
    - combustible (string)
    - litros (number, 1-30000)
    - fecha_salida (datetime)
    - estadoId (string)

- **Obtener Viajes**: GET `/api/viajes`
  - Lista todos los viajes activos (no cancelados)
  - Ordenados por fecha de salida descendente
  - Incluye información del estado

- **Actualizar Viaje**: PUT `/api/viajes/:id`
  - Permite modificar cualquier campo del viaje
  - Validación de datos antes de la actualización

- **Cancelar Viaje**: DELETE `/api/viajes/:id`
  - Cambia el estado del viaje a 'CANC' (Cancelado)
  - No elimina el registro de la base de datos

### Gestión de Estados
- **Obtener Estados**: GET `/api/estados`
  - Lista todos los estados disponibles
  - Estados predefinidos:
    - PROG: Programado
    - COMP: Completado
    - CANC: Cancelado

## Validaciones
- Validación de campos requeridos
- Validación de formato de fechas
- Validación de rango de litros (1-30000)
- Validación de estados válidos
- Validación de orígenes predefinidos

## Modelos de Datos

### Viaje
```javascript
{
  camion: String,          // Patente del camión
  conductor: String,       // Nombre del conductor
  origen: String,          // Ubicación de origen predefinida
  destino: String,        // Destino del viaje
  combustible: String,    // Tipo de combustible
  litros: Number,        // Cantidad de litros (1-30000)
  fecha_salida: Date,    // Fecha y hora de salida
  estadoId: String,      // Referencia al estado del viaje
}
```

1. Instalar las dependencias:
```bash
npm install
```

## Configuración y Despliegue

### Requisitos Previos
- Node.js >= 14.x
- MongoDB >= 4.x
- npm o yarn

### Variables de Entorno
Crear un archivo `.env` en la raíz del proyecto tomar el .env.example como ejemplo


### Instalación
```bash
# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev

# Iniciar en modo producción
npm start
```

### Scripts Disponibles
- `npm start`: Inicia el servidor en modo producción
- `npm run dev`: Inicia el servidor en modo desarrollo con hot-reload
- `npm test`: Ejecuta las pruebas
- `npm run lint`: Ejecuta el linter

## Seguridad
- Autenticación mediante JWT
- Validación de datos en todas las rutas
- Sanitización de entradas
- Manejo seguro de errores
- Logs detallados para debugging

## API Endpoints

### Viajes
- `GET /api/viajes` - Listar viajes
- `GET /api/viajes/:id` - Obtener un viaje específico
- `POST /api/viajes` - Crear nuevo viaje
- `PUT /api/viajes/:id` - Actualizar viaje
- `DELETE /api/viajes/:id` - Cancelar viaje

### Estados
- `GET /api/estados` - Listar estados disponibles

## Manejo de Errores
La API devuelve respuestas consistentes para los errores:
```javascript
{
  success: false,
  message: "Mensaje descriptivo del error",
  error: "Detalles técnicos (solo en desarrollo)"
}
```

## Contribución
1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

