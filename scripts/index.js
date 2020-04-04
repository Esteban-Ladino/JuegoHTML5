window.onload = inicializar;

const cantidadFiguras = 6;
const cantidadCasillas = 6;
const cantidadParejas = (cantidadFiguras * cantidadCasillas) / 2
const personajes = [
    'aquaman',
    'batman',
    'cyborg',
    'detectivemarciano',
    'firestorm',
    'flash',
    'flechaverde',
    'linternaverde1',
    'linternaverde2',
    'shazam',
    'superman',
    'wonderwoman'
];
const imgEncubrimiento = 'MysteryBox.gif';
let indicePersonajes = new Array();
let click1 = null;
let click2 = null;
let contAciertos = 0;

function inicializar() {
    generarTablero();
    indicePersonajes = generarPosicionesRandom();
}

function generarTablero() {
    const contenedor = document.getElementById('container');

    let index = 0;
    for (let i = 0; i < cantidadCasillas; i++)
    {
        let figuras = '';
        for (let j = 0; j < cantidadFiguras; j++) 
        {
            figuras += `<figure>
                            <img class="imagen" src="images/${imgEncubrimiento}" alt="Imagen de Encubrimiento" name="${index}" onclick="eventoClick(this)">
                        </figure>`;
            index++;
        }
        contenedor.insertAdjacentHTML('afterbegin', `<div class="casilla">${figuras}</div>`);
    }
}

function generarPosicionesRandom() {
    let totalFiguras = cantidadFiguras * cantidadCasillas;
    let array1 = new Array();
    let array2 = new Array();
    let arrayRandom = new Array();

    for (let index = 0; index < totalFiguras/2; index++) 
    {
        let numeroRandom = comprobarRepetido(generarNumRandom(), array1);

        array1[index] = numeroRandom;
        array2[index] = array1[index];
    }

    arrayRandom = array1.concat(array2);
    
    return arrayRandom.sort(function() {return Math.random() - 0.5});
}

function generarNumRandom() {
    return Math.floor(Math.random()*(personajes.length));
}

function comprobarRepetido(num, array) {
    for (let j = 0; j < array.length; j++) {
        if(num === array[j]) {
            num = generarNumRandom();
            j--;
        }
    }
    return num;
}

function eventoClick(figura) {
    revelarFigura(figura);

    if (click1 == null) {
        click1 = figura;
    }
     else if(click2 == null) {
        click2 = figura;
    }
    if(click1 != null && click2 != null) 
    {
        comprobar(click1, click2);
        click1 = null;
        click2 = null;
    }
}

function revelarFigura(figura) {
    figura.setAttribute('src', 'images/'+personajes[indicePersonajes[figura.name]]+'.png');
}

function comprobar(click1, click2) {
    if (click1.src == click2.src) 
    {
        contAciertos++;

        click1.removeAttribute('onclick');
        click2.removeAttribute('onclick');

        click1.setAttribute('style', 'cursor: not-allowed');
        click2.setAttribute('style', 'cursor: not-allowed');
    } else {
        setTimeout(function() {
            click1.setAttribute('src', `images/${imgEncubrimiento}`);
            click2.setAttribute('src', `images/${imgEncubrimiento}`);
        }, 1000);
    }

    if(contAciertos == cantidadParejas) {
        setTimeout(function() {
            window.location.href = 'winner.html';
        }, 1000);
    }
}