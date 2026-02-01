/**
 * js para la gestión de datos del usuario
 */

var nombreUsuario;
var tamanoTablero;

function datosUsuario(username, tamanoTablero) {
    sessionStorage.setItem('username', username.value);
    sessionStorage.setItem('tamanoTablero', tamanoTablero);
}

function getDatosUsuario() {
    nombreUsuario = sessionStorage.getItem('username');
    tamanoTablero = sessionStorage.getItem('tamanoTablero');

    return { nombreUsuario, tamanoTablero };
}

function comprobarDatosSesion() {
    if (nombreUsuario == null) {
        sessionStorage.setItem('error', 'No se han encontrado datos de usuario. Por favor, complete el formulario de inicio.');
        return false;
    }
    return true;
}