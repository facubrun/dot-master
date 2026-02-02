/**
 * js para el juego
 */

/** VARIABLES GLOBALES */
var inicioMarca = false;

/**
 * Devuelve un numero random entre 0 y max
 * 
 * @param {number} max
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Rellenar formulario con datos del usuario
function rellenarFormUsuario() {
    document.getElementById('username').value = nombreUsuario;
    document.getElementById('avatarImg').src = avatarUsuario;
}

//
function pintarPanelJuego() {
    document.getElementById('juego').style.gridTemplateColumns = 'repeat(' + tamanoTablero + ', 1fr)';
    document.getElementById('juego').style.gridTemplateRows = 'repeat(' + tamanoTablero + ', 1fr)';

    // Pintar elementos del tablero
    let items = '';
    let color = ['rojo', 'verde'];
    let colorRnd = 0;
    const totalItems = parseInt(tamanoTablero) * parseInt(tamanoTablero);
    for (let i = 0; i < totalItems; i++) {
        if (i % 2 === 0) colorRnd = getRandomInt(2);
        items += `<div class="containerItem"><div class="item ${color[colorRnd]}"></div></div>`;
    }
    document.getElementById('juego').innerHTML = items;
}

function eventosJuego() {
    let items = document.getElementsByClassName('item');
    for (let item of items) {
        item.addEventListener('mousedown', comenzarMarca);
        item.addEventListener('mouseover', continuarMarca);
    }
    document.addEventListener('mouseup', finalizarMarca);
}

/** FUNCIONES DEL JUEGO */

/**
 * Iniciar el marcado de un item
 * 
 * @param {*} event 
 */
function comenzarMarca(event) {
    if (!inicioMarca) inicioMarca = true;

    let item = event.target;
    let containerItem = event.target.parentElement;
    if (item.classList.contains('rojo')) containerItem.classList.add('rojo');
    else  containerItem.classList.add('verde');   
}

/** Continuar el marcado de items
 * 
 * @param {*} event 
 */
function continuarMarca(event) {
    if (!inicioMarca) return;
    let item = event.target;
    let containerItem = event.target.parentElement;
    if (item.classList.contains('rojo')) containerItem.classList.add('rojo');
    else  containerItem.classList.add('verde');
}

/** Finalizar el marcado de items */
function finalizarMarca() {
    inicioMarca = false;
}


/* MAIN */

// Cargar datos de usuario
getDatosUsuario();
// Comprobar si hay datos de sesión
if (!comprobarDatosSesion()) {
    location = 'index.html';
}
// Rellenamos el formulario con los datos del usuario, 
// pintamos el panel de juego y cargamos los eventos
rellenarFormUsuario();
pintarPanelJuego();
eventosJuego();