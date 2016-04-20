var report = require('../../app/controllers/report.server.controller');

module.exports = function(app) {
	app.route('/report').post(report.create).get(report.list);
};