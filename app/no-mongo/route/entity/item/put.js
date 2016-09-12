/*
обработчик запроса
*/

function _(azbn) {
	
	var log_tag = 'entity/item/put';
	azbn.echo('Handler loaded', log_tag);
	
	this.handler = function(req, res) {
		
		var entity = req.body.entity;
		
		azbn.mdl('nedb.entity').update({ uid : entity.uid }, { $set: entity }, { multi: true }, function (err, numReplaced) {
			
			if(err) {
				return res.send(err);
			} else {
				return res.send({replaced : numReplaced});
			}
			
		});
		
	}
	
	return this.handler;
}

module.exports = _;