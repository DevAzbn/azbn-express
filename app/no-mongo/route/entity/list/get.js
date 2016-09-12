/*
обработчик запроса
*/

function _(azbn) {
	
	var log_tag = 'entity/list/get';
	azbn.echo('Handler loaded', log_tag);
	
	this.handler = function(req, res) {
		
		//var _p = req.params;
		
		azbn.mdl('nedb.entity').find({}).sort({created_at : 1}).exec(function (err, docs) {
			
			if(err) {
				return res.send(err);
			} else {
				return res.send(docs);
			}
			
		});
		
	}
	
	return this.handler;
}

module.exports = _;