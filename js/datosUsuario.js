/**
 * js para la gestión de datos del usuario
 */

function datosUsuario(username, tamanoTablero) {
    sessionStorage.setItem('username', username.value);
    sessionStorage.setItem('tamanoTablero', tamanoTablero);
}

function mostrarDatosUsuario() {
    let nombreUsuario = sessionStorage.getItem('username');
    let tamanoTablero = sessionStorage.getItem('tamanoTablero');

    return { nombreUsuario, tamanoTablero };
}