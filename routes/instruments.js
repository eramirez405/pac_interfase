var express = require('express');
var router = express.Router();

var Instrument = require('../models/instrument');


router.get('/', function(req, res, next) {
  Instrument.getInstruments(function(err, instruments){
  	if(err){
  		console.log(err);
  	}
  	res.json(instruments);
  });
});

router.get('/:id', function(req, res, next) {
  Instrument.getInstrumentByID(req.params.id, function(err, instrument){
  	if(err){
  		console.log(err);
  	}
  	res.json(instrument);
  });
});

router.get('/fp/:fp', function(req, res, next) {
  Instrument.getInstrumentsByFp(req.params.fp, function(err, instrument){
  	if(err){
  		console.log(err);
  	}
  	res.json(instrument);
  });
});

module.exports = router;
