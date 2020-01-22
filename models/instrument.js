var mongoose = require('mongoose');

var instrumentSchema = mongoose.Schema({
	tag: String,
	fabricante: String,
	modelo: String,
	uso: String,
	unidad_de_planta: String,
	fluido: String,
	densidad_de_fluido: String,
	presion_normal: String,
	presion_maxima: String,
	rango_salida: String,
	rango: String,
	unidad_ingenieria: String,
	comunicacion: String,
	ip: String,
	puerto: String,
	no_serie: Number,
	ruta: String,
	fecha_instalacion: Date,
	fecha_registro: Date,
	fp: String,
	usuario: String,
	estado: String,
	desde: Date
});

var Instrument = module.exports = mongoose.model('Instrument', instrumentSchema);

//Get all instruments
module.exports.getInstruments = function(callback){
	Instrument.find(callback);
}

//Get instrument by ID
module.exports.getInstrumentByID = function(id, callback){
	Instrument.findById(id, callback);
}

//Get instrument by fp
module.exports.getInstrumentsByFp = function(fp, callback){
	var query = {fp: fp};
	Instrument.find(query, callback);
}

//Create instrument
module.exports.createInstrument = function(newInstrument, callback){
	Instrument.save(callback);
}