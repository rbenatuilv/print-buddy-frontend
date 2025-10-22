# Stage 1: build
FROM node:20-alpine AS builder

WORKDIR /app

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

ARG VITE_CONTACT_NAME
ENV VITE_CONTACT_NAME=$VITE_CONTACT_NAME

ARG VITE_CONTACT_NUMBER
ENV VITE_CONTACT_NUMBER=$VITE_CONTACT_NUMBER

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar todo el código
COPY . .

# Construir la app
RUN npm run build

# Stage 2: serve with nginx
FROM nginx:stable-alpine

# Copiar la build del frontend al contenedor de nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
