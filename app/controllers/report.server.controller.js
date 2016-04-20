var User = require('mongoose').model('User');
var Report = require('mongoose').model('Report');
var Location = require('mongoose').model('Location');

var getErrorMessage = function(err) {
	var message = '';
	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Report already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message)
				message = err.errors[errName].message;
		}
	}

	return message;
};



exports.create = function(req, res, next) {

	User.findOne({ _id: req.body.userID }, function(err, user) {

		if (err) {
			console.log(err);
			res.status(500).json({error: 'Not found User'}); return;
		}

		var location = new Location();

		location.latitude = req.body.latitude;
		location.longitude = req.body.longitude;

		location.save(function (err) {
			if (err) {
				console.log(err);
				res.status(500).json({error: 'Not saved location'}); return;
			}

			var report = new Report();

			report.user = user;
			report.type = req.body.type;
			report.location = location;

			report.save(function (err) {
				if (err) {
					console.log(err);
					res.status(500).json({error: 'Not saved report'}); return;
				}

				res.json({success: 'The report was saved successfully'}); return;
			});
		});
	});

};

exports.list = function(req, res, next) {
	Report.find({}, function(err, users) {
		if (err) {
			return next(err);
		} else {
			res.json(users);
		}
	});
};