/*
* JS para la comprobación de datos del formulario de entrada
*/


// Inicializacion de variables y elementos del DOM
var formEntrada;
var botonJugar;
var inputName;
var inputTamano;
var inputEmail;
var mensajeError;

// Comprobar si hay mensaje de error en sesión
const errorSesion = sessionStorage.getItem('error');
if (errorSesion != null) {
    mensajeError.innerText = errorSesion;
    sessionStorage.removeItem('error');
}

// Funciones de evento
function comprobarForm(event) {
    // Comprobar cambios
    if (inputName.value.match(/^\d/)) {
        event.preventDefault();
        mensajeError.innerText = 'El nombre de usuario no debe comenzar con números.';
        inputName.focus();
        return false;
    } else if (inputTamano.value === '0') {
        event.preventDefault();
        mensajeError.innerText = 'Debe seleccionar un tamaño de tablero.';
        inputTamano.focus();
        return false;
    }
    // Si todo es correcto, guardar datos y enviar formulario
    datosUsuario(inputName, inputEmail, inputTamano);
    historicoUsuarios(inputName);
    return true;
}

// Carga de objetos del DOM y eventos del formulario
function domCargado() {
    // Captura de todos los elements del DOM
    formEntrada = document.getElementById('game-form');
    botonJugar = document.getElementById('start-button');
    inputName = document.getElementById('username');
    inputTamano = document.getElementById('board-size');
    inputEmail = document.getElementById('email');
    mensajeError = document.getElementById('error-message');

    // Comprobar si hay error en juego.html
    if(sessionStorage.getItem('error') != null) {
        mensajeError.innerText = sessionStorage.getItem('error');
        sessionStorage.removeItem('error');
    }

    formEntrada.addEventListener('submit', comprobarForm);
}

// Inicio de carga de eventos
document.addEventListener('DOMContentLoaded', domCargado);
// Geolocalización
datoGeolocalizacion();