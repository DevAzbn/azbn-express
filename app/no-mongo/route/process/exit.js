/*
обработчик запроса
*/

function _(azbn) {
	
	var log_tag = 'process/exit';
	azbn.echo('Handler loaded', log_tag);
	
	this.handler = function(req, res) {
		
		//var _p = req.params;
		//process.exit(parseInt(_p.uid) || 0);
		
		var spawn = require('child_process').spawn;
		var forever_restart = spawn('forever', ['restart', azbn.mdl('cfg').process.file]);
		
		res.send('command "forever restart" sended');
	}
	
	return this.handler;
}

module.exports = _;