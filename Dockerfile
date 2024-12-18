# Imagen base de Node.js
FROM node:18-alpine

# Configuración del directorio de trabajo
WORKDIR /app

# Copiar los archivos del proyecto
COPY package*.json ./
RUN npm install
COPY . .

# Construye el proyecto
RUN npm run build

# Expon el puerto que usa tu aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:prod"]
