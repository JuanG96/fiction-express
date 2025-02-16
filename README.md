# Fiction Express Web App

Esta es una aplicación de lectura de libros desarrollada con **React** y **Vite**. La aplicación utiliza **json-server** para simular un backend y proporciona funcionalidades de autenticación, lectura y métricas de uso.

## Credenciales de prueba

- **Usuario:** fiction
- **Contraseña:** express

## Características

- **Lectura interactiva:** Visualiza libros página por página.
- **Métricas de lectura:** Se registra el tiempo total de lectura total por libro, el tiempo promedio por página y el tiempo invertido en cada página. A su vez, se queda guardado en el json (db.json)
- **Autenticación básica:** Usa credenciales de prueba para ingresar a la aplicación.
- **Simulación de backend:** Se utiliza json-server para emular endpoints RESTful (usuarios, libros y métricas).

## Requisitos

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) (incluido con Node.js)
- [Vite](https://vitejs.dev/) (se instala como dependencia del proyecto)
- [json-server](https://github.com/typicode/json-server) (puedes instalarlo globalmente o usarlo vía npx)

## Instalación y Ejecución

### 1. Clona el repositorio

```bash
git clone https://tu-repositorio-url.git
cd fiction-express-web
```

### 2. Instalar las dependencias

```bash
npm install
```

### 3. Iniciar el json server en el puerto 4444

```bash
npx json-server --watch db.json --port 4444
```

### 4. Ejecutar la aplicación en modo desarrollo

```bash
npm run dev
```
