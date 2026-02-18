#Imagen Servidor PHP
FROM php:8.2-fpm-alpine
# Copiamos el código PHP
COPY api/ /var/www/html/
# Damos permisos al usuario www-data
RUN chown -R www-data:www-data /var/www/html