const express = require("express");
const cors = require("cors");
const app = express();

const mySQL = require("./connection");
const seguridad = require("./seguridad");

app.use(cors());
app.use(express.json());

app.post("/usuarios/login", (request, response) => {
  let emailEncriptado = seguridad.miEncriptado(request.body.email);
  let passHashing = seguridad.miHash(request.body.pass);
  mySQL.connection.query(
    'SELECT id FROM usuarios WHERE (administrador = 0 AND email = "' +
      emailEncriptado +
      '" AND pass = "' +
      passHashing +
      '") ' +
      'OR (administrador = 1 AND email = "' +
      request.body.email +
      '" AND pass = "' +
      request.body.pass +
      '")',
    function (error, resultados) {
      if (error) throw error;
      if (resultados.length === 0) response.send(undefined);
      else
        response.send(
          seguridad.crearToken(resultados[0]["id"], request.body.user)
        );
    }
  );
});

app.post("/usuarios/create", (request, response) => {
  let emailEncriptado = seguridad.miEncriptado(request.body.email);
  let passHashing = seguridad.miHash(request.body.pass);
  mySQL.connection.query(
    'INSERT INTO usuarios (email, pass, administrador) VALUES ("' +
      emailEncriptado +
      '", "' +
      passHashing +
      '", 0)',
    function (error, resultados) {
      if (error) throw error;
      mySQL.connection.query(
        "INSERT INTO permisosxusuario VALUES (" +
          resultados["insertId"] +
          ", 2)",
        function (error, resultados) {
          if (error) throw error;
          response.send(true);
        }
      );
    }
  );
});

app.get("/ofertas", (request, response) => {
  mySQL.connection.query("SELECT * FROM ofertas", function (error, resultados) {
    if (error) throw error;
    response.send(resultados);
  });
});

app.post("/validate", seguridad.validarToken, (request, response) => {
  mySQL.connection.query(
    "SELECT p.pagina FROM permisos p JOIN permisosxusuario u ON u.permiso_id = p.id " +
      'WHERE u.usuario_id = "' +
      request.user.usuario_id +
      '" AND p.nombre = "' +
      request.body.permiso +
      '"',
    function (error, resultados) {
      if (error) throw error;
      if (resultados.length === 0) response.send(undefined);
      else response.send(resultados[0]["pagina"]);
    }
  );
});

app.listen(3000, () => {
  console.log("El servidor esta en línea");
});
