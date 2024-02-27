/*  Santiago Elisardo González Herrera
    2022140
    Fecha de creación: 30/08/2023
    Modificaciones:
    4/09/2023: Cambié los id de mis botones por class ya que era muchas líneas innecesarias
*/

// Palabras random función
const palabras = ["camisa", "tomate", "itzep", "genegod", "prueba", "texto", "primero", "kinal", "jamon", "agua", "david"];

// Variables del canvas junto a la imagen
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const imagenFondo = new Image();
imagenFondo.src = 'img/palo.jpg'; // Asegúrate de que la ruta de la imagen sea correcta

// Función donde selecciono una palabra al azar
const seleccionarPalabraRandom = () => {
    const palabra = palabras[Math.floor(Math.random() * palabras.length)].toUpperCase();
    selectedWord = palabra.split(''); // Convierte la palabra en un array de letras

    palabraOculta = selectedWord.map(() => "_");
}

const mostrarElementos = () => {
    const contenedorJuego = document.getElementById('contenedor-juego');
    contenedorJuego.classList.remove('oculto');
};

/////////////////////////////
//// Código del ahorcado ////
/////////////////////////////

// Variables
const palabra_contenida = document.getElementById('palabra_contenida');
const botonesUsados = document.getElementById('botones');
const startButton = document.getElementById('startButton');
const botonesLetra = document.querySelectorAll('.boton-letra');




const letterEvent = (event) => {
    letterInput(letter);
    
    
}
let selectedWord;
let botones;
let errores = 0;
let aciertos;
let letrasOcultas = [];
let letrasAdivinadas = [];
const letrasUsadas = [];

const mostrarLetrasUsadas = () => {
    const palabrasUsadasElement = document.getElementById('palabras_usadas');
    palabrasUsadasElement.textContent = `Letras Usadas: ${letrasUsadas.join(', ')}`;
};


const esLetraCorrecta = (letra, palabra, boton) => {
    letra = letra.toUpperCase();
    palabra = palabra.toUpperCase();
    
    let letraCorrecta = false;
    
    for (let i = 0; i < palabra.length; i++) {
        if (palabra[i] === letra) {
            // Actualiza letrasOcultas con la letra correcta
            letrasOcultas[i] = letra;
            letraCorrecta = true;
        }
    }
    
    if (letraCorrecta) {
        console.log(`La letra "${letra}" es correcta.`);
        letrasAdivinadas.push(letra); // Agrega la letra a las letras adivinadas
        palabraOculta = actualizarPalabraOculta(selectedWord, letrasAdivinadas);
        dibujarPalabra();
        boton.disabled = true; // Deshabilita el botón
        verificarBotonesCorrectos(); // Verificar si todas las letras adivinadas son correctas
        
        // Llamada a verificar victoria después de adivinar la letra
        verificarVictoria();
    } else {
        console.log(`La letra "${letra}" no es correcta.`);
        agregarParteDelCuerpo(); // Agrega una parte del cuerpo en caso de error
        // Puedes realizar otras acciones aquí si la letra no es correcta
    }
    
    // Agregar la letra usada al arreglo
    letrasUsadas.push(letra);
    mostrarLetrasUsadas();
}

botonesLetra.forEach(boton => {
    boton.addEventListener('click', () => {
        const letra = boton.getAttribute('data-letra'); // Obtiene la letra del atributo data-letra
        esLetraCorrecta(letra, selectedWord.join(''), boton); // Pasa el botón como argumento
    });
});

// Final
const verificarBotonesCorrectos = () => {
    if (letrasAdivinadas.length === selectedWord.length &&
        letrasAdivinadas.every((letra, index) => letra === selectedWord[index])) {
        alert('¡Has Ganado!');
        startGame(); // Reiniciar el juego
    }
}


const verificarVictoria = () => {
    if (palabraOculta.join('') === selectedWord.join('')) {
        setTimeout(() => {
            // Muestra la alerta de victoria
            const victoryAlert = document.getElementById('victory-alert');
            victoryAlert.style.display = 'block';
            setTimeout(() => {
                victoryAlert.style.display = 'none'; // Oculta la alerta después de unos segundos
            }, 3000); // Cambia 3000 a la cantidad de milisegundos que desees que la alerta permanezca visible
            startGame(); // Reiniciar el juego
        }, 100); // Retrasa la alerta en milisegundos
    }
}

