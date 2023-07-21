

function mostrarResultado(resultado) {
    document.getElementById("resultado").value = resultado;
}

function sumar() {
  let numero1 = +document.getElementById("numero1").value;
  let numero2 = +document.getElementById("numero2").value;
  resultado = numero1 + numero2;
  return mostrarResultado(resultado);
}

function restar() {
    let numero1 = +document.getElementById("numero1").value;
    let numero2 = +document.getElementById("numero2").value;
    mostrarResultado(numero1 - numero2)
}

function multiplicar() {
    let numero1 = +document.getElementById("numero1").value;
    let numero2 = +document.getElementById("numero2").value;
    mostrarResultado(numero1 * numero2)
}

function dividir() {
    let numero1 = +document.getElementById("numero1").value;
    let numero2 = +document.getElementById("numero2").value;
    mostrarResultado(numero1 / numero2);
}

function raizCuadrada() {
    let numero = +document.getElementById("numero2").value;
    mostrarResultado(Math.sqrt(numero));
}

function potencia() {
    let numero1 = +document.getElementById("numero1").value;
    let numero2 = +document.getElementById("numero2").value;
    mostrarResultado(Math.pow(numero1, numero2));
}

function valorAbsoluto() {
    let resultado = +document.getElementById("resultado").value;
    mostrarResultado(Math.abs(resultado));
}

function aleatorio() {
    let minimo = +document.getElementById("numero1").value;
    let maximo = +document.getElementById("numero2").value;
    maximo = maximo + 1;
    mostrarResultado(Math.floor(Math.random() * (maximo - minimo) + minimo));
}

function redondear() {
    let resultado = +document.getElementById("resultado").value;
    mostrarResultado(Math.round(resultado));
}

function rerondearCeil() {
    let resultado = +document.getElementById("resultado").value;
    mostrarResultado(Math.ceil(resultado));
}

function rerondearFloor() {
    let resultado = +document.getElementById("resultado").value;
    mostrarResultado(Math.floor(resultado));
}
