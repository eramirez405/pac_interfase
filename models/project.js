var mongoose = require('mongoose');

var projectSchema = mongoose.Schema({
	reg_date: String,
	nosecuencial: Number,
	descripcion: String,
	tipo: String,
	solicitante: String,
	gerente: String,
	lider: String,
	unidad_planta: Number,
	lugar: String,
	costo_estimado: Number,
	costo_aprobado: Number,
	fp: String,
	usuario: {
		type:Number,
		default: 1234
	},
	comentario: String,
	estado: String,
	desde: {
		type:Date,
		default: Date.now
	},
	ejecutante: String,
	fecha_recibido: Date,
	fecha_para_aprobacion: Date,
	fecha_aprobado: Date
});

var Project = module.exports = mongoose.model('Project', projectSchema);

//Get all projects
module.exports.getProjects = function(callback){
	Project.find(callback);
}

//Get project by ID
module.exports.getProjectByID = function(id, callback){
	Project.findById(id, callback);
}

//Get project by fp
module.exports.getProjectsByFp = function(fp, callback){
	var query = {fp: fp};
	Project.find(query, callback);
}

//Get project by everything
module.exports.getProjectsByDesc = function (descripcion, desde, hasta, callback) {
	var query = {descripcion: { "$regex": descripcion, "$options": "i" }, reg_date: {"$gte": desde, "$lt": hasta}}
	Project.find(query, callback);
}

//Create project
module.exports.createProject = function(newProject, callback){
	newProject.save(callback);
}

//Update a project
module.exports.updateProject = function(id, data, callback){
	var nosecuencial = 			data.nosecuencial;
	var descripcion = 			data.descripcion;
	var tipo = 					data.tipo;
	var solicitante = 			data.solicitante;
	var gerente = 				data.gerente;
	var lider = 				data.lider;
	var unidad_planta = 		data.unidad_planta;
	var lugar = 				data.lugar;
	var costo_estimado = 		data.costo_estimado;
	var costo_aprobado = 		data.costo_aprobado;
	var fp = 					data.fp;
	var comentario = 			data.comentario;
	var estado = 				data.estado;
	var desde = 				data.desde;
	var ejecutante =			data.ejecutante;
	var fecha_recibido = 		data.fecha_recibido;
	var fecha_para_aprobacion = data.fecha_para_aprobacion;
	var fecha_aprobado = 		data.fecha_aprobado;

	var query = {_id: id};

	Project.findById(id, function(err, project){
		if(!project){
			return next(new Error('Could not load project'));
		} else {
			//Update
			project.nosecuencial = 			nosecuencial;
			project.descripcion = 			descripcion;
			project.tipo = 					tipo;
			project.solicitante = 			solicitante;
			project.gerente = 				gerente;
			project.lider = 				lider;
			project.unidad_planta = 		unidad_planta;
			project.lugar = 				lugar;
			project.costo_estimado = 		costo_estimado;
			project.costo_aprobado = 		costo_aprobado;
			project.fp = 					fp;
			project.comentario = 			comentario;
			project.estado = 				estado;
			project.desde = 				desde;
			project.ejecutante =			ejecutante;
			project.fecha_recibido = 		fecha_recibido;
			project.fecha_para_aprobacion = fecha_para_aprobacion;
			project.fecha_aprobado = 		fecha_aprobado;

			project.save(callback);
		}
	});

}

//Remove project
module.exports.removeProject = function(id, callback){
	Project.find({_id: id}).remove(callback);
}