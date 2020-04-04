const botonRegresar = document.getElementById('regresar');

botonRegresar.addEventListener('click', regresar)

function regresar(evt) {
    window.location.href = 'index.html';
}