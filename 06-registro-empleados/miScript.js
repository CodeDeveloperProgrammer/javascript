let empleados = [];

function Empleado(id, nombre, apellido, nacimiento, cargo){
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.nacimiento = nacimiento;
    this.cargo = cargo;
}

function agregarEmpleado() {
    let id = document.getElementById("txtId").value;
    let nombre = document.getElementById("txtNombre").value;
    let apellido = document.getElementById("txtApellido").value;
    let nacimiento = document.getElementById("txtNacimiento").value;
    let cargo = document.getElementById("txtCargo").value;

    let empleado = new Empleado(id, nombre, apellido, nacimiento, cargo);
    empleados.push(empleado);

    alert("Empleado ha sido agregado");
    limpiarCampos();
}

function mostrarEmpleados() {
    let listado = '';
    for(empleado of empleados){
        for(let prop in empleado){
            listado = listado + prop.toUpperCase() + ": " + empleado[prop] + ","
        }
        listado = listado + "\n";
    }
    alert(listado);
}

function limpiarCampos() {
    document.getElementById("txtId").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtApellido").value = "";
    document.getElementById("txtNacimiento").value = "";
    document.getElementById("txtCargo").value = "";
}