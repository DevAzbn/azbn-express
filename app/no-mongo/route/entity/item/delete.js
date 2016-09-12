/*
обработчик запроса
*/

function _(azbn) {
	
	var log_tag = 'entity/item/delete';
	azbn.echo('Handler loaded', log_tag);
	
	this.handler = function(req, res) {
		
		var entity = req.body.entity;
		
		azbn.mdl('nedb.entity').remove({ uid : entity.uid }, { multi: true }, function (err, numRemoved) {
			
			if(err) {
				return res.send(err);
			} else {
				return res.send({removed : numRemoved});
			}
			
		});
		
	}
	
	return this.handler;
}

module.exports = _;