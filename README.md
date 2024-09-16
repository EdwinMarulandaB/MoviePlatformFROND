# Movie Platform Frontend

Este proyecto es una plataforma de gestión de películas desarrollada con Angular.

## Características

- Creación y gestión de películas.
- Listado de películas con filtros y ordenamiento.
- Vista de detalles y previsualización de películas.
- Integración con una API para la gestión de datos.
- Uso de Bootstrap para el diseño de la interfaz.

## Requisitos

- Node.js
- Angular CLI

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/EdwinMarulandaB/MoviePlatformFROND.git
## Dependencias principales
- Angular ^15.2.0
- Bootstrap ^5.3.3
- FontAwesome ^6.6.0
- RxJS ~7.8.0

## Notas
En la carpeta ubicada en src/app/services el archivo movie.service.ts esta es la estructura para hacer la conexion a la api.

this.myAppUrl = 'http://localhost:8080/';
this.myApiUrl = 'api/movies';

Se debe cambiar en caso de que el backed se ejecute en otro puerto.
