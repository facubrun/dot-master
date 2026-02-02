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
var avatarItems;
var itemImg;
var avatarContainer;

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
    datosUsuario(inputName, inputEmail, inputTamano, avatarContainer);
    historicoUsuarios(inputName);
    return true;
}

function moviendoImg(event) {
    itemImg = event.target;
}

function cambiarImg() {
    avatarContainer.src = itemImg.src;
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

    // eventos del drag-n-drop
    const avatarItems = document.getElementsByClassName('avatarImgItem'); // misma clase para agarrar todos
    for (let item of avatarItems) {
        item.addEventListener('dragstart', moviendoImg);

    }

    avatarContainer = document.getElementById('avatarImg');
    avatarContainer.addEventListener('dragover', e => {e.preventDefault()});
    avatarContainer.addEventListener('drop', cambiarImg);
}

// Inicio de carga de eventos
document.addEventListener('DOMContentLoaded', domCargado);
// Geolocalización
datoGeolocalizacion();