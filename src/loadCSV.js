const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const WifiPoint = require('./models/WifiPoint');
require('dotenv').config();

async function loadCSV() {
  await mongoose.connect(process.env.MONGO_URI);

  const records = [];

  fs.createReadStream('puntos_de_acceso_wifi.csv')
    .pipe(csv())
    .on('data', (row) => {
      const wifiPoint = new WifiPoint({
        id: row.id,
        programa: row.programa,
        fecha_instalacion: null,  // Ignora las fechas
        latitud: parseFloat(row.latitud),
        longitud: parseFloat(row.longitud),
        colonia: row.colonia,
        alcaldia: row.alcaldia,
        location: {
          type: 'Point',
          coordinates: [parseFloat(row.longitud), parseFloat(row.latitud)]
        }
      });
      records.push(wifiPoint.save().catch(error => {
        console.error(`Error saving record with id ${row.id}:`, error.message);
      }));
    })
    .on('end', async () => {
      console.log('Processing records...');
      await Promise.all(records);  // Espera a que todas las operaciones terminen
      mongoose.connection.close();
      console.log('CSV file successfully processed and MongoDB connection closed.');
    });
}

loadCSV().catch(error => {
  console.error('Error loading CSV:', error);
  mongoose.connection.close();
});
