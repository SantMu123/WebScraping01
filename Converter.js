import { Parser } from 'json2csv';
import fs from 'fs/promises';
import { Data } from './main.js';

const convertDataToCSV = async () => {
  try {
    // Obtener los datos
    const data = await Data('https://superastro.com.co/historico.php');

    // Define los campos del CSV
    const fields = ['fecha', 'numero', 'signo', 'sorteo'];

    // Crea un nuevo parser con los campos definidos
    const json2csvParser = new Parser({ fields });
    // Convierte el JSON a CSV
    const csv = json2csvParser.parse(data);

    // Escribe el CSV a un archivo
    await fs.writeFile('output.csv', csv);

    console.log('Archivo CSV creado exitosamente: output.csv');
  } catch (err) {
    console.error('Error al convertir JSON a CSV:', err);
  }
};

// Llamar a la función para convertir los datos y escribir el archivo CSV
convertDataToCSV();

