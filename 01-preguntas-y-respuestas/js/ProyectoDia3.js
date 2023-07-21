let tiempoTerminado;
let intervaloDeTiempo;

function comenzarCuentaRegresiva() {
  tiempoTerminado = setTimeout(tiempoCumplido, 1000 * 30);
  intervaloDeTiempo = setInterval(ticTac, 1000);

  document.getElementById("cuentaRegresiva").textContent = 30;
}

function ticTac() {
  let tiempo = document.getElementById("cuentaRegresiva").textContent;

  document.getElementById("cuentaRegresiva").textContent = tiempo - 1;
}

function tiempoCumplido() {
  clearInterval(intervaloDeTiempo);
  document.getElementById("cuentaRegresiva").textContent = 0;
  document.getElementById("audioFinal").play();
  alert("GEAME OVER: Se acabó el tiempo. Intenta nuevamente");
}

function finalizado() {
   
  clearTimeout(tiempoTerminado);
  clearInterval(intervaloDeTiempo);

  let fecha = new Date();
  let respuesta1 = document.getElementById("respuesta1").value;
  let respuesta2 = document.getElementById("respuesta2").value;
  let respuesta3 = document.getElementById("respuesta3").value;
  let respuesta4 = document.getElementById("respuesta4").value;
  let respuesta5 = document.getElementById("respuesta5").value;
  let terminar = document.getElementById('terminar');

  // Y así para cada una de las reapuestas.
  if (!respuesta1.value == null || !respuesta1 == "") {
    //terminar.disabled=false;
    let mensaje =
      fecha.toLocaleDateString("es-Es") +
      "\n" +
      "1. " +
      respuesta1 +
      "\n" +
      "2. " +
      respuesta2 +
      "\n" +
      "3. " +
      respuesta3 +
      "\n" +
      "4. " +
      respuesta4 +
      "\n" +
      "5. " +
      respuesta5;

    alert(mensaje);
  }/* else {
    terminar.disabled=true;
  } */
}

function volverAIntentar() {
  // Si está activo el onload del body
  // location.reload();
  comenzarCuentaRegresiva();
}
