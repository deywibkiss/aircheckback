var mongoose = require('mongoose'),
	Material = mongoose.model('Material');

var getErrorMessage = function(err) {
	if (err.errors) {
		for (var errName in err.errors) {
			if (err.errors[errName].message) return err.errors[errName].message;
		}
	} else {
		return 'Unknown server error';
	}
};

exports.create = function(req, res) {
	var material = new Material(req.body);

	material.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(material);
		}
	});
};

exports.update = function(req, res) {

	Material.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, material) {
	  if (err)
  		return res.status(500).send({
			message: getErrorMessage(err)
		});

	  res.send(material);
	});
};

exports.delete = function(req, res) {

	Material.find({ _id: req.params.id }).remove( function (err, material) {
	  if (err)
  		return res.status(500).send({
			message: getErrorMessage(err)
		});

    	return res.status(200).send({
  			message: 'Material eliminado correctamente.'
  		});
	});
};

exports.list = function(req, res) {
	Material.find({category: req.params.collection}).exec(function(err, materials) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(materials);
		}
	});
};

exports.get = function(req, res) {

	Material.findById(req.params.id).exec(function(err, material) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(material);
		}
	});
};

exports.updateFile = function(req, res) {

	var fs = require('fs');
	var path = req.body.path;

  	var file = req.files.file;


	fs.createReadStream(file.path).pipe(fs.createWriteStream( path  + file.name));

  	// Compile LESS
  	var sys = require('util')
	var exec = require('child_process').exec;
	exec("gulp", function(error, stdout, stderr){
		sys.puts(stdout);
		console.log(stderr);
	});
	
	return res.status(200).send({
		message: "Archivo Material actualizado y compilado."
	});


};

// exports.read = function(req, res) {
// 	res.json(req.todo);
// };

// exports.todoByID = function(req, res, next, id) {
// 	Todo.findById(id).populate('creator', 'name username').exec(function(err, todo) {
// 		if (err)
// 			return next(err);

// 		if (!todo)
// 			return next(new Error('Failed to load todo ' + id));

// 		req.todo = todo;
// 		next();
// 	});
// };

// exports.update = function(req, res) {
// 	var todo = req.todo;
// 	todo.title = req.body.title;
// 	todo.comment = req.body.comment;
// 	todo.completed = req.body.completed;
	
// 	todo.save(function(err) {
// 		if (err) {
// 			return res.status(400).send({
// 				message: getErrorMessage(err)
// 			});
// 		} else {
// 			res.json(todo);
// 		}
// 	});
// };

// exports.delete = function(req, res) {
// 	var todo = req.todo;
// 	todo.remove(function(err) {
// 		if (err) {
// 			return res.status(400).send({
// 				message: getErrorMessage(err)
// 			});
// 		} else {
// 			res.json(todo);
// 		}
// 	});
// };