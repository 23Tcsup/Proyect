document.getElementById("formularioInicio").addEventListener("submit", function (e) {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const edad = document.getElementById("edad").value;

  document.getElementById("textoSaludo").innerText = `Hola, ${nombre} 👋 ¡Buena suerte!`;
  document.getElementById("saludo").style.display = "block";
  document.getElementById("quiz").style.display = "block";
  document.getElementById("formularioInicio").style.display = "none";
});

document.getElementById("entregar").addEventListener("click", function () {
  const respuestas = {
    p1: "B",
    p2: "A",
    p3: "B",
    p4: "A",
    p5: "B",
    p6: "B",
    p7: "C",
    p8: "A",
    p9: "A",
    p10: "B"
  };

  let correcto = true;
  for (let i = 1; i <= 10; i++) {
    const seleccionada = document.querySelector(`input[name="p${i}"]:checked`);
    if (!seleccionada || seleccionada.value !== respuestas[`p${i}`]) {
      correcto = false;
      break;
    }
  }

  if (correcto) {
    Swal.fire({
      title: "🎉 ¡Excelente!",
      text: "Gran trabajo",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
      imageWidth: 100,
      imageHeight: 100,
      showCancelButton: true,
      confirmButtonText: "Inicio",
      confirmButtonColor: "#28a745",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "index.html"; // Cambia a la página que desees
      }
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "❌ Vuelve a intentarlo",
      text: "Parece que hay respuestas incorrectas.",
      confirmButtonText: "Ok",
    }).then(() => {
      // Reiniciar el formulario
      document.getElementById("quiz").reset();
      const inputs = document.querySelectorAll('input[type="radio"]');
      inputs.forEach(input => input.checked = false);
    });
  }
});
