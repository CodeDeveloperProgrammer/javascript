let nombre = "Perico";

export function cambiarNombre(nuevoNombre) {
  nombre = nuevoNombre;
}

// export default ()  => alert(nombre + " te ha enviado un mensaje");
export function enviarMensaje() {
  alert(nombre + " te ha enviado un mensaje");
}

// export default { cambiarNombre, enviarMensaje, //nombre }