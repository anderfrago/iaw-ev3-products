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

## Próximos Pasos (Para Estudiantes)

Este proyecto proporciona una base funcional. Las siguientes tareas se dejan para que los estudiantes las completen y mejoren su comprensión y habilidades:

1.  **Dockerización:** Conteneriza tanto el backend Symfony como el frontend Angular usando Docker y Docker Compose.
2.  **Despliegue en AWS:** Despliega la aplicación contenerizada en Amazon Web Services (AWS) utilizando servicios como Amazon ECS (Elastic Container Service) o AWS Amplify para el frontend, y Amazon RDS para la base de datos MySQL.
3.  **Autenticación/Autorización:** Implementa mecanismos de autenticación y autorización de usuarios (por ejemplo, JWT para la API).
4.  **Mejora de UI/UX:** Mejora la interfaz de usuario y la experiencia de usuario, posiblemente utilizando componentes Bootstrap más avanzados u otras bibliotecas de UI.
5.  **Manejo de Errores:** Implementa un manejo de errores más robusto en el frontend y retroalimentación al usuario.
6.  **Pruebas:** Agrega pruebas unitarias y de extremo a extremo completas tanto para el backend como para el frontend.
7.  **Características Avanzadas:** Agrega características como búsqueda, filtrado, paginación o carga de imágenes para productos.

¡Mucha suerte con tu proyecto final de IAW!