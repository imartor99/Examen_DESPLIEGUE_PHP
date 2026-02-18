#Imagen Servidor Nginx
FROM nginx:alpine
# Copiamos la configuración
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
# Copiamos el código de Sergio (Frontend)
COPY src/ /usr/share/nginx/html/
# Copiamos la documentación generada (el truco del ONBUILD de antes ya no aplica, lo haremos en local)
COPY docs_generated/ /usr/share/nginx/html/docs/