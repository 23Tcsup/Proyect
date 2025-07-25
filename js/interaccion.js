const video = document.getElementById('miVideo');
const pregunta = document.getElementById('pregunta');
const audioBien = document.getElementById('bien');
const audioMal = document.getElementById('mal');

let preguntaMostrada = false;

video.addEventListener('timeupdate', function () {
  // Pausar en el segundo 10 para mostrar pregunta
  if (video.currentTime >= 10 && !preguntaMostrada) {
    video.pause();
    pregunta.style.display = 'block';
    preguntaMostrada = true;
  }
});

function responder(correcto) {
  if (correcto) {
    audioBien.play();
    alert("¡Correcto! El núcleo controla las funciones de la célula.");
    pregunta.style.display = 'none';
    video.play();
  } else {
    audioMal.play();
    alert("Respuesta incorrecta. Intenta de nuevo.");
  }
}
