/*
обработчик запроса
*/

function _(azbn) {
	
	var log_tag = 'entity/item/post';
	azbn.echo('Handler loaded', log_tag);
	
	this.handler = function(req, res) {
		
		var entity = req.body.entity;
		
		entity.created_at = azbn.now();
		entity.type = 'default';
		entity.uid = entity.uid ? entity.uid : 'entity_' + entity.created_at;
		
		azbn.mdl('nedb.entity').insert(entity, function (err, doc) {
			
			if(err) {
				return res.send(err);
			} else {
				return res.send(doc);
			}
			
		});
		
	}
	
	return this.handler;
}

module.exports = _;