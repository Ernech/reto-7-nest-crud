# Usar una imagen base de Node.js
FROM node:18-alpine

# Crear el directorio de la aplicación
WORKDIR /usr/src/app

# Copiar el package.json y el package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Compilar el proyecto
RUN npm run build

# Exponer el puerto 8080
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["node", "dist/main.js"]
