
const clasificacion = {
    "escherichia-coli": "procariota",
  "lactobacillus": "procariota",
  "streptococcus": "procariota",
  "homo-sapiens": "eucariota-animal",
  "felis-catus": "eucariota-animal",
  "rana-pipiens": "eucariota-animal",
  "pinus": "eucariota-vegetal",
  "zea-mays": "eucariota-vegetal",
  "chlamydomonas": "eucariota-vegetal"
};

function verificarTipos() {
    const dropzones = document.querySelectorAll('.dropzone');
    let aciertos = 0;

    dropzones.forEach(drop => {
        const dropId = drop.dataset.correcto;
        const elementos = drop.querySelectorAll('.draggable');

        elementos.forEach(el => {
            const correcto = clasificacion[el.id];
            if (correcto === dropId) {
                el.style.borderColor = "green";
                aciertos++;
            } else {
                el.style.borderColor = "red";
            }
        });
    });

    document.getElementById('resultado-tipos').textContent =
        `Respuestas correctas: ${aciertos} de 12`;
}

function restaurarTipos() {
    const elementos = document.querySelectorAll('.draggable');
    const contenedor = document.querySelector('.juego-tipos .elementos');
    elementos.forEach(el => {
        el.style.borderColor = "#ec407a"; // Restaurar color
        contenedor.appendChild(el);
    });

    document.getElementById('resultado-tipos').textContent = '';
}

// Drag and drop básico
document.querySelectorAll('.draggable').forEach(el => {
    el.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', e.target.id);
    });
});

document.querySelectorAll('.dropzone').forEach(zone => {
    zone.addEventListener('dragover', e => e.preventDefault());
    zone.addEventListener('drop', e => {
        const id = e.dataTransfer.getData('text/plain');
        const dragged = document.getElementById(id);
        zone.appendChild(dragged);
    });
});
