module.exports = function(app) {
    // Requires multiparty 
    var multiparty = require('connect-multiparty'),
        multipartyMiddleware = multiparty(),
        material = require('../controllers/material.server.controller');
  	
  	// Material List
  	app.get('/material/list/:collection', material.list);

  	// Material CRUD
  	app.post('/material', material.create);
  	app.put('/material/:id', material.update);
  	app.delete('/material/:id', material.delete);
  	app.get('/material/:id', material.get);

  	// File Routes
  	app.post('/material/update-file', multipartyMiddleware, material.updateFile);
};