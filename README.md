# practica1Angular
# 📌 Proyecto de Gestión de Tareas

Este proyecto permite gestionar tareas con una base de datos MySQL y un frontend desarrollado en Angular. A continuación, se explican los pasos para desplegar la aplicación correctamente.

---

## 🛠 **Requisitos Previos**
Antes de comenzar, asegúrate de tener instalado en tu sistema:
- **Node.js** y **npm** (https://nodejs.org/)
- **Angular CLI** (Instalar con `npm install -g @angular/cli`)
- **MySQL** (https://www.mysql.com/)

---

## 📥 **1. Importar la Base de Datos**
La aplicación utiliza una base de datos llamada **gestion_tareas**. Sigue estos pasos para importarla:

1. Abre **MySQL** o **phpMyAdmin**.
2. Crea una base de datos con el nombre:
   ```sql
   CREATE DATABASE gestion_tareas;

## 🚀 2. Iniciar el Backend
El backend se encuentra en la carpeta `back`. Para iniciarlo, sigue estos pasos:

1. Abre una terminal y navega a la carpeta `back`:
   ```sh
   cd back
```
2. Instala las dependencias:
  ```sh
   npm install
```
3. Inicia el servidor con **nodemon**:
 ```sh
   nodemon
```
---

## 🌐 3. Iniciar el Frontend (Angular)
El frontend se encuentra en la carpeta `userSearch`. Para ejecutarlo:

1. Abre otra terminal y navega a la carpeta `userSearch`:
 ```sh
   cd userSearch
```

2. Instala las dependencias de Angular:
 ```sh
   npm install
```
3. Ejecuta el proyecto:

```sh
   ng serve -o
```
