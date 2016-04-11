var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var MaterialSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	name: {
		type: String,
		default: '',
		trim: true,
		required: "Title can't be blank"
	},

	category: {
		type: String,
		default: 'buttons',
		trim: true,
		required: "Category can't be blank"
	},

	description: {
		type: String,
		default: '',
		trim: true
	},

	code: {
		type: String,
		default: '',
		trim: false
	}
});

mongoose.model('Material', MaterialSchema);