var report = require('../../app/controllers/report.server.controller');

module.exports = function(app) {


    var http = require('http').Server(app);
    var io = require('socket.io')(http);

    io.on('connection', function(socket){
       
        console.log( "[conexion] ");

        socket.on('report send', function(data){
            
            console.log(data);
            io.emit('report get', { username: "", msg: "as" });

        })
    });

    http.listen(8081, function(){
        console.log('listening on *:8081');
    });


	app.route('/report').post(report.create(io)).get(report.list);
	app.route('/report/:type').get(report.listType);
	app.route('/getReport').get(report.getReport);
    app.route('/stadistic').get(report.stadistic);

};