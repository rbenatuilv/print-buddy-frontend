#!/bin/bash
# redeploy.sh - Script to deploy the frontend

# Variables
CONTAINER_NAME="print-buddy-frontend"
IMAGE_NAME="print-buddy-frontend"
REPO_DIR="$HOME/print-buddy-frontend"  # Cambia esto si tu repo está en otra carpeta

# Entrar al directorio del repo
cd "$REPO_DIR" || exit

# Traer los últimos cambios
git pull

# Reconstruir la imagen
docker build -t "$IMAGE_NAME" ./app/

# Detener y eliminar el contenedor antiguo (si existe)
docker stop "$CONTAINER_NAME" 2>/dev/null || true
docker rm "$CONTAINER_NAME" 2>/dev/null || true

# Levantar el contenedor nuevo
docker run -d -p 8080:80 --name "$CONTAINER_NAME" "$IMAGE_NAME"

echo "✅ Frontend redeployed!"