// Importamos Express: framework para crear servidores
const express = require("express");

// Importamos path: módulo nativo de Node para trabajar con rutas de carpetas
const path = require("node:path");

// Importamos cors: permite que el frontend haga peticiones al backend
const cors = require("cors");

// Creamos la aplicación de Express
const app = express();

// Importamos y configuramos dotenv para gestionar variables de entorno
require("dotenv").config();

// Importa mysql2/promise para trabajar con bases de datos MySQL de forma asíncrona
const mysql = require("mysql2/promise");

// Activamos CORS para permitir peticiones desde otros orígenes
app.use(cors());

app.use(express.json())

// Puerto donde se levantará el servidor
const port = 3000;

let data= [{}, {}, {}, {}];

// --------------------------------------------------
// API
// --------------------------------------------------

const dataConnection = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
}

const createConnection = async () => {
  const connection = await mysql.createConnection(dataConnection);
  await connection.connect();
  return connection;
};

app.post("/api/projectCard", (req, res) => {

  data.push(req.body);
  res.status (200).json({ success: true});
  // Aquí iría la lógica para guardar el proyecto
  //res.json({ success: true, cardURL: "http://localhost:3000/card/123" });
});

app.get("/api/projectCards", async (req, res) => {
  // Aquí iría la lógica para obtener los proyectos
  const queryAllProjects = "SELECT * FROM projects;";
  const connection =  await createConnection();
  const [data] = await connection.execute(queryAllProjects);
  res.json(data);
});


// --------------------------------------------------
// SERVIDOR DE FICHEROS ESTÁTICOS
// --------------------------------------------------

// 1️⃣ DEFINIMOS LA RUTA A REACT

// __dirname apunta a: src/, es la carpeta donde nos encontramos
// Con los '..' subimos carpetas hasta la raíz del proyecto
// y entramos en FRONTEND-REACT/dist
// Hemos tenido que compilar el proyecto de React para generar la carpeta dist
// y que sirva los ficheros desde ahí
const reactDistPath = path.join(
  __dirname,
  "..",
  "FRONTEND-REACT",
  "dist"
);

// 2️⃣ SIRVE LOS ARCHIVOS ESTÁTICOS QUE ESTÁN EN LA RUTA QUE HEMOS DEFINIDO
app.use(express.static(reactDistPath));


// 3️⃣ ARRANQUE DEL SERVIDOR
app.listen(port, () => {
  console.log(`El servidor ya está arrancado: <http://localhost:${port}/>`);
});


// 4️⃣ CATCH-ALL PARA REACT (SPA)
// Este middleware se ejecuta SOLO si:
// - No existe un archivo estático
// - Ningún middleware anterior ha respondido
//
// Sirve index.html para cualquier ruta:
// / -> index.html
// /login -> index.html
// /users/3 -> index.html
//
// React Router se encarga luego de la navegación
//
// IMPORTANTE:
// En Express 5 NO se puede usar app.get('*')
// Por eso usamos app.use sin ruta
app.use((req, res) => {
  res.sendFile(path.join(reactDistPath, "index.html"));
});




