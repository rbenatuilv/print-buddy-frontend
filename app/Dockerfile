# ---------- Stage 1: build ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Variables del build (para Vite)
ARG VITE_API_BASE_URL
ARG VITE_CONTACT_NAME
ARG VITE_CONTACT_NUMBER

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_CONTACT_NAME=$VITE_CONTACT_NAME
ENV VITE_CONTACT_NUMBER=$VITE_CONTACT_NUMBER

# Instalar dependencias y compilar
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build


# ---------- Stage 2: Nginx ----------
FROM nginx:stable-alpine

# Instalamos envsubst (parte de gettext)
RUN apk add --no-cache gettext

# Copiar el frontend compilado
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar la plantilla del archivo de configuración
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Exponer el puerto HTTP
EXPOSE 80

# Usamos envsubst para reemplazar variables al inicio
CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
