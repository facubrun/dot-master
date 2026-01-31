/*
* JS para la comprobación de datos del formulario de entrada
*/


// Inicializacion de variables y elementos del DOM
const formEntrada = document.getElementById('game-form');
const botonJugar = document.getElementById('start-button');
const inputName = document.getElementById('username');
const inputTamano = document.getElementById('board-size');
const mensajeError = document.getElementById('error-message');

// Funciones de evento
function comprobarForm(event) {
    // Comprobar cambios
    if (inputName.value.length === 0) {
        mensajeError.innerText = 'Debe ingresar un nombre de usuario.';
        inputName.focus();
        event.preventDefault();
        return false;
    } else if (inputTamano.value === '0') {
        mensajeError.innerText = 'Debe seleccionar un tamaño de tablero.';
        inputTamano.focus();
        event.preventDefault();
        return false;
    }
    return true;
}

// Inicio de carga de eventos
formEntrada.addEventListener('submit', comprobarForm);