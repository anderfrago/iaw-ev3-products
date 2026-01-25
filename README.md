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

## Despliegue y Ejecución

Esta aplicación está completamente preparada para ejecutarse en entornos de contenedores utilizando las imágenes publicadas en Docker Hub.

### Pre-requisitos
*   Docker y Docker Compose instalados.
*   (Opcional) Docker Swarm inicializado para despliegues en clúster.

### 1. Ejecución con Docker Compose (Local)

Para lanzar la aplicación rápidamente en tu máquina local:

```bash
# Descargar e iniciar los contenedores
sudo docker compose up -d
```

La aplicación estará disponible en:
*   **Frontend**: [http://localhost:4200](http://localhost:4200)
*   **Backend (API)**: [http://localhost:8000/api/products/](http://localhost:8000/api/products/)

> [!NOTE]
> Al iniciar el backend por primera vez, se ejecutarán automáticamente las migraciones de la base de datos y se generarán 10 productos de prueba mediante Faker.

### 2. Despliegue con Docker Swarm (Clúster)

Si deseas desplegar la aplicación en un entorno de producción o clúster:

1.  **Inicializar Swarm** (si no está hecho):
    ```bash
    sudo docker swarm init
    ```

2.  **Desplegar el Stack**:
    ```bash
    sudo docker stack deploy -c docker-compose.yml products_stack
    ```

3.  **Verificar Servicios**:
    ```bash
    sudo docker stack services products_stack
    ```

## Detalles de la Dockerización

### Automatización y Conectividad
*   **Backend**: Utiliza un `docker-entrypoint.sh` personalizado que espera a que la base de datos esté lista, ejecuta `doctrine:migrations:migrate` y puebla la tabla con `app:generate-products`.
*   **Frontend**: Configurado con **Nginx** actuando como **Reverse Proxy**. Todas las llamadas a `/api/*` son redirigidas internamente al contenedor `backend`, lo que facilita el despliegue en Swarm sin exponer puertos internos innecesarios.
*   **Imágenes**: Disponibles públicamente en Docker Hub:
    *   `anderfrago/iaw-ev3-products-frontend:latest`
    *   `anderfrago/iaw-ev3-products-backend:latest`

## Próximos Pasos (Para Estudiantes)

Este proyecto proporciona una base funcional. Las siguientes tareas se dejan para que los estudiantes las completen y mejoren su comprensión y habilidades:

1.  **Despliegue en AWS:** Despliega la aplicación contenerizada en Amazon Web Services (AWS) utilizando servicios como Amazon ECS (Elastic Container Service) o AWS Amplify para el frontend, y Amazon RDS para la base de datos MySQL.
2.  **Autenticación/Autorización:** Implementa mecanismos de autenticación y autorización de usuarios (por ejemplo, JWT para la API).
3.  **Mejora de UI/UX:** Mejora la interfaz de usuario y la experiencia de usuario, posiblemente utilizando componentes Bootstrap más avanzados u otras bibliotecas de UI.
4.  **Manejo de Errores:** Implementa un manejo de errores más robusto en el frontend y retroalimentación al usuario.
5.  **Pruebas:** Agrega pruebas unitarias y de extremo a extremo completas tanto para el backend como para el frontend.
6.  **Características Avanzadas:** Agrega características como búsqueda, filtrado, paginación o carga de imágenes para productos.

¡Mucha suerte con tu proyecto final de IAW!