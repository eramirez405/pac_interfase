var express = require('express');
var router = express.Router();
const request = require('request');
const key = require('../config/key');

//Get particular vars
router.get('/get/vars/:varType', (req,res) => {
	console.log('http://192.168.0.3/api/v1/device/strategy/vars/'+ req.params.varType);
	request.get('http://192.168.0.3/api/v1/device/strategy/vars/'+ req.params.varType, function (error, response, body) {
	  console.error('error:', error); // Print the error if one occurred
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  console.log('body:', body); // Print the HTML for the Google homepage.

	  res.json(body);
	}).auth(key.id, key.key, false);

});

//Get particular table
router.get('/get/tables/:tableType/:tableList', (req,res) => {

	request.get('http://192.168.0.3/api/v1/device/strategy/tables/'+ req.params.tableType + '/' + req.params.tableList, function (error, response, body) {
	  console.error('error:', error); // Print the error if one occurred
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  console.log('body:', body); // Print the HTML for the Google homepage.

	  res.json(body);
	}).auth(key.id, key.key, false);

});

//Get tables list
router.get('/get/tables/:tableType', (req,res) => {

	request.post('http://192.168.0.3/api/v1/device/strategy/tables/'+req.params.tableType, function (error, response, body) {
	  console.error('error:', error); // Print the error if one occurred
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  console.log('body:', body); // Print the HTML for the Google homepage.

	  res.json(body);
	}).auth(key.id, key.key, false);

});


//Set digital Output
router.get('/post/digitalOutput/:ioName/:value', (req,res) => {
	var value = (req.params.value == 'true');
	console.log(value);
	console.log(typeof value);


	request.post('http://192.168.0.3/api/v1/device/strategy/ios/digitalOutputs/'+req.params.ioName+'/state', function (error, response, body) {
	  console.error('error:', error); // Print the error if one occurred
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  console.log('body:', body); // Print the HTML for the Google homepage.

	  res.json(body);
	}).auth(key.id, key.key, false).form(JSON.stringify({"value" : value}));

});

//Set Analog Output
router.get('/post/analogOutput/:ioName/:value', (req,res) => {
	var value = Number(req.params.value);
	console.log(value);
	console.log(typeof value);


	request.post('http://192.168.0.3/api/v1/device/strategy/ios/analogOutputs/'+req.params.ioName+'/eu', function (error, response, body) {
	  console.error('error:', error); // Print the error if one occurred
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  console.log('body:', body); // Print the HTML for the Google homepage.

	  res.json(body);
	}).auth(key.id, key.key, false).form(JSON.stringify({"value" : value}));

});

//Get values from Digital/Analog - Inputs/Outputs 
router.get('/get/inputType/:inputTypeIO/:inputType', (req, res) => {

  if (req.params.inputTypeIO === 'input' && req.params.inputType === 'analog') {

  	request.get('http://192.168.0.3/api/v1/device/strategy/ios/analogInputs', function (error, response, body) {
	  console.error('error:', error); // Print the error if one occurred
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  console.log('body:', body); // Print the HTML for the Google homepage.

	  res.json(body);
	}).auth(key.id, key.key, false);

  } else if (req.params.inputTypeIO === 'input' && req.params.inputType === 'digital') {

  	request.get('http://192.168.0.3/api/v1/device/strategy/ios/digitalInputs', function (error, response, body) {
	  console.error('error:', error); // Print the error if one occurred
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  console.log('body:', body); // Print the HTML for the Google homepage.

	  res.json(body);
	}).auth(key.id, key.key, false);

  } else if (req.params.inputTypeIO === 'output' && req.params.inputType === 'analog') {

  	request.get('http://192.168.0.3/api/v1/device/strategy/ios/analogOutputs', function (error, response, body) {
	  console.error('error:', error); // Print the error if one occurred
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  console.log('body:', body); // Print the HTML for the Google homepage.

	  res.json(body);
	}).auth(key.id, key.key, false);

  } else if (req.params.inputTypeIO === 'output' && req.params.inputType === 'digital') {

  	request.get('http://192.168.0.3/api/v1/device/strategy/ios/digitalOutputs', function (error, response, body) {
	  console.error('error:', error); // Print the error if one occurred
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  console.log('body:', body); // Print the HTML for the Google homepage.

	  res.json(body);
	}).auth(key.id, key.key, false);

  } else {
  	res.json({error: 'This type of request is not supported by the app, contact support'});
  }

});

module.exports = router;