// Pintar la palabra
const dibujarPalabra = () => {
    palabra_contenida.innerHTML = ''; // Limpia el contenido anterior

    palabraOculta.forEach((letter, index) => {
        const letterElement = document.createElement('span');
        if (index !== palabraOculta.length - 1) {
            letterElement.innerHTML = letter + " ";
        } else {
            letterElement.innerHTML = letter;
        }
        letterElement.classList.add('letter');
        if (letter !== "_") {
            letterElement.classList.remove('hidden'); // Muestra letras adivinadas
        }
        palabra_contenida.appendChild(letterElement);
    });
}

const startGame = () => {    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    errores = 0;
    aciertos = 0;

    palabra_contenida.innerHTML = '';

    // Remueve la clase 'oculto' del contenedor de botones
    botonesUsados.classList.remove('oculto');

    palo();

    seleccionarPalabraRandom();
    
    const contenedorBotones = document.getElementById('botones');
    contenedorBotones.classList.remove('oculto');

    dibujarPalabra();
    
    botonesLetra.forEach(boton => {
        boton.disabled = false;
    });

    //parte del cuerpo
    bodyPartsInfo = [];

    // Escuchar eventos de teclado nuevamente
    document.addEventListener('keydown', letterEvent);
    console.log("Inicio del juego");
};



const palo = (errores) => {
    // Dibuja la imagen en el canvas como fondo
    ctx.drawImage(imagenFondo, 0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(320, 150, 40, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();

    // Dibuja las partes del cuerpo según la cantidad de errores
    for (let i = 0; i < errores; i++) {
        if (partesDelCuerpo[i]) {
            partesDelCuerpo[i]();
        }
    }
};


const dibujarmiCuerpo = () => {
    ctx.beginPath();
    ctx.moveTo(320, 190); 
    ctx.lineTo(320, 260); 
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();
};

const dibujarPierna = () => {
    ctx.beginPath();
    ctx.moveTo(320, 260); 
    ctx.lineTo(280, 320); 
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();
};

const dibujarOtraPierna = () => {
    ctx.beginPath();
    ctx.moveTo(320, 260); 
    ctx.lineTo(360, 320); 
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();
};

const dibujarBrazoDerecho = () => {
    ctx.beginPath();
    ctx.moveTo(320, 220); 
    ctx.quadraticCurveTo(330, 210, 360, 220); 
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();
};

const dibujarBrazoIzquierdo = () => {
    ctx.beginPath();
    ctx.moveTo(320, 220); 
    ctx.quadraticCurveTo(310, 210, 280, 220); 
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();
};

const dibujarOjoX1 = () => {
    ctx.beginPath();
    ctx.moveTo(310, 145); 
    ctx.lineTo(320, 135); 
    ctx.moveTo(320, 145); 
    ctx.lineTo(310, 135); 
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
};

const dibujarOjoContrario = () => {
    ctx.beginPath();
    ctx.moveTo(325, 135); 
    ctx.lineTo(335, 145); 
    ctx.moveTo(335, 135); 
    ctx.lineTo(325, 145);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
};

const partesDelCuerpo = [
    dibujarmiCuerpo,
    dibujarPierna,
    dibujarOtraPierna,
    dibujarBrazoDerecho,
    dibujarBrazoIzquierdo,
    dibujarOjoX1,
    dibujarOjoContrario,
];

const bodyPartsInfo = [];

const agregarParteDelCuerpo = () => {
    if (errores < partesDelCuerpo.length) {
        // Llama a la función correspondiente en la matriz de partesDelCuerpo
        partesDelCuerpo[errores]();
        errores++; // Incrementa el contador de errores
        palo(errores); // Llama a la función para dibujar las partes del cuerpo
    } else {
        // Si todas las partes del cuerpo se han dibujado y el jugador no ha adivinado la palabra, muestra un mensaje de que ha perdido y reinicia el juego
        alert('¡Has perdido!');
        startGame(); // Reiniciar el juego
    }
}

const actualizarPalabraOculta = (palabra, letrasAdivinadas) => {
    return palabra.map(letra => (letrasAdivinadas.includes(letra) ? letra : "_"));
}

const resetGame = () => {
    // Reiniciar el arreglo de letras usadas
    letrasUsadas.length = 0;

    // Actualizar la visualización de letras usadas en la página
    mostrarLetrasUsadas();
};

// Agrega un evento click al botón de reiniciar
const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetGame);

startButton.addEventListener('click', startGame);








