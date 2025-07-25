const draggables = document.querySelectorAll('.draggable');
const dropzones = document.querySelectorAll('.dropzone');

const sonidoCorrecto = document.getElementById('audio-correcto');
const sonidoIncorrecto = document.getElementById('audio-incorrecto');

draggables.forEach(item => {
  item.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', item.id);
  });
});

dropzones.forEach(zone => {
  zone.addEventListener('dragover', e => {
    e.preventDefault();
  });

  zone.addEventListener('drop', e => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text');
    const draggedElement = document.getElementById(id);

    // Limpiar zona
    zone.innerHTML = '';
    zone.appendChild(draggedElement);
  });
});

function verificar() {
  let correctos = 0;
  dropzones.forEach(zone => {
    const correcto = zone.getAttribute('data-correcto');
    const hijo = zone.querySelector('.draggable');
    if (hijo && hijo.id === correcto) {
      correctos++;
    }
  });

  const resultado = document.getElementById('resultado');
  if (correctos === dropzones.length) {
    resultado.textContent = '¡Muy bien! Todas las respuestas son correctas.';
    resultado.style.color = 'green';
    sonidoCorrecto.play();
  } else {
    resultado.textContent = 'Algunas respuestas son incorrectas. Intenta de nuevo.';
    resultado.style.color = 'red';
    sonidoIncorrecto.play();
  }
}

  const textosOriginales = {};
  document.querySelectorAll('.dropzone').forEach((dz, i) => {
    textosOriginales[i] = dz.innerHTML;
  });

function restaurar() {
  const elementos = document.querySelectorAll('.draggable');
  const contenedorOriginal = document.querySelector('.elementos');

  elementos.forEach(el => {
    contenedorOriginal.appendChild(el); 
  });
  document.querySelectorAll('.dropzone').forEach((dz, i) => {
      dz.innerHTML = textosOriginales[i];
    });

  document.getElementById('resultado').textContent = ''; 
}


function mostrarSeccion(tipo) {
  const secciones = document.querySelectorAll('.partes-celula');
  secciones.forEach(sec => sec.style.display = 'none');

  const activa = document.getElementById(tipo);
  if (activa) activa.style.display = 'block';

  document.getElementById('funcion').textContent = "";
}

function mostrarFuncion(parte) {
  const funciones = {
    // Procariota
    capsula: "Protege a la célula y le ayuda a adherirse a superficies.",
    pared: "Da forma y rigidez a la célula.",
    membrana: "Controla lo que entra y sale de la célula.",
    citoplasma: "Sustancia donde ocurren reacciones químicas.",
    adn: "Contiene la información genética de la célula.",
    plasmido: "Fragmento de ADN adicional que puede dar ventajas.",
    ribosomas: "Fabrican proteínas esenciales para la célula.",
    pili: "Permiten la adhesión a otras células o superficies.",

    // Animal
    nucleo: "Contiene el ADN y dirige todas las actividades celulares.",
    mitocondria: "Genera energía a través de la respiración celular.",
    lisosoma: "Degrada desechos y materiales dañinos.",
    centriolos: "Organizan el huso mitótico durante la división celular.",

    // Vegetal
    cloroplasto: "Realiza la fotosíntesis para producir alimento.",
    vacuola: "Almacena agua y sustancias nutritivas.",
  };

  const texto = funciones[parte] || "No se encontró la descripción.";
  document.getElementById('funcion').textContent = texto;
}
