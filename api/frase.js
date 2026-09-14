export default async function handler(request, response) {
  try {
    // 1. Solicitamos una cita aleatoria a una API pública
    const res = await fetch('https://dummyjson.com/quotes/random');
    const data = await res.json();

    if (!data || !data.quote) {
      return response.status(500).json({ error: 'No se pudo obtener la cita.' });
    }

    // 2. Retornamos los datos procesados en formato JSON hacia la SPA
    return response.status(200).json({
      frase: data.quote,
      autor: data.author
    });

  } catch (error) {
    return response.status(500).json({ error: 'Error interno en la función Serverless.' });
  }
}
