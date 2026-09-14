async function obtenerFrase() {
  const elementoFrase = document.getElementById('frase');
  const elementoAutor = document.getElementById('autor');

  elementoFrase.innerText = "Consultando a la nube...";
  elementoAutor.innerText = "";

  try {
    const respuesta = await fetch('/api/frase');
    const datos = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(datos.error || 'Error al obtener la frase');
    }

    elementoFrase.innerText = `"${datos.frase}"`;
    elementoAutor.innerText = `— ${datos.autor}`;
  } catch (error) {
    elementoFrase.innerText = "Hubo un error al cargar la frase.";
    elementoAutor.innerText = error.message;
  }
}
