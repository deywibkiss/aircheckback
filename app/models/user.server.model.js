var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	age: Number,
	email: String,
	symptoms: [],
	location: {}
});

mongoose.model('User', UserSchema);