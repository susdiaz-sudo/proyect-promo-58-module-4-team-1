const express = require('express');
const path = require('node:path');


const app = express();
const port = 20291;

app.listen(port, () =>{
  console.log(`El servidor ya está arrancado: <http://localhost:${port}/>`)
});

app.use( express.static( path.join(__dirname, '..', './FRONTEND-REACT')  ) );


// ENDPOINT
app.get('/', (req, res) => {
  // Código que atiende a la petición/request GET http://localhost:3000/

  res.send('Holis!');
});

app.get(/.*/, (req, res) => {
  // Código que atiende a la petición GET http://localhost:3000/*

  res.status(404).send('No encontrado.');
});