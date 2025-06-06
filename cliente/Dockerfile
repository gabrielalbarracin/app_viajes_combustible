# Etapa de construcción
FROM node:18-alpine as build

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM node:18-alpine

# Instalar serve
RUN npm install -g serve

# Copiar los archivos construidos
COPY --from=build /app/dist /app

# Exponer puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["serve", "-s", "/app", "-l", "3000"] 