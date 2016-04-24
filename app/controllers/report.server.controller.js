var User = require('mongoose').model('User');
var Report = require('mongoose').model('Report');

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



exports.create = function(socket) {
	return function(req, res, next) {

		User.findOne({ _id: req.body.userID }, function(err, user) {

			if (err) {
				console.log(err);
				res.status(500).json({error: 'Not found User'}); return;
			}

			var report = new Report(req.body);

			report.save(function (err) {
				if (err) {
					console.log(err);
					res.status(500).json({error: 'Not saved report'}); return;
				}

				socket.emit('report get', report);
				console.log("Emite..");
				res.json({success: 'The report was saved successfully'}); return;
			});
		});
	};
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

exports.stadistic = function(req, res, next) {
	Report.find({}, function(err, report) {
		if (err) return next(err);
		else {

			var subtypes = [];

			for (i = 0; i < report.length; i++) {

				var index = -1;
				for (k = 0; k < subtypes.length; k++) 
					if( subtypes[k]['subtype'] == report[i].subtype ) { index = k; break; }

				if( index < 0 ) subtypes.push( { 'subtype': report[i].subtype, 'count': 1 } );
				else{
					subtypes[index]['count']++;
				}
				
			}

			res.json(subtypes);
		}
	});
};

exports.getReport = function(req, res, next) {
	res.render('getReport');
};

exports.listType = function(req, res, next) {

	var type = req.params.type;

	Report.find({type: type}, function(err, users) {
		if (err) {
			return next(err);
		} else {
			res.json(users);
		}
	});


};