/**
 * js para la gestión de datos del usuario
 * 
 * @author Facundo Brun <facundobrun0303@gmail.com>
 * @link https://github.com/facubrun/dot-master
 */

var nombreUsuario;
var emailUsuario;
var tamanoTablero;
var geolocalizacionTxt;
var avatarUsuario;

// sessionStorage
/**
 * Guarda los datos del usuario en sessionStorage
 * 
 * @param {HTMLElement} nombreUsuario
 * @param {HTMLElement} emailUsuario
 * @param {HTMLElement} tamanoTablero
 * @param {HTMLElement} avatarUsuario
 * 
 * */
function datosUsuario(nombreUsuario, emailUsuario, tamanoTablero, avatarUsuario) {
    sessionStorage.setItem('username', nombreUsuario.value);
    sessionStorage.setItem('email', emailUsuario.value);
    sessionStorage.setItem('tamanoTablero', tamanoTablero.value);
    sessionStorage.setItem('geolocalizacion', geolocalizacionTxt);
    sessionStorage.setItem('avatar', avatarUsuario.src);
}

/**
 * Devuelve los datos del usuario almacenados en sessionStorage
 * 
 * @returns {Object} Objeto con los datos del usuario
 */
function getDatosUsuario() {
    nombreUsuario = sessionStorage.getItem('username');

    emailUsuario = sessionStorage.getItem('email');
    tamanoTablero = sessionStorage.getItem('tamanoTablero');
    geolocalizacionTxt = sessionStorage.getItem('geolocalizacion');
    avatarUsuario = sessionStorage.getItem('avatar');

    return { nombreUsuario, emailUsuario, tamanoTablero, geolocalizacionTxt, avatarUsuario };
}

/**
 * Comprueba si hay datos de usuario en sessionStorage
 * 
 * @returns {boolean} true si hay datos, false si no
 */
function comprobarDatosSesion() {
    if (nombreUsuario == null) {
        sessionStorage.setItem('error', 'No se han encontrado datos de usuario. Por favor, complete el formulario de inicio.');
        return false;
    }
    return true;
}

// Geolocalización
function datoGeolocalizacion() {
    if (!navigator.geolocation) {
        geolocalizacionTxt = 'Geolocalización no soportada por el navegador.';
    } else {
        navigator.geolocation.getCurrentPosition( 
            // Exito
            (position) => {
            const latitud  = position.coords.latitude;
            const longitud = position.coords.longitude;
            geolocalizacionTxt = 'Latitud:' + latitud + ' °, Longitud: ' + longitud + ' °';
            },
            // Error
            () => {
            geolocalizacionTxt = 'La geolocalización no se ha podido realizar.';
            }
        );
    }
}

// localStorage
/**
 * Guarda el historial de usuarios en localStorage
 * 
 * @param {HTMLElement} nombreUsuario
 */
function historicoUsuarios(nombreUsuario) {
    let historicoStorage = localStorage.getItem('historico');
    let historico = [];
    if (historicoStorage == null) {
        historico = [];
    } else {
        historico = JSON.parse(historicoStorage);
    }
    let regUsuario = {
        nombre: nombreUsuario.value,
        fecha: Date.now()
    }; 
    historico.push(regUsuario);
    localStorage.setItem('historico', JSON.stringify(historico));
}