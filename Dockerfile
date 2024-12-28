# Install PHP dependencies for the Laravel backend
FROM composer:2 AS backend-deps
WORKDIR /app
COPY src/composer.json src/composer.lock ./
RUN composer install --no-dev --optimize-autoloader

# Install Node.js and dependencies for the React frontend
FROM node:20-alpine AS frontend-deps
WORKDIR /app/resources/js
COPY src/package.json src/package-lock.json ./
RUN npm install -g npm && npm install --frozen-lockfile

# Build the frontend assets (Inertia.js with React)
FROM node:20-alpine AS frontend-build
WORKDIR /app/resources/js
COPY --from=frontend-deps /app/resources/js/node_modules ./node_modules
COPY src/resources/js/ .
RUN npm run build

# Build the Laravel backend with frontend assets
FROM php:8.2-fpm AS app
WORKDIR /app
RUN apt-get update && apt-get install -y libzip-dev unzip
RUN docker-php-ext-install zip pdo pdo_mysql

# Copy backend dependencies and application files
COPY --from=backend-deps /app/vendor ./vendor
COPY src/ .

# Copy the built frontend assets into the Laravel public directory
COPY --from=frontend-build /app/resources/js/dist ./public/js

# Optimize Laravel
RUN php artisan config:cache && php artisan route:cache && php artisan view:cache

EXPOSE 3000
CMD ["php-fpm"]
