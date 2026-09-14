export default async function handler(request, response) {
  try {
    // 1. Obtener la frase aleatoria en inglés
    const res = await fetch('https://dummyjson.com/quotes/random');
    const data = await res.json();

    if (!data || !data.quote) {
      return response.status(500).json({ error: 'No se pudo obtener la cita.' });
    }

    // 2. Traducir la frase al español usando MyMemory Translation API
    const urlTraducion = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(data.quote)}&langpair=en|es`;
    const resTrad = await fetch(urlTraducion);
    const dataTrad = await resTrad.json();

    const fraseEspanol = dataTrad.responseData?.translatedText || data.quote;

    // 3. Retornar la frase traducida hacia la SPA
    return response.status(200).json({
      frase: fraseEspanol,
      autor: data.author
    });

  } catch (error) {
    return response.status(500).json({ error: 'Error interno en la función Serverless.' });
  }
}
