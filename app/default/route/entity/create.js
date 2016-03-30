/*
обработчик запроса
*/

function _(azbn) {
	
	var log_tag = 'entity/create';
	azbn.echo('Handler loaded', log_tag);
	
	this.handler = function(req, res) {
		
		var id = azbn.now();
		
		var entity = azbn.mdl('db').Entity({
			id : id,//req.body.id,
			title : 'visit ' + id,
		});
		
		entity.save(function (err) {
			if (!err) {
				azbn.mdl('winston').info('article ' + id + ' created');
				return res.send({ status: 'OK', entity : entity });
			} else {
				console.log(err);
				if(err.name == 'ValidationError') {
					res.statusCode = 400;
					res.send({ error: 'Validation error' });
				} else {
					res.statusCode = 500;
					res.send({ error: 'Server error' });
				}
				azbn.mdl('winston').error('Internal error(%d): %s', res.statusCode, err.message);
			}
		});
		
	}
	
	return this.handler;
}

module.exports = _;