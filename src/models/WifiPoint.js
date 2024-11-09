const mongoose = require('mongoose');

const wifiPointSchema = new mongoose.Schema({
  id: String,
  programa: String,
  fecha_instalacion: { type: Date, default: null },
  latitud: Number,
  longitud: Number,
  colonia: String,
  alcaldia: String,
  location: { type: { type: String }, coordinates: [Number] }
});

wifiPointSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('WifiPoint', wifiPointSchema);
