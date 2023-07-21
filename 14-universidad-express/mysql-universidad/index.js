//Configurar con ExpressJS el servidor de la app
const express = require("express");
const app = express();

//Guardar al componente MySQL que importamos desde conexion.js
const mySQL = require("./conexion");

app.use(express.json());

//Método para ver todos los estudiantes
app.get("/estudiantes", (request, response) => {
  mySQL.conexion.query("SELECT * FROM universidad.estudiante", (error, resultados) => {
    if (error) throw error;
    response.send(resultados);
  });
});

//Método GET para consultar un estudiante
app.get("/estudiantes/:legajo", (request, response) => {
  mySQL.conexion.query(
    "SELECT * FROM estudiante WHERE legajo = " + request.params.legajo,
    function (error, resultados) {
      if (error) throw error;
      response.send(resultados);
    }
  );
});

//Método POST para agregar un estudiante
app.post("/estudiantes/create", (request, response) => {
  mySQL.conexion.query(
    'INSERT INTO estudiante (nombre, email) VALUES ("' +
      request.body.nombre +
      '", "' +
      request.body.email +
      '")',
    function (error, resultados) {
      if (error) throw error;
      response.send("Estudiante registrado: Id " + resultados.insertId);
    }
  );
});

//Método POST para agregar una nota
app.post("/notas/create", (request, response) => {
  mySQL.conexion.query(
    "INSERT INTO examen (codigo_curso, legajo_estudiante, nota, fecha)" +
      'VALUES ("' +
      request.body.curso +
      '", ' +
      request.body.estudiante +
      ", " +
      request.body.nota +
      ', "' +
      request.body.fecha +
      '")',
     (error, resultados) => {
      if (error) throw error;
      response.send("Examen registrado: Id " + resultados.insertId);
    }
  );
});

//Método PUT para actualizar una nota
app.put("/notas/:id/update", (request, response) => {
  mySQL.conexion.query(
    'UPDATE examen SET codigo_curso = "' +
      request.body.curso +
      '"' +
      ", legajo_estudiante = " +
      request.body.estudiante +
      ", nota = " +
      request.body.nota +
      ', fecha = "' +
      request.body.fecha +
      '" ' +
      "WHERE id = " +
      request.params.id,
    function (error, resultados) {
      if (error) throw error;
      response.send("Examen modificado");
    }
  );
});

//Método Delete para eliminar una nota
app.delete("/notas/:id/delete", (request, response) => {
  mySQL.conexion.query(
    "DELETE FROM examen WHERE id = " + request.params.id,
    function (error, resultados) {
      if (error) throw error;
      response.send("Examen eliminado");
    }
  );
});

//Método GET para obtener las notas aprobadas
app.get("/notas/:codigo/aprobados", (request, response) => {
  mySQL.conexion.query(
    'SELECT * FROM examen WHERE codigo_curso = "' +
      request.params.codigo +
      '" AND nota > 5',
    function (error, resultados) {
      if (error) throw error;
      response.send(resultados);
    }
  );
});

app.listen(3000, () => {
  console.log("El servidor esta en línea");
});
