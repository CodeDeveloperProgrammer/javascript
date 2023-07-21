const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1973",
  database: "viajes",
});

connection.connect(function (error) {
  if (error) throw error;
  console.log("Conectado a la base de datos");
});

module.exports = { connection };
