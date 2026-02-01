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
    datosUsuario(inputName, inputTamano.value);
    return true;
}

// Inicio de carga de eventos
formEntrada.addEventListener('submit', comprobarForm);