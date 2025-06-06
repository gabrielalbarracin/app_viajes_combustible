# Usar node 18 como base
FROM node:18-alpine

# Instalar dependencias necesarias para bcrypt
RUN apk add --no-cache python3 make g++ gcc

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer puerto 4000
EXPOSE 4000

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev"] 