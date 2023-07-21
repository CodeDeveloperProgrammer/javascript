//PETICIÓN GET
async function obtenerTodos() {
  try {
    fetch("https://my-json-server.typicode.com/fedegaray/telefonos/db", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((respuesta) => respuesta.json())
      .then((data) => {
        let cuerpoTabla = document.getElementById("tablaContenido");
        let salida = "";
        for (let elemento of data.dispositivos) {
          salida += `
                    <tr>
                        <td>${elemento.id}</td>
                        <td>${elemento.marca}</td>
                        <td>${elemento.modelo}</td>
                        <td>${elemento.color}</td>
                        <td>${elemento.almacenamiento} GB</td>
                        <td>${elemento.procesador}</td>
                    </tr>
                `;
        }
        cuerpoTabla.innerHTML = salida;
      })
      .catch((error) => {
        throw new Error("Error en la solicitud: " + error);
      });
  } catch (error) {
    console.error(error);
  }
}

//PETICIÓN GET/ID
async function consultarUno() {
  try {
    let id = document.getElementById("txtConsulta").value;

    if (id === "") {
      let noId = document.getElementById("noId");
      noId.textContent = "No ha ingresado ningún ID!";
      noId.style.color = "red";
      noId.style.width = "30%";
      //alert("No ha ingresado ningún ID");
      return;
    } else {
      noId.style.display = "none";
    }

    axios
      .get(
        "https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/" +
          id
      )
      .then((respuesta) => {
        let dispositivo = respuesta.data;
        document.getElementById("consultaNombre").value = dispositivo.marca;
        document.getElementById("consultaModelo").value = dispositivo.modelo;
        document.getElementById("consultaColor").value = dispositivo.color;
        document.getElementById("consultaAlmacenamiento").value =
          dispositivo.almacenamiento + " GB";
        document.getElementById("consultaProcesador").value =
          dispositivo.procesador;
      })
      .catch((error) => {
        throw new Error("Error en la solicitud: " + error);
      });
  } catch (error) {
    console.error(error);
  }
}

//PETICIÓN POST
async function agregarUno() {
  try {
    let marca = document.getElementById("inputMarca").value;
    let modelo = document.getElementById("inputModelo").value;
    let color = document.getElementById("inputColor").value;
    let almacenamiento = document.getElementById("inputAlmacenamiento").value;
    let procesador = document.getElementById("inputProcesador").value;
    let agregar = document.getElementById("agregar");
    if (
      marca === "" ||
      modelo === "" ||
      color === "" ||
      almacenamiento === "" ||
      procesador === ""
    ) {
      agregar.textContent = "Todos los campos deben estar llenos!";
      agregar.style.color = "red";
      agregar.style.width = "30%";
      //alert("Todos los campos deben estar llenos.");
    } else {
      agregar.style.display = "none";
      // Nota: La API proporcionada (my-json-server) no permite la creación real de nuevos registros
      // en el repositorio de GitHub. Solo simula las operaciones POST.
      fetch(
        "https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            marca: marca,
            modelo: modelo,
            color: color,
            almacenamiento: almacenamiento,
            procesador: procesador,
          }),
        }
      )
        .then((respuesta) => respuesta.json())
        .then((data) => {
          //Llama a la función obtenerTodos() para actualizar la lista de dispositivos
          //No veremos esa actualización porque la API real no se modificará

          obtenerTodos();
          alert(
            `Se ha agregado un nuevo archivo:\nMarca: ${data.marca}\nModelo: ${data.modelo}\nColor: ${data.color}\nAlmacenamiento: ${data.almacenamiento}\nProcesador: ${data.procesador}`
          );
          //LIMPIO LOS CAMPOS
          document.getElementById("inputMarca").value = "";
          document.getElementById("inputModelo").value = "";
          document.getElementById("inputColor").value = "";
          almacenamiento = document.getElementById(
            "inputAlmacenamiento"
          ).value = "";
          procesador = document.getElementById("inputProcesador").value = "";
        })
        .catch((error) => {
          throw new Error("Error en la solicitud: " + error);
        });
    } //cierre del else
  } catch (error) {
    console.error(error);
  }
}

//PETICIÓN PUT
async function modificarUno() {
  try {
    let id = document.getElementById("txtConsulta").value;
    let nombre = document.getElementById("consultaNombre").value;
    let modelo = document.getElementById("consultaModelo").value;
    let color = document.getElementById("consultaColor").value;
    let almacenamiento = document.getElementById(
      "consultaAlmacenamiento"
    ).value;
    let procesador = document.getElementById("consultaProcesador").value;

    if (nombre === "") {
      alert("El registro a modificar no está completo");
      return;
    }

    fetch(
      "https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/" +
        id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: nombre,
          data: {
            modelo: modelo,
            color: color,
            almacenamiento: almacenamiento,
            procesador: procesador,
          },
        }),
      }
    )
      .then((respuesta) => respuesta.json())
      .then((data) => {
        alert(
          `Se ha modificado el archivo ${id}. Nuevo contenido:\n${JSON.stringify(
            data
          )}`
        );
        //Llama a la función obtenerTodos() para actualizar la lista de dispositivos
        //No veremos esa actualización porque la API real no se modificará
        obtenerTodos();
      })
      .catch((error) => {
        throw new Error("Error en la solicitud: " + error);
      });
  } catch (error) {
    console.error(error);
  }
}

//PETICIÓN DELETE
async function eliminarUno() {
  try {
    let id = document.getElementById("txtConsulta").value;

    if (id === "") {
      alert("No ha ingresado ningún ID");
      return;
    }

    axios
      .delete(
        "https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/" +
          id
      )
      .then((respuesta) => {
        alert(`Se ha eliminado el archivo ${id}.`);

        //LIMPIO LOS CAMPOS
        document.getElementById("txtConsulta").value = "";
        document.getElementById("consultaNombre").value = "";
        document.getElementById("consultaModelo").value = "";
        document.getElementById("consultaColor").value = "";
        document.getElementById("consultaAlmacenamiento").value = "";
        document.getElementById("consultaProcesador").value = "";

        //Llama a la función obtenerTodos() para actualizar la lista de dispositivos
        //No veremos esa actualización porque la API real no se modificará
        obtenerTodos();
      })
      .catch((error) => {
        throw new Error("Error en la solicitud: " + error);
      });
  } catch (error) {
    console.error(error);
  }
}
