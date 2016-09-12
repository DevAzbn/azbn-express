/*
обработчик запроса
*/

function _(azbn) {
	
	var log_tag = 'entity/item';
	azbn.echo('Handler loaded', log_tag);
	
	this.handler = function(req, res) {
		
		var _p = req.params;
		
		return res.send({ id : _p.id });
		
	}
	
	return this.handler;
}

module.exports = _;