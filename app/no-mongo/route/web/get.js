/*
обработчик запроса
*/

function _(azbn) {
	
	var log_tag = 'web/get';
	azbn.echo('Handler loaded', log_tag);
	
	this.handler = function(req, res) {
		
		var _p = req.params;
		
		//req.protocol + '://' + req.headers.host + '/api/call/'
		azbn.mdl('web').selfAPI('/api/call/', {}, function(err, meta, resp){
			if(err) {
				res.send(err);
			} else {
				var $ = azbn.mdl('web').parse('<div>' + resp + '</div>');
				res.send($('div').eq(0).text());
			}
		});
		
	}
	
	return this.handler;
}

module.exports = _;