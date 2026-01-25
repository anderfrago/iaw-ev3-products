# Guía de Despliegue: De Local a Docker Swarm en AWS

Esta guía documenta la evolución de la infraestructura de este proyecto, explicando el **por qué** y el **cómo** de cada fase.

---

## Fase 1: Desarrollo Local Nativo

En esta fase, la aplicación se ejecuta directamente sobre el sistema operativo del desarrollador.

### El "Por qué" (Teoría)
El desarrollo nativo es la forma más rápida de empezar. Permite una depuración inmediata y no requiere capas de abstracción adicionales. Sin embargo, tiene el problema de *"en mi máquina funciona"*: las diferencias en versiones de PHP, Node.js o librerías del sistema entre desarrolladores pueden causar errores difíciles de replicar.

### El "Cómo" (Paso a paso)
1.  **Backend**:
    *   Instalar PHP 8.2 y Composer.
    *   Ejecutar `composer install`.
    *   Configurar un servidor MySQL local y crear la base de datos.
    *   Configurar el archivo `.env` con las credenciales locales.
    *   Ejecutar migraciones: `php bin/console doctrine:migrations:migrate`.
    *   Iniciar servidor: `symfony serve`.
2.  **Frontend**:
    *   Instalar Node.js y npm.
    *   Ejecutar `npm install`.
    *   Iniciar servidor de desarrollo: `ng serve`.

---

## Fase 2: Dockerización (Entorno Local)

Introducimos contenedores para estandarizar el entorno de ejecución.

### El "Por qué" (Teoría)
Docker empaqueta la aplicación con todas sus dependencias. Esto garantiza que la aplicación se ejecute **exactamente igual** en cualquier máquina. Usamos `Dockerfile` para definir cada servicio y `docker-compose.yml` para orquestarlos (base de datos + backend + frontend).

### El "Cómo" (Paso a paso)
1.  **Crear Dockerfiles**: Definir la imagen base (PHP con Apache para backend, Node para build de frontend y Nginx para servir).
2.  **Configurar Orquestación**: Crear un `docker-compose.yml` que defina los volúmenes, redes y variables de entorno.
3.  **Ejecutar**:
    ```bash
    sudo docker compose up --build -d
    ```
4.  **Networking**: Aprendimos que el frontend (en el navegador) no puede ver "backend" como nombre de host, por lo que usamos Nginx como **Reverse Proxy** para redirigir tráfico interno dentro de la red de Docker.

---

## Fase 3: Docker Hub (Distribución de Imágenes)

Subimos nuestras imágenes preparadas a un registro centralizado.

### El "Por qué" (Teoría)
Para desplegar en servidores remotos (como AWS), no queremos subir el código fuente y compilarlo allí. Es más eficiente y seguro subir la **imagen ya construida** a un registro (Docker Hub). Esto permite que cualquier servidor con Docker pueda simplemente "tirar" (`pull`) de la imagen y ejecutarla.

### El "Cómo" (Paso a paso)
1.  **Tagging**: Etiquetar las imágenes locales con el nombre del repositorio:
    ```bash
    docker tag iaw-backend anderfrago/iaw-backend:latest
    ```
2.  **Login**: Autenticarse en el registro:
    ```bash
    docker login -u anderfrago
    ```
3.  **Push**: Subir las imágenes:
    ```bash
    docker push anderfrago/iaw-backend:latest
    ```

---

## Fase 4: AWS y Docker Swarm (Producción)

Desplegamos en un clúster escalable en la nube.

### El "Por qué" (Teoría)
**Docker Swarm** es un orquestador que gestiona un grupo de servidores (nodos). Proporciona:
- **Alta disponibilidad**: Si un contenedor falla, Swarm levanta otro automáticamente.
- **Escalabilidad**: Podemos ejecutar muchas réplicas de nuestro frontend fácilmente.
- **Networking de Clúster**: Gestiona el balanceo de carga entre nodos.
En **AWS**, esto se suele montar sobre instancias EC2 o gestionarse mediante servicios como ECS (Elastic Container Service).

### El "Cómo" (Paso a paso)
1.  **Preparar el servidor**: Instalar Docker en las instancias de AWS.
2.  **Inicializar el Clúster**:
    ```bash
    sudo docker swarm init
    ```
3.  **Configurar el Stack**: Actualizar `docker-compose.yml` para usar las imágenes de Docker Hub (ya no necesitamos el código fuente en el servidor de destino).
4.  **Desplegar**:
    ```bash
    sudo docker stack deploy -c docker-compose.yml mi_app_stack
    ```
5.  **Monitorear**:
    ```bash
    sudo docker stack services mi_app_stack
    ```

---

### Conclusión
Hemos pasado de un desarrollo manual y frágil a una infraestructura **moderna, automatizada y escalable**, lista para producción en la nube.
