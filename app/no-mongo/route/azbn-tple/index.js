/*
обработчик запроса
*/

function _(azbn) {
	
	var log_tag = 'azbn-tple/index';
	azbn.echo('Handler loaded', log_tag);
	
	this.handler = function(req, res) {
		
		var _p = req.params;
		
		azbn.mdl('azbn-tple').parseFile('/index.azbn-tple', _p, function(_err, res_str) {
			
			if(_err) {
				
				console.log('Error: ' + _err);
				res.send(_err);
				
			} else {
				
				res.send(res_str);
				
			}
			
		});
		
		//res.send('index', { title: 'Hey', message: 'Hello there!'});
		
	}
	
	return this.handler;
}

module.exports = _;