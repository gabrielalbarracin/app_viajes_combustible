# Kadre - Sistema de Gestión de Viajes

## Descripción
Sistema de gestión de viajes desarrollado con React (Frontend) y Node.js (Backend), utilizando MongoDB como base de datos.

## Requisitos Previos
- Docker
- Docker Compose

## Configuración con Docker

### Paso 1: Clonar el Repositorio
```bash
git clone <url-del-repositorio>
cd Challenge_Kadre
```

### Paso 2: Configurar Variables de Entorno
Se explica en el Readme del servidor

### Paso 3: Construir y Ejecutar con Docker Compose
```bash
# Construir las imágenes
docker-compose build

# Levantar todos los servicios
docker-compose up -d

# Para ver los logs
docker-compose logs -f
```

Los servicios estarán disponibles en:
- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- MongoDB: mongodb://localhost:27017

### Comandos Útiles de Docker

```bash
# Detener todos los servicios
docker-compose down

# Reiniciar un servicio específico
docker-compose restart [servicio]

# Ver logs de un servicio específico
docker-compose logs -f [servicio]

# Eliminar volúmenes (¡cuidado! esto borrará la base de datos)
docker-compose down -v
```

### Servicios Disponibles
- **frontend**: Aplicación React
- **backend**: API Node.js
- **mongodb**: Base de datos MongoDB

## Desarrollo Local (sin Docker)

Si prefieres desarrollar sin Docker, puedes ejecutar cada servicio individualmente:

### Frontend
```bash
cd cliente
npm install
npm run dev
```

### Backend
```bash
cd servidor
npm install
npm run dev
```

### Base de Datos
Necesitarás tener MongoDB instalado localmente o usar un servicio en la nube.

## Solución de Problemas

### Problemas Comunes
1. **Error de conexión a MongoDB**: Asegúrate de que el servicio de MongoDB esté corriendo y accesible.
2. **Error de CORS**: Verifica que las variables de entorno CORS_ORIGIN estén correctamente configuradas.
3. **Puertos en uso**: Asegúrate de que los puertos 3000, 4000 y 27017 estén disponibles.

### Reinicio Limpio
Si necesitas empezar desde cero:
```bash
# Detener y eliminar todo
docker-compose down -v

# Eliminar imágenes
docker rmi kadre-frontend kadre-backend

# Reconstruir y reiniciar
docker-compose up -d --build
``` 