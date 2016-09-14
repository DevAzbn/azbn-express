/*
обработчик запроса
*/

function _(azbn) {
	
	var log_tag = 'web/get';
	azbn.echo('Handler loaded', log_tag);
	
	this.handler = function(req, res) {
		
		var _p = req.params;
		
		res.render('index', { title: 'Hey', message: 'Hello there!'});
		
	}
	
	return this.handler;
}

module.exports = _;