/*
обработчик запроса
*/

function _(azbn) {
	
	var log_tag = 'process/exit';
	azbn.echo('Handler loaded', log_tag);
	
	this.handler = function(req, res) {
		//res.send(log_tag + ' response');
		process.exit(0);
		res.send('');
	}
	
	return this.handler;
}

module.exports = _;