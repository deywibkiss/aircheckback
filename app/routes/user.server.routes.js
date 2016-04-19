var user = require('../../app/controllers/user.server.controller');

module.exports = function(app) {

	app.route('/user').post(user.create).get(user.list);
};