/**
 * js para el juego
 */


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

// Cargar datos de usuario
getDatosUsuario();
// Comprobar si hay datos de sesión
if (!comprobarDatosSesion()) {
    location = 'index.html';
}
// Rellenamos el formulario con los datos del usuario
rellenarFormUsuario();
pintarPanelJuego();