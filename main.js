const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://superastro.com.co/historico.php';

axios.get(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    // Encuentra el enlace de la pestaña "astro LUNA"
    const astroLunaLink = $('a#profile-tab').attr('href');

    if (astroLunaLink) {
      // Extrae el contenido de la pestaña "astro LUNA"
      const astroLunaContent = $(astroLunaLink).html();

      // Carga el contenido de "astro LUNA" en Cheerio
      const $astroLuna = cheerio.load(astroLunaContent);

      // Extrae los datos de la tabla
      const data = [];
      $astroLuna('tbody tr').each((index, element) => {
        const fecha = $astroLuna(element).find('td').eq(0).text().trim();
        const numero = $astroLuna(element).find('td').eq(1).text().trim();
        const signo = $astroLuna(element).find('td').eq(2).text().trim();
        const sorteo = $astroLuna(element).find('td').eq(3).text().trim();
        
        data.push({ fecha, numero, signo, sorteo });
      });

      console.log('Datos extraídos:');
      console.log(data);
    } else {
      console.log('No se encontró el enlace para "astro LUNA"');
    }
  })
  .catch(error => {
    console.error('Error al hacer la solicitud:', error);
  });


