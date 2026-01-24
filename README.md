# Proyecto CRUD de Productos IAW EV3

Este repositorio contiene una sencilla aplicación web diseñada como proyecto final para el curso de "Implantación de Aplicaciones Web" (IAW). Demuestra un CRUD (Crear, Leer, Actualizar, Eliminar) básico para productos utilizando un backend Symfony y un frontend Angular (versión 20 con Signals).

## Arquitectura del Proyecto

El proyecto se divide en dos partes principales:

*   **`iaw-ev3-products-backend`**: Una aplicación Symfony que actúa como el backend de la API.
*   **`iaw-ev3-products-frontend`**: Una aplicación Angular 20 con una arquitectura `core` y `shared`, utilizando Angular Signals para la gestión del estado y la API nativa `fetch` para las solicitudes HTTP.

## Características

*   **Gestión de Productos:**
    *   Listar todos los productos.
    *   Ver detalles de un solo producto.
    *   Crear nuevos productos.
    *   Editar productos existentes.
    *   Eliminar productos.
*   **Generación de Datos Ficticios:** Un comando de Symfony para poblar rápidamente la base de datos con datos de productos falsos para fines de prueba.
*   **Interfaz de Usuario Responsiva:** Estilo básico con Bootstrap 5.

## Tecnologías Utilizadas

### Backend (Symfony)

*   **Symfony 6.4:** Framework PHP.
*   **Doctrine ORM:** Mapeador Objeto-Relacional para la interacción con la base de datos.
*   **NelmioCORSBundle:** Gestiona el Intercambio de Recursos de Origen Cruzado (CORS).
*   **FakerPHP:** Para generar datos ficticios.
*   **MySQL:** Sistema de gestión de bases de datos.

### Frontend (Angular)

*   **Angular 20:** Framework frontend.
*   **Angular Signals:** Para la gestión reactiva del estado.
*   **API nativa `fetch`:** Para realizar solicitudes HTTP.
*   **Bootstrap 5:** Framework CSS para estilizar.

## Configuración y Ejecución

Para ejecutar este proyecto, necesitarás:

*   PHP (8.1 o superior, compatible con Symfony 6.4)
*   Composer
*   Node.js (versión LTS)
*   npm
*   Servidor MySQL
*   Symfony CLI (recomendado para `symfony serve`)

### 1. Configuración del Backend

1.  **Navega al directorio del backend:**
    ```bash
    cd iaw-ev3-products-backend
    ```
2.  **Instala las dependencias de PHP:**
    ```bash
    composer install
    ```
3.  **Configura la Base de Datos:**
    *   Asegúrate de que tu servidor MySQL esté funcionando.
    *   Crea una base de datos llamada `db_products`.
    *   Actualiza la `DATABASE_URL` en el archivo `.env` con tus credenciales de MySQL:
        ```env
        DATABASE_URL="mysql://root:Cuatrovientos25!@127.0.0.1:3306/db_products?serverVersion=8.0.32&charset=utf8mb4"
        ```
        (Ajusta `root`, `Cuatrovientos25!`, `127.0.0.1:3306` y `serverVersion` según tu configuración de MySQL).
4.  **Ejecuta las Migraciones:**
    ```bash
    php bin/console doctrine:migrations:migrate
    ```
    Confirma con `yes` cuando se te solicite.
5.  **Genera Datos Ficticios (Opcional):**
    ```bash
    php bin/console app:generate-products
    ```
    Sigue las instrucciones para especificar cuántos productos generar.
6.  **Inicia el servidor Symfony:**
    ```bash
    symfony serve
    # O para un servidor web PHP simple:
    # php -S 127.0.0.1:8000 -t public
    ```
    La API del backend estará disponible en `http://localhost:8000`.

### 2. Configuración del Frontend

1.  **Abre una nueva terminal y navega al directorio del frontend:**
    ```bash
    cd iaw-ev3-products-frontend
    ```
2.  **Instala las dependencias de Node.js:**
    ```bash
    npm install
    ```
