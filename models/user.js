const mongoose = require('mongoose');

//User Schema
const UserSchema = mongoose.Schema({
	name:{
		type:String,
		required: true
	},
	lastname:{
		type:String,
		required: true
	},
	email:{
		type:String,
		required: true
	},
	username:{
		type:String,
		required: true
	},
	password:{
		type:String,
		required: true
	},
	reg_date:{
		type:Date,
		required: true
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

//Create project
module.exports.createUser = function(newProject, callback){
	newProject.save(callback);
}