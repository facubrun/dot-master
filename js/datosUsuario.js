/**
 * js para la gestión de datos del usuario
 */

var nombreUsuario;
var emailUsuario;
var tamanoTablero;
var geolocalizacionTxt;

function datosUsuario(nombreUsuario, emailUsuario, tamanoTablero) {
    sessionStorage.setItem('username', nombreUsuario.value);
    sessionStorage.setItem('email', emailUsuario.value);
    sessionStorage.setItem('tamanoTablero', tamanoTablero.value);
    sessionStorage.setItem('geolocalizacion', geolocalizacionTxt);
}

function getDatosUsuario() {
    nombreUsuario = sessionStorage.getItem('username');
    emailUsuario = sessionStorage.getItem('email');
    tamanoTablero = sessionStorage.getItem('tamanoTablero');

    return { nombreUsuario, emailUsuario, tamanoTablero };
}

function comprobarDatosSesion() {
    if (nombreUsuario == null) {
        sessionStorage.setItem('error', 'No se han encontrado datos de usuario. Por favor, complete el formulario de inicio.');
        return false;
    }
    return true;
}

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