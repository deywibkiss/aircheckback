var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;

var LocationSchema = new Schema({
	latitude	: Number,
	longitude	: Number
});

var ReportSchema = new Schema({
	user     	: { type: Schema.Types.ObjectId, ref: 'User' },
	type		: String,
	location	: { type: Schema.Types.ObjectId, ref: 'Location' }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

mongoose.model('Report', ReportSchema);
mongoose.model('Location', LocationSchema);