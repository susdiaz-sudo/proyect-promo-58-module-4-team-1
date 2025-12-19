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

app.use(express.json({ limit: "1mb" }));

app.set("view engine", "ejs");

// Puerto donde se levantará el servidor
const port = 3000;

//let data= [{}, {}, {}, {}];

// --------------------------------------------------
// API
// --------------------------------------------------

const dataConnection = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
};

const createConnection = async () => {
  const connection = await mysql.createConnection(dataConnection);
  await connection.connect();
  return connection;
};

app.post("/api/projectCard", async (req, res) => {
  let connection = await createConnection();

  const projectTitle = req.body.name;
  const projectSlogan = req.body.slogan;
  const projectRepo = req.body.repo;
  const projectDemo = req.body.demo;
  const projectTechnologies = req.body.technologies;
  const projectDescription = req.body.description;
  const authorName = req.body.author;
  const authorJob = req.body.job;
  const authorPhoto = req.body.photo;
  const projectImage = req.body.image;

  const queryInsertAuthor =
    "INSERT INTO author(author,job,photo) VALUES (?,?,?)";

  const [resultInsertAuthor] = await connection.execute(queryInsertAuthor, [
    authorName,
    authorJob,
    authorPhoto,
  ]);
  console.log(
    "Este es el id del autor que acabamos de insertar",
    resultInsertAuthor.insertId
  );

  const queryInsertProject =
    "INSERT INTO projects (name, description, technologies, image, repo, demo, slogan, fk_author) VALUES(?,?,?,?,?,?,?,?)";
  const [resultInsertProject] = await connection.execute(queryInsertProject, [
    projectTitle,
    projectDescription,
    projectTechnologies,
    projectImage,
    projectRepo,
    projectDemo,
    projectSlogan,
    resultInsertAuthor.insertId,
  ]);

  res.json({
    success: true,
    cardURL: `http://localhost:3000/project/${resultInsertProject.insertId}`,
  });
});

app.get("/api/projects", async (req, res) => {
  const queryAllProjects =
    "SELECT * from projects p  JOIN author a ON p.fk_author  = a.id;";
  const connection = await createConnection();
  const [data] = await connection.execute(queryAllProjects);
  connection.end();
  res.json(data);
});

app.get("/api/project/:projectId", async (req, res) => {

  // Creamos la consulta mandando el id que recibimos en las query params
  const queryOneProject = "SELECT p.*, a.author, a.job, a.photo FROM projects p JOIN authors a ON a.id = p.fk_author WHERE p.id = ?;"

  // Nos conectamos a la BBDD
  const connection = await createConnection();

  // Ejecutamos la consulta y guardamos los datos en el objeto data
  const [data] = await connection.query(queryOneProject,[req.params.projectId]);

  console.log('Los datos que obtenemos de la BBDD', data)
  // Respondemos con la pagina de detalles mandandole los datos que hemos obtenido
  res.render("details", data);
  // Cerramos la conexion
  connection.end();
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
const reactDistPath = path.join(__dirname, "..", "frontend-static");

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