3.  **Inicia el servidor de desarrollo de Angular:**
    ```bash
    ng serve
    ```
    La aplicación Angular se abrirá típicamente en tu navegador en `http://localhost:4200`.

### 3. Uso

Accede a la aplicación Angular en tu navegador (por ejemplo, `http://localhost:4200`). Ahora puedes:

*   Ver la lista de productos.
*   Agregar nuevos productos usando el botón "Add New Product".
*   Editar productos existentes usando el botón "Edit".
*   Eliminar productos usando el botón "Delete".

## Dockerización y despliegue

Este proyecto ha sido actualizado para soportar completamente la contenerización con Docker.

### Pasos seguidos para la Dockerización

1.  **Limpieza de Git:** Se revirtió el merge incorrecto en la rama `main` para asegurar un punto de partida limpio.
2.  **Configuración del Backend:**
    *   Se creó un `.dockerignore` para excluir `vendor`, `var/cache`, etc.
    *   Se optimizó el `Dockerfile` de Symfony usando caché de capas para las dependencias de Composer.
3.  **Configuración del Frontend:**
    *   Se configuró un `Dockerfile` multi-etapa.
    *   Se cambió el servidor de Apache a **Nginx** para un mejor soporte de Single Page Applications (SPA).
    *   Se añadió un archivo `nginx.conf` personalizado para gestionar el enrutamiento de Angular.
4.  **Orquestación con Docker Compose:**
    *   Se creó un `docker-compose.yml` que levanta la base de datos MySQL, el backend y el frontend, configurando correctamente las variables de entorno y el networking.

### Ejecución con Docker Compose

Para lanzar la aplicación localmente con Docker Compose:

```bash
docker compose up -d
```

La aplicación estará disponible en:
*   Frontend: `http://localhost:4200`
*   Backend: `http://localhost:8000`

---

### Despliegue con Docker Swarm

Docker Swarm permite desplegar la aplicación en un clúster de nodos. Sigue estos pasos para desplegar el stack:

1.  **Inicializar Swarm (si no está hecho):**
    ```bash
    docker swarm init
    ```

2.  **Construir las imágenes (opcional si usas un registro):**
    Asegúrate de que las imágenes estén construidas localmente o subidas a un registro accesible por los nodos del Swarm.
    ```bash
    docker compose build
    ```

3.  **Desplegar el Stack:**
    Utiliza el archivo `docker-compose.yml` para desplegar el stack de servicios.
    ```bash
    docker stack deploy -c docker-compose.yml products_stack
    ```

4.  **Verificar el estado:**
    ```bash
    docker stack services products_stack
    ```

5.  **Eliminar el Stack:**
    ```bash
    docker stack rm products_stack
    ```

> [!IMPORTANT]
> Para despliegues en producción con Swarm, se recomienda cambiar las contraseñas por defecto y utilizar `secrets` de Docker para gestionar credenciales sensibles.

---

## Próximos Pasos (Para Estudiantes)

Este proyecto proporciona una base funcional. Las siguientes tareas se dejan para que los estudiantes las completen y mejoren su comprensión y habilidades:

1.  **Despliegue en AWS:** Despliega la aplicación contenerizada en Amazon Web Services (AWS) utilizando servicios como Amazon ECS (Elastic Container Service) o AWS Amplify para el frontend, y Amazon RDS para la base de datos MySQL.
2.  **Autenticación/Autorización:** Implementa mecanismos de autenticación y autorización de usuarios (por ejemplo, JWT para la API).
3.  **Mejora de UI/UX:** Mejora la interfaz de usuario y la experiencia de usuario, posiblemente utilizando componentes Bootstrap más avanzados u otras bibliotecas de UI.
4.  **Manejo de Errores:** Implementa un manejo de errores más robusto en el frontend y retroalimentación al usuario.
5.  **Pruebas:** Agrega pruebas unitarias y de extremo a extremo completas tanto para el backend como para el frontend.
6.  **Características Avanzadas:** Agrega características como búsqueda, filtrado, paginación o carga de imágenes para productos.

¡Mucha suerte con tu proyecto final de IAW!