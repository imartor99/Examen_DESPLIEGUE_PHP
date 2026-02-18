# Proyecto PHP y NGINX con Docker

## Frontend
Para el despliegue de esta parte del proyecto usamos un servidor Nginx configurado en _default.conf_ para que escuche por el puerto 80(http) y 443(https), ademas de incluirle el certificado ssl generado y alojado con certbot en nuestro anfitrion ec2.

## Backend 
Para el despliegue del lado del servidor, me he decantando por PHP-FPM un servidor de aplicaciones que interpreta el lenguaje PHP y que conecta con el servidor Nginx a traves de una red interna y un volumen compartido que poseen ambos. Todo ello especificado en nuestro orquestador docker-compose.

```bash

networks:
      - daw-network
    # Volumen compartido 
    volumes:
      - app-data:/var/www/html/uploads

```

## Funcionamiento del despliegue de todo el proyecto

- En primer lugar preparamos nuestro ecosistema con un workflow de actions en el cual copiamos todo el contenido del repositorio, generamos la documentacion automatica con JSDoc alojada finalmente en https://www.nachodaw.com/docs , y creamos tantos las imagenes de Ngingx como de PHP-FPM para subirlas a docker-hub. 

- Posteriormente, hacemos otro jobs en el que entramos en nuestra ec2 por ssh, creo el docker-compose manualmente ahi, se que no es lo correcto y que tiene poco sentido, pero ha sido la unica forma en la que consigo el despliegue con éxito; el docker-compose local me sirvio para el testeo del funcionamiento en fase de pruebas. Volviendo a lo anterior, el docker-compose creado manualmente en la ec2 levanta dos dockers para cada servidor y descargar a cada uno su imagen correspondiente previamente creada y subida.

- En los dockerfile individuales de cada server lo unico que hacemos es bajar la imagen, siempre la ultima versión, se copia sus archivos necesarios cada uno de su parte y en uno de ellos otorgamos permisos.

- Finalmente levantamos todo con docker-compose up.
------------------------------------------------------------
- Este en mi primer intento sin IP elastica.
## ACTUALIZO: Implemento Ip elástica
Tras mirar la documentacion de AWS, asignamos una ip elástica a nuestra EC2. Para ello hemos creado primero, en el apartado Red y seguridad, IP elásticas, una ip elástica, y luego la hemos asociado a nuestra EC2 del examen ya creado y en estado RUNNING. Tras ello, he cambiado tanto lo registros de mi DNS, así como el secrets que hace referencia al EC2_HOST con la ip de la instancia. Hechos los cambios, relanzo el workflow de nuevo y observamos como la web se sigue viendo perfectamente en nuestra URL securizada con funcionamiento perfecto, demostrando asi que esta funcionando la conexion entre nuestro servidor de aplicaciones y el web.
-------------------------------------------------------

URL del REPOSITORIO: https://github.com/imartor99/Examen_DESPLIEGUE_PHP