export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    const ts = Date.now();
    const response = await fetch(
      `https://tiempo-real.renfe.com/renfe-visor/flota.json?v=${ts}`,
      {
        headers: {
          'Referer': 'https://tiempo-real.renfe.com/',
          'User-Agent': 'Mozilla/5.0 (compatible)',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Error al contactar Renfe' });
    }

    const data = await response.json();
    res.setHeader('Cache-Control', 's-maxage=25, stale-while-revalidate');
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: 'Error interno', detail: err.message });
  }
}
