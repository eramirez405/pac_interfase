var express = require('express');
var router = express.Router();

var Project = require('../models/project');


router.get('/', function(req, res, next) {
  Project.getProjects(function(err, projects){
  	if(err){
  		console.log(err);
  	}
  	res.json(projects);
  });
});

router.get('/:id', function(req, res, next) {
  Project.getProjectByID(req.params.id, function(err, project){
  	if(err){
  		console.log(err);
  	}
  	res.json(project);
  });
});

router.get('/fp/:fp', function(req, res, next) {
  Project.getProjectsByFp(req.params.fp, function(err, project){
  	if(err){
  		console.log(err);
  	}
  	res.json(project);
  });
});

router.get('/descripcion/:descripcion/:desde/:hasta', function(req, res, next) {
  Project.getProjectsByDesc(req.params.descripcion, req.params.desde, req.params.hasta, function(err, project){
    if(err){
      console.log(err);
    }
    res.json(project);
  });
});

router.post('/', function(req, res, next) {

  //Get form values
  var reg_date =                req.body.reg_date;
  var nosecuencial =            req.body.nosecuencial;
  var descripcion =             req.body.descripcion;
  var tipo =                    req.body.tipo;
  var solicitante =             req.body.solicitante;
  var gerente =                 req.body.gerente;
  var lider =                   req.body.lider;
  var unidad_planta =           req.body.unidad_planta;
  var lugar =                   req.body.lugar;
  var costo_estimado =          req.body.costo_estimado;
  var costo_aprobado =          req.body.costo_aprobado;
  var fp =                      req.body.fp;
  var comentario =              req.body.comentario;
  var estado =                  req.body.estado;
  var ejecutante =              req.body.ejecutante;
  var fecha_recibido =          req.body.fecha_recibido;
  var fecha_para_aprobacion =   req.body.fecha_para_aprobacion;
  var fecha_aprobado =          req.body.fecha_aprobado;

  //Project Object
  var newProject = new Project({
    reg_date: reg_date,
    nosecuencial: nosecuencial,
    descripcion: descripcion,
    tipo: tipo,
    solicitante: solicitante,
    gerente: gerente,
    lider: lider,
    unidad_planta: unidad_planta,
    lugar: lugar,
    costo_estimado: costo_estimado,
    costo_aprobado: costo_aprobado,
    fp: fp,
    comentario: comentario,
    estado: estado,
    ejecutante: ejecutante,
    fecha_recibido: fecha_recibido,
    fecha_para_aprobacion: fecha_para_aprobacion,
    fecha_aprobado: fecha_aprobado
  });

  //Create Project
  Project.createProject(newProject, function(err, project) {
    if(err) {
      console.log(err);
    }

    //res.location('#!/add/project');
    //res.redirect('#!/add/project');
  });
});

//Update Project

router.put('/', function(req, res, next) {
  
  var id = req.body.id;
  
  var nosecuencial =      req.body.nosecuencial;
  var descripcion =       req.body.descripcion;
  var tipo =              req.body.tipo;
  var solicitante =       req.body.solicitante;
  var gerente =           req.body.gerente;
  var lider =             req.body.lider;
  var unidad_planta =     req.body.unidad_planta;
  var lugar =             req.body.lugar;
  var costo_estimado =    req.body.costo_estimado;
  var costo_aprobado =    req.body.costo_aprobado;
  var fp =                req.body.fp;
  var comentario =        req.body.comentario;
  var estado =            req.body.estado;
  var desde =             req.body.desde;
  var ejecutante =        req.body.ejecutante;
  var fecha_recibido =    req.body.fecha_recibido;
  var fecha_para_aprobacion = req.body.fecha_para_aprobacion;
  var fecha_aprobado =    req.body.fecha_aprobado;
  
  var data = {
    nosecuencial: nosecuencial,
    descripcion: descripcion,
    tipo: tipo,
    solicitante: solicitante,
    gerente: gerente,
    lider: lider,
    unidad_planta: unidad_planta,
    lugar: lugar,
    costo_estimado: costo_estimado,
    costo_aprobado: costo_aprobado,
    fp: fp,
    comentario: comentario,
    estado: estado,
    desde: desde,
    ejecutante: ejecutante,
    fecha_recibido: fecha_recibido,
    fecha_para_aprobacion: fecha_para_aprobacion,
    fecha_aprobado: fecha_aprobado
  };

//Update Project
  Project.updateProject(id, data, function(err, project) {
    if(err) {
      console.log(err);
    }

    res.location('/projects');
    res.redirect('/projects')
  });
});

//Remove project
router.delete('/:id', function(req, res, next) {
  var id = req.params.id;

//Remove project
  Project.removeProject(id, function(err, project) {
      if(err) {
        console.log(err);
      }

      res.location('/projects');
      res.redirect('/projects');
    }); 
}); 

 
module.exports = router;
