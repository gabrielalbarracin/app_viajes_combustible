# Usar node 18 como base
FROM node:18-alpine

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

# Instalar serve para servir la aplicación
RUN npm install -g serve

# Exponer puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["serve", "-s", "dist", "-l", "3000"] 