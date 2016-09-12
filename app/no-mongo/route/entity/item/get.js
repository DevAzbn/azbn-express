/*
обработчик запроса
*/

function _(azbn) {
	
	var log_tag = 'entity/item/get';
	azbn.echo('Handler loaded', log_tag);
	
	this.handler = function(req, res) {
		
		var _p = req.params;
		
		azbn.mdl('nedb.entity').findOne({ uid: _p.uid }, function (err, doc) {
			
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