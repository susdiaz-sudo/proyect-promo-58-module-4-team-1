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
const port = process.env.PORT || 3000;

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
    cardURL: `${req.headers.host}/api/project/${resultInsertProject.insertId}`,
  });
});
app.get("/api/project/:projectId", async (req, res) => {
  try {
    // Creamos la consulta mandando el id que recibimos en las query params
    const queryOneProject =
      "SELECT p.*, a.author AS author, a.job AS job, a.photo AS photo FROM projects p JOIN author a ON a.id = p.fk_author WHERE p.id = ?;";

    // Nos conectamos a la BBDD
    const connection = await createConnection();
    const [rows] = await connection.query(queryOneProject, [
      req.params.projectId,
    ]);

    connection.end();

    if (rows.length > 0) {
      const project = rows[0];
      const normalizedProject = {
        id: project.id ?? "",
        name: project.name ?? "",
        slogan: project.slogan ?? "",
        description: project.description ?? "",
        technologies: project.technologies ?? "",
        image: project.image ?? "",
        repo: project.repo ?? "",
        demo: project.demo ?? "",
        author: project.author ?? "",
        job: project.job ?? "",
        photo: project.photo ?? "",
      };

      return res.render("details", { project: normalizedProject });
    } else {
      res.render("dataErrorDetail");
    }
  } catch (err) {
    console.error("Error en /api/project/:projectId", err);
    return res.status(500).send("Error servidor");
  }
});
app.get("/api/projects", async (req, res) => {
  const queryAllProjects =
    "SELECT p.id, p.name, p.description, p.technologies, p.image, p.repo, p.demo, p.slogan, p.fk_author, a.id AS authorId, a.author, a.job, a.photo FROM projects p JOIN author a ON p.fk_author = a.id;";
  const connection = await createConnection();
  const [data] = await connection.execute(queryAllProjects);
  connection.end();
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
const reactDistPath = path.join(__dirname, "..", "frontend-static");

//Ruta para lso ficehros estáticos de ejs
const viewsStyles = path.join(__dirname, "..", "public");

// 2️⃣ SIRVE LOS ARCHIVOS ESTÁTICOS QUE ESTÁN EN LA RUTA QUE HEMOS DEFINIDO
app.use(express.static(reactDistPath));
app.use(express.static(viewsStyles));

// 3️⃣ ARRANQUE DEL SERVIDOR
app.listen(port, () => {
  console.log(`El servidor ya está arrancado: <http://localhost:${port}/>`);
});

// Mirar endpoitn para rutas no encontradas

// Código para que todas las rutas vayan a react
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend-static", "index.html"));
});