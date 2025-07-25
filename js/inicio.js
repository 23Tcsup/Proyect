const eventos = document.querySelectorAll('.event');

  const mostrarEvento = () => {
    eventos.forEach(e => {
      const rect = e.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        e.classList.add('visible');
      }
    });
  };

  window.addEventListener('scroll', mostrarEvento);
  window.addEventListener('load', mostrarEvento);