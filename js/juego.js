/**
 * js para el juego
 */

/** VARIABLES GLOBALES */
var inicioMarca = false;
var adyacentes = [];
var colorMarca;
var idMarcados = [];
var idIntervalo;

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
        items += `<div class="containerItem"><div id="${i}" class="item ${color[colorRnd]}"></div></div>`;
    }
    document.getElementById('juego').innerHTML = items;
}

/**
 * Calcula los índices de los items adyacentes a un índice dado
 * 
 * @param {*} index marcado 
 */
function calcAdyacentes(index) {
    adyacentes = [];
    let tamanoPanel = parseInt(tamanoTablero);
    // Índice superior
    if (index - tamanoPanel >= 0) {
        adyacentes.push(index - tamanoPanel);
    }
    // Índice inferior
    if (index + tamanoPanel < tamanoPanel * tamanoPanel) {
        adyacentes.push(index + tamanoPanel);
    }
    // Índice izquierdo
    if (index % tamanoPanel != 0) {
        adyacentes.push(index - 1);
    }
    // Índice derecho
    if ((index + 1) % tamanoPanel != 0) {
        adyacentes.push(index + 1);
    }

    return adyacentes;
}

/**
 * Cuenta atrás del tiempo de juego
 */
function cuentaAtras() {
    const tiempoInput = document.getElementById('tiempo');
    tiempoInput.value = parseInt(tiempoInput.value) - 1;
    if (parseInt(tiempoInput.value) == 0) {
        clearInterval(idIntervalo);
        // Finalizar todos los eventos
        let items = document.getElementsByClassName('item');
        for (let item of items) {
            item.removeEventListener('mousedown', comenzarMarca);
            item.removeEventListener('mouseover', continuarMarca);
        }
        document.removeEventListener('mouseup', finalizarMarca);
    }
}

function eventosJuego() {
    let items = document.getElementsByClassName('item');
    for (let item of items) {
        item.addEventListener('mousedown', comenzarMarca);
        item.addEventListener('mouseover', continuarMarca);
    }
    document.addEventListener('mouseup', finalizarMarca);

    // Cuenta atras
    idIntervalo = setInterval(cuentaAtras, 1000); // ejecuta cada segundo
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

    // Guardar id marcado
    idMarcados.push(parseInt(item.id));

    // Calcular adyacentes
    calcAdyacentes(parseInt(item.id));
    colorMarca = item.classList[1];
}

/** Continuar el marcado de items
 * 
 * @param {*} event 
 */
function continuarMarca(event) {
    if (!inicioMarca) return;
    let item = event.target;
    let idNuevo = parseInt(item.id);
    // Es adyacente?
    if (adyacentes.includes(idNuevo) && item.classList.contains(colorMarca)) {
        let containerItem = event.target.parentElement;
        if (item.classList.contains('rojo')) containerItem.classList.add('rojo');
        else  containerItem.classList.add('verde');
        
        // Guardar id marcado
        idMarcados.push(idNuevo);
        
        calcAdyacentes(idNuevo);
    }
}

/** Finalizar el marcado de items */
function finalizarMarca() {
    inicioMarca = false;
    adyacentes = [];
    // Actualizar puntuación
    const puntuacionInput = document.getElementById('puntuacion');
    if (idMarcados.length > 1) {
        puntuacionInput.value = parseInt(puntuacionInput.value) + idMarcados.length;
    }
    // Trabajo con los ids marcados
    for (let id = 0; id < idMarcados.length; id++) {
        let itemMarcado = document.getElementById(idMarcados[id]);
        itemMarcado.parentElement.classList.remove(colorMarca);

        // Cambiar color de item marcado de forma aleatoria
        let color = ['rojo', 'verde'];
        let colorRnd = getRandomInt(2);
        itemMarcado.classList.remove(colorMarca);
        itemMarcado.classList.add(color[colorRnd]);
    }

    idMarcados = [];
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