//HASING
const bcrypt = require("bcrypt");
const ciclos = 10;
const salt = bcrypt.genSaltSync(ciclos);

//ENCRIPTACION
const crypto = require("crypto");
const algorithm = "aes-128-gcm";
const password = "pass 16 caracter";
const iv = crypto.randomBytes(16);

//TOKEN
const jwt = require("jsonwebtoken");
const claveSecreta = "esta_es_una_clave_para_token";

function miHash(password) {
  // Hacer hashing de la contraseña con el salt generado
  const claveConHash = bcrypt.hashSync(password, salt);

  return claveConHash;
}

function miEncriptado(user) {
  // Crear un objeto de cifrado
  const cifrado = crypto.createCipheriv(algorithm, password, iv);

  // Cifrar el texto plano
  let encriptado = cifrado.update(user, "utf8", "hex");
  encriptado += cifrado.final("hex");

  return encriptado;
}

function crearToken(user_id, email) {
  const carga = {
    usuario_id: user_id,
    usuario: email,
  };

  // Generar el JWT
  const token = jwt.sign(carga, claveSecreta, { expiresIn: "1h" });
  return token;
}

function validarToken(req, res, next) {
  // Obtener el token del encabezado de autorización
  const token = req.headers.authorization;

  // Verificar y decodificar el token
  try {
    const decodificado = jwt.verify(token.split(" ")[1], claveSecreta);
    req.user = decodificado;
    next();
  } catch (error) {
    return res.status(401).send("Token de autenticación inválido");
  }
}

module.exports = { miHash, miEncriptado, crearToken, validarToken };
