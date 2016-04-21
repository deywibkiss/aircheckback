var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;

var ReportSchema = new Schema({
	user     	: { type: Schema.Types.ObjectId, ref: 'User' },
	type		: String,
	subtype		: String,
	location	: {}
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

mongoose.model('Report', ReportSchema);