const draggables = document.querySelectorAll('.draggabl');
const dropZones = document.querySelectorAll('.drop-zone');
const verificarBtn = document.getElementById('verificarBtn');
const resultado = document.getElementById('resultado');

// Hacer los elementos arrastrables
draggables.forEach(elem => {
  elem.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', e.target.id);
  });
});

// Permitir soltar
dropZones.forEach(zone => {
  zone.addEventListener('dragover', e => e.preventDefault());
  zone.addEventListener('drop', e => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const dragged = document.getElementById(id);
    if (zone.children.length === 0) {
      zone.appendChild(dragged);
    }
  });
});

// Mapeo correcto: zona -> ID correcto
const respuestasCorrectas = {
  zona1: "capsula",
  zona2: "pared",
  zona3: "plasmido",
  zona4: "citoplasma",
  zona5: "adn",
  zona6: "ribosomas",
  zona7: "inclusiones",
  zona8: "pili",
  zona9: "membran"
};

// Verificar respuestas
verificarBtn.addEventListener("click", () => {
  let correctas = 0;

  Object.keys(respuestasCorrectas).forEach(zonaId => {
    const zona = document.getElementById(zonaId);
    const elemento = zona.firstElementChild;
    if (elemento && elemento.id === respuestasCorrectas[zonaId]) {
      zona.style.borderColor = "green";
      correctas++;
    } else {
      zona.style.borderColor = "red";
    }
  });

  const total = Object.keys(respuestasCorrectas).length;

  // Mostrar modal
  const modal = document.getElementById('modalResultado');
  const titulo = document.getElementById('tituloModal');
  const imagen = document.getElementById('imagenModal');
  const btnReintentar = document.getElementById('reintentarBtn');

  if (correctas === total) {
    titulo.textContent = "🎉 ¡Excelente!";
    imagen.src = "https://cdn-icons-png.flaticon.com/512/3159/3159066.png";
    btnReintentar.style.display = "none";
  } else {
    titulo.textContent = "❌ Ups, hubo un error...";
    imagen.src = "https://cdn-icons-png.flaticon.com/512/463/463612.png";
    btnReintentar.style.display = "inline-block";
  }

  modal.style.display = "block";
});

// Cerrar modal
document.getElementById('cerrarModals').onclick = function () {
  document.getElementById('modalResultado').style.display = "none";
};

// Reintentar
document.getElementById('reintentarBtn').onclick = function () {
  dropZones.forEach(zone => {
    const elemento = zone.firstElementChild;
    if (elemento && elemento.classList.contains('draggabl')) {
      document.getElementById('opciones').appendChild(elemento); // Recoloca aquí
    }
    zone.style.borderColor = ""; // Limpia el borde
  });

  document.getElementById('modalResultado').style.display = "none";
};


/*juegos*/

const draggabless = document.querySelectorAll('.draggable');
const dropzones = document.querySelectorAll('.dropzone');

const sonidoCorrecto = document.getElementById('audio-correcto');
const sonidoIncorrecto = document.getElementById('audio-incorrecto');

draggabless.forEach(item => {
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

  const resultad = document.getElementById('resultados');
  if (correctos === dropzones.length) {
    resultad.textContent = '¡Muy bien! Todas las respuestas son correctas.';
    resultad.style.color = 'green';
    sonidoCorrecto.play();
  } else {
    resultad.textContent = 'Algunas respuestas son incorrectas. Intenta de nuevo.';
    resultad.style.color = 'red';
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

  document.getElementById('resultados').textContent = ''; 
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
